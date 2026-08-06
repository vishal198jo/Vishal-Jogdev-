import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, BookOpen, X, Disc, SkipBack, SkipForward } from 'lucide-react';
import { Song } from '../types';

interface AudioPlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClosePlayer: () => void;
  onOpenLyrics: (lyricsId: string) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClosePlayer,
  onOpenLyrics
}) => {
  if (!currentSong) return null;

  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121218]/95 border-t border-stone-800/80 backdrop-blur-md py-3 px-4 sm:px-6 text-stone-100 shadow-2xl animate-in slide-in-from-bottom duration-300">
      
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onTogglePlay}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Song Meta */}
        <div className="flex items-center gap-3 w-full sm:w-1/3">
          <img
            src={currentSong.coverImage}
            alt={currentSong.title}
            className="w-11 h-11 rounded-xl object-cover border border-amber-500/30 shrink-0 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="truncate">
            <h4 className="text-xs font-bold text-white truncate font-heading">{currentSong.title}</h4>
            <p className="text-[11px] text-amber-300 truncate font-medium">{currentSong.titleDevanagari}</p>
          </div>
        </div>

        {/* Center: Controls & Seek Bar */}
        <div className="flex flex-col items-center gap-1 w-full sm:w-1/3">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="p-2.5 rounded-full bg-gold-gradient text-black hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black text-black" /> : <Play className="w-4 h-4 fill-black text-black ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-stone-400">
            <span>0:00</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-1/3">
          {currentSong.lyricsId && (
            <button
              onClick={() => onOpenLyrics(currentSong.lyricsId!)}
              className="px-3 py-1.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-xs text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Lyrics</span>
            </button>
          )}

          <button
            onClick={toggleMute}
            className="p-2 text-stone-400 hover:text-white transition-colors"
            aria-label="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-stone-300" />}
          </button>

          <button
            onClick={onClosePlayer}
            className="p-2 text-stone-400 hover:text-white transition-colors"
            aria-label="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
