import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Video } from 'lucide-react';

interface HeroVideoBackgroundProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoUrl = 'https://cnd.vishaljogdeo.com/Singer_performing_on_concert_stage_202608121616.mp4',
  posterUrl = 'https://i.ibb.co/tTqHDwC3/IMG-3759.png',
  title = 'Vishal Jogdeo Devotional Live'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Background Video Element */}
      {!hasError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1] transition-opacity duration-1000"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-golden-bokeh-particles-floating-background-41584-large.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover filter brightness-[0.35]"
        />
      )}

      {/* Premium Dark Gold Overlay Vignette for crisp text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e]/90 via-[#0b0b0e]/60 to-[#0b0b0e] backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#0b0b0e]/90" />

      {/* Ambient Video Control Buttons (Pointer events enabled for interactive toggle) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 pointer-events-auto flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-stone-900/90 text-amber-300 border border-amber-500/30 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
          title={isMuted ? "Unmute Background Sound" : "Mute Background Sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline text-[11px]">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline text-[11px]">Playing Sound</span>
            </>
          )}
        </button>

        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full bg-black/60 hover:bg-stone-900/90 text-stone-200 hover:text-amber-300 border border-amber-500/30 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
