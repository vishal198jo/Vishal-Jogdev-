import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, X, Maximize2, ChevronDown, Shuffle, Heart,
  SkipBack, SkipForward, Headphones, Share2, Loader2, Check, Music
} from 'lucide-react';
import { Song } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc, increment } from 'firebase/firestore';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { FEATURED_SONGS } from '../data/mockData';

interface AudioPlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClosePlayer: () => void;
  onSelectSong?: (song: Song) => void;
  songs?: Song[];
}

// Marquee Song Title component for smooth side scrolling on long titles
const MarqueeSongTitle: React.FC<{ 
  title: string; 
  className?: string; 
  containerClassName?: string;
  maxCharsThreshold?: number;
}> = ({ title, className = '', containerClassName = 'w-full', maxCharsThreshold = 20 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setIsOverflow(textRef.current.scrollWidth > containerRef.current.clientWidth + 2 || title.length > maxCharsThreshold);
      } else {
        setIsOverflow(title.length > maxCharsThreshold);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [title, maxCharsThreshold]);

  if (isOverflow) {
    return (
      <div ref={containerRef} className={`${containerClassName} overflow-hidden relative mask-fade-edges py-0.5`}>
        <div className="inline-flex whitespace-nowrap animate-title-loop items-center">
          <span className={className}>{title}</span>
          <span className="text-amber-400 font-extrabold px-3.5 text-xs opacity-90">•</span>
          <span className={className}>{title}</span>
          <span className="text-amber-400 font-extrabold px-3.5 text-xs opacity-90">•</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${containerClassName} overflow-hidden`}>
      <span ref={textRef} className={`${className} truncate block`}>
        {title}
      </span>
    </div>
  );
};

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClosePlayer,
  onSelectSong,
  songs: propSongs
}) => {
  const { songs: firestoreSongs } = useFirestoreData();

  // Combine songs list to support Next / Previous track skipping
  const songsList: Song[] = (propSongs && propSongs.length > 0)
    ? propSongs
    : (firestoreSongs && firestoreSongs.length > 0 ? (firestoreSongs as Song[]) : FEATURED_SONGS);

  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState(currentSong?.duration || '0:00');
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [copiedToast, setCopiedToast] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync plays count from live Firestore data
  const liveMatch = firestoreSongs.find(s => s.id === currentSong?.id);
  const displayPlays = liveMatch?.plays !== undefined ? liveMatch.plays : (currentSong?.plays || 0);

  // Prevent background body scrolling when full screen player is open
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

  // Reset loading state when song changes
  useEffect(() => {
    setIsLoadingAudio(true);
    setProgress(0);
    setCurrentTimeStr('0:00');
  }, [currentSong?.id]);

  // Playback control effect + increment play counter silently ONCE per browser session
  useEffect(() => {
    if (!currentSong?.id) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().then(() => {
          // Prevent play count spam: increment once per song per session
          try {
            const counted: string[] = JSON.parse(sessionStorage.getItem('vj_counted_plays') || '[]');
            if (!counted.includes(currentSong.id)) {
              counted.push(currentSong.id);
              sessionStorage.setItem('vj_counted_plays', JSON.stringify(counted));
              
              setDoc(doc(db, 'songs', currentSong.id), {
                plays: increment(1)
              }, { merge: true }).catch(() => {});
            }
          } catch (e) {}
        }).catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong?.id]);

  // Sync volume level
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!currentSong) return null;

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatPlays = (plays?: number) => {
    if (!plays || plays === 0) return '12+ Plays';
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M Plays`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}k Plays`;
    return `${plays} Plays`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
      setCurrentTimeStr(formatSeconds(current));
      if (audioRef.current.duration) {
        setDurationStr(formatSeconds(audioRef.current.duration));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Next and Previous Track handlers
  const handleNext = () => {
    if (!currentSong || songsList.length === 0) return;
    let nextIndex = 0;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songsList.length);
    } else {
      const currentIndex = songsList.findIndex(s => s.id === currentSong.id);
      nextIndex = (currentIndex + 1) % songsList.length;
    }
    const nextSong = songsList[nextIndex];
    if (nextSong && onSelectSong) {
      onSelectSong(nextSong);
    }
  };

  const handlePrev = () => {
    if (!currentSong || songsList.length === 0) return;
    const currentIndex = songsList.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    const prevSong = songsList[prevIndex];
    if (prevSong && onSelectSong) {
      onSelectSong(prevSong);
    }
  };

  const handleAudioEnded = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      handleNext();
    }
  };

  const handleShareSong = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentSong) return;
    const shareData = {
      title: `${currentSong.title} | Vishal Jogdeo`,
      text: `Listen to devotional track "${currentSong.title}" performed by Vishal Jogdeo`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2500);
      } catch (err) {}
    }
  };

    const hasCover = Boolean(currentSong.coverImage && currentSong.coverImage.trim() !== '');
    const coverArt = currentSong.coverImage || '';

    return (
      <>
        {/* Hidden HTML5 Audio Element with full buffering event listeners */}
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadStart={() => setIsLoadingAudio(true)}
          onWaiting={() => setIsLoadingAudio(true)}
          onSeeking={() => setIsLoadingAudio(true)}
          onCanPlay={() => setIsLoadingAudio(false)}
          onCanPlayThrough={() => setIsLoadingAudio(false)}
          onPlaying={() => setIsLoadingAudio(false)}
          onSeeked={() => setIsLoadingAudio(false)}
          onError={() => setIsLoadingAudio(false)}
        />

        {/* Floating Link Copied Notification */}
        {copiedToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-950 text-amber-200 border border-amber-500/40 px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Song link copied to clipboard!</span>
          </div>
        )}

        {/* 1. COMPACT FEATURE BOTTOM PLAYER BAR */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121218]/98 backdrop-blur-xl border-t border-amber-500/30 py-2.5 px-3 sm:px-6 text-stone-100 shadow-2xl gpu-layer">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left: Clickable Cover Art & Song Title -> Opens Full Screen Player */}
            <div 
              onClick={() => setIsFullScreen(true)}
              className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial sm:w-1/3 cursor-pointer group select-none"
              title="Tap to open full screen player"
            >
              {/* Spinning Circular Vinyl / Music Icon Artwork */}
              <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                {hasCover ? (
                  <img
                    src={coverArt}
                    alt={currentSong.title}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-500/40 shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                      isPlaying && !isLoadingAudio ? 'animate-spin-slow' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/70 border-2 border-amber-500/40 shadow-lg flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform ${
                    isPlaying && !isLoadingAudio ? 'animate-spin-slow' : ''
                  }`}>
                    <Music className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 drop-shadow" />
                  </div>
                )}
                
                {/* Center vinyl spindle hole */}
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black border border-amber-500/50 shadow-inner pointer-events-none" />

                {/* Loading Round Spinner Animation Overlay on Vinyl */}
                {isLoadingAudio && (
                  <div className="absolute inset-0 rounded-full bg-black/70 backdrop-blur-[1px] flex items-center justify-center">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin" />
                  </div>
                )}
              </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <MarqueeSongTitle 
                title={currentSong.title}
                className="text-xs sm:text-sm font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors"
                maxCharsThreshold={16}
              />
              <p className="text-[10px] sm:text-[11px] text-stone-400 truncate font-semibold mt-0.5">
                Singer: <span className="text-amber-300">{currentSong.singerName || 'Vishal Jogdeo'}</span>
              </p>
            </div>
          </div>

          {/* Center: Play Controls & Audio Time */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0">
            {/* Previous Track */}
            <button
              onClick={handlePrev}
              className="p-1 sm:p-1.5 text-stone-300 hover:text-amber-400 transition-colors active:scale-90"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={onTogglePlay}
              className="p-2 sm:p-2.5 rounded-full bg-gold-gradient text-black hover:scale-105 active:scale-95 transition-all shadow-lg gold-glow flex items-center justify-center shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoadingAudio ? (
                <Loader2 className="w-4 h-4 text-black animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-black text-black" />
              ) : (
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={handleNext}
              className="p-1 sm:p-1.5 text-stone-300 hover:text-amber-400 transition-colors active:scale-90"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            {/* Audio Time Display */}
            <div className="hidden sm:flex text-[10px] font-mono text-stone-400 font-bold items-center gap-1 ml-1">
              <span className="text-amber-300">{currentTimeStr}</span>
              <span>/</span>
              <span>{durationStr}</span>
            </div>
          </div>

          {/* Right: Expand Fullscreen, Share & Close (X) Button */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
            {/* Open Full Screen Player Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-2 text-stone-300 hover:text-amber-300 bg-stone-900/90 hover:bg-stone-800 rounded-full border border-stone-800 transition-colors shrink-0"
              title="Open Full Screen Player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Share Song Icon */}
            <button
              onClick={handleShareSong}
              className="p-2 text-stone-300 hover:text-amber-300 bg-stone-900/90 hover:bg-stone-800 rounded-full border border-stone-800 transition-colors shrink-0"
              title="Share Song"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Prominent Close (X) Button to stop music player */}
            <button
              onClick={onClosePlayer}
              className="p-2 text-stone-200 hover:text-white bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/50 rounded-full transition-all shadow-md active:scale-95 shrink-0 flex items-center justify-center ml-0.5"
              title="Close Player"
              aria-label="Close Music Player"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. FULL SCREEN SPOTIFY-STYLE PLAYER MODAL */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0d]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 text-stone-100 overflow-y-auto max-h-screen animate-in fade-in duration-200">
          
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between max-w-md mx-auto w-full pt-2">
            <button
              onClick={() => setIsFullScreen(false)}
              className="p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800 transition-colors"
              title="Minimize Player"
            >
              <ChevronDown className="w-6 h-6" />
            </button>

            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-sans">
              Vishal Jogdeo Audio Player
            </span>

            <button
              onClick={() => setIsFullScreen(false)}
              className="p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800 transition-colors"
              title="Close Full Screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centerpiece: Round Spinning Album Vinyl Disc */}
          <div className="flex-1 flex flex-col items-center justify-center my-4 sm:my-6 space-y-6 max-w-md mx-auto w-full">
            
            <div className="relative group">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-2xl group-hover:bg-amber-500/30 transition-all" />

              {/* Round Spinning Record */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 border-amber-500/40 shadow-2xl overflow-hidden bg-stone-950 p-2 flex items-center justify-center">
                {hasCover ? (
                  <img
                    src={coverArt}
                    alt={currentSong.title}
                    className={`w-full h-full rounded-full object-cover shadow-inner ${
                      isPlaying && !isLoadingAudio ? 'animate-spin-slow' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-full h-full rounded-full bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/60 flex flex-col items-center justify-center border-2 border-amber-500/30 shadow-inner ${
                    isPlaying && !isLoadingAudio ? 'animate-spin-slow' : ''
                  }`}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/80 border-2 border-amber-400/50 flex items-center justify-center shadow-lg">
                      <Music className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Vinyl Grooves Overlay Ring */}
                <div className="absolute inset-0 rounded-full border-8 border-black/40 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-white/10 pointer-events-none" />

                {/* Center Vinyl Hole */}
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black border-2 border-amber-500/60 flex items-center justify-center shadow-inner pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow" />
                </div>

                {/* Loading Overlay inside Vinyl */}
                {isLoadingAudio && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 p-4 text-center z-10">
                    <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                    <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">Buffering Audio...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Song Meta Info */}
            <div className="text-center space-y-1.5 w-full max-w-sm mx-auto px-4 overflow-hidden">
              <MarqueeSongTitle 
                title={currentSong.title}
                className="text-lg sm:text-2xl font-black font-heading text-white"
                maxCharsThreshold={20}
              />
              <p className="text-xs sm:text-sm font-semibold text-amber-300">
                Singer: <strong className="text-white">{currentSong.singerName || 'Vishal Jogdeo'}</strong>
              </p>

              {/* Plays Count Display */}
              <div className="flex items-center justify-center pt-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1 rounded-full shadow-inner">
                  <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{formatPlays(displayPlays)}</span>
                </div>
              </div>
            </div>

            {/* Professional Filled Progress Slider Bar */}
            <div className="w-full space-y-2 px-2">
              <div className="relative w-full h-2 bg-stone-800 rounded-full overflow-hidden cursor-pointer group flex items-center">
                <div 
                  className="h-full bg-gold-gradient rounded-full shadow-md transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-stone-400 px-1 font-bold">
                <span className="text-amber-300">{currentTimeStr}</span>
                <span>{durationStr}</span>
              </div>
            </div>

            {/* Fullscreen Player Controls Bar */}
            <div className="flex items-center justify-between w-full pt-1 px-2 sm:px-4">
              {/* Shuffle */}
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-2.5 rounded-full transition-colors ${
                  isShuffle ? 'text-amber-400 bg-amber-950/60 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-5 h-5" />
              </button>

              {/* Previous Track */}
              <button
                onClick={handlePrev}
                className="p-3 rounded-full text-stone-200 hover:text-amber-400 hover:bg-stone-900 border border-stone-800 transition-colors active:scale-90"
                title="Previous Track"
              >
                <SkipBack className="w-6 h-6 fill-current" />
              </button>

              {/* Play / Pause Button */}
              <button
                onClick={onTogglePlay}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gold-gradient text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all gold-glow"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-7 h-7 text-black animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-7 h-7 fill-black text-black" />
                ) : (
                  <Play className="w-7 h-7 fill-black text-black ml-1" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={handleNext}
                className="p-3 rounded-full text-stone-200 hover:text-amber-400 hover:bg-stone-900 border border-stone-800 transition-colors active:scale-90"
                title="Next Track"
              >
                <SkipForward className="w-6 h-6 fill-current" />
              </button>

              {/* Like / Favourite Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2.5 rounded-full transition-colors ${
                  isLiked ? 'text-red-500 bg-red-950/40 border border-red-500/40' : 'text-stone-400 hover:text-white'
                }`}
                title="Like Song"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShareSong}
                className="p-2.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-900 transition-colors"
                title="Share Song"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Bottom Volume Action Bar */}
          <div className="max-w-md mx-auto w-full flex items-center justify-center pt-3 border-t border-stone-800/80">
            <div className="flex items-center gap-2 bg-stone-900/80 px-4 py-2 rounded-full border border-stone-800">
              <button onClick={toggleMute} className="text-stone-300 hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1.5 bg-stone-800 rounded appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

        </div>
      )}
    </>
  );
};

