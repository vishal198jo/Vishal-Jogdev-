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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-stone-200/80 backdrop-blur-md py-3 px-4 sm:px-6 text-stone-900 shadow-lg animate-in slide-in-from-bottom duration-300">
      
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
            className="w-11 h-11 rounded-xl object-cover border border-stone-200 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="truncate">
            <h4 className="text-xs font-bold text-stone-900 truncate font-heading">{currentSong.title}</h4>
            <p className="text-[11px] text-amber-900 truncate font-medium">{currentSong.titleDevanagari}</p>
          </div>
        </div>

        {/* Center: Controls & Seek Bar */}
        <div className="flex flex-col items-center gap-1 w-full sm:w-1/3">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="p-2.5 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 transition-all transform hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-stone-50" /> : <Play className="w-4 h-4 fill-stone-50 ml-0.5" />}
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
              className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
            />
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-1/3">
          {currentSong.lyricsId && (
            <button
              onClick={() => onOpenLyrics(currentSong.lyricsId!)}
              className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-xs text-stone-800 font-medium border border-stone-200 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Lyrics</span>
            </button>
          )}

          <button
            onClick={toggleMute}
            className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-stone-600" />}
          </button>

          <button
            onClick={onClosePlayer}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
