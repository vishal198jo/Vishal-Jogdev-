import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { RotateCcw, Loader2 } from 'lucide-react';

interface HLSVideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
}

export const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ 
  src, 
  title, 
  poster,
  autoPlay = false 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Helper to extract YouTube ID
  const getYoutubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(src);
  const isYoutube = !!youtubeId;

  // Initialize Native Video / HLS
  useEffect(() => {
    if (isYoutube) {
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;
    setIsLoading(true);
    setHasError(false);

    const isHls = src.includes('.m3u8');

    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
        });
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          if (autoPlay) {
            video.play().catch(() => {});
          }
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                setHasError(true);
                setIsLoading(false);
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS for Safari / iOS
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          if (autoPlay) video.play().catch(() => {});
        });
        video.addEventListener('error', () => {
          setHasError(true);
          setIsLoading(false);
        });
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    } else {
      // Standard MP4, WebM, MOV, OGG video direct playback
      video.src = src;
      video.load();

      const handleLoadedData = () => {
        setIsLoading(false);
      };

      const handleError = () => {
        console.error('Video playback error for:', src);
        setHasError(true);
        setIsLoading(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, isYoutube, autoPlay]);

  return (
    <div className="w-full relative aspect-video bg-black overflow-hidden rounded-2xl border border-stone-800 shadow-2xl flex flex-col justify-center items-center">
      
      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center gap-2 pointer-events-none">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs text-stone-300 font-sans">Loading video...</p>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 z-20 bg-stone-950 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-400">
            <RotateCcw className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-white">Video unavailable</p>
          <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
            Please check your internet connection or verify the video link.
          </p>
        </div>
      )}

      {/* Media Playback Element */}
      {isYoutube ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`}
          title={title || 'Vishal Jogdeo Video'}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        /* Chrome Default Optimized Video Player with Built-in Download Option in 3-dots */
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={poster && !poster.includes('unsplash.com') ? poster : undefined}
          className="w-full h-full object-contain bg-black select-none pointer-events-auto"
          title={title}
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={src} />
          Your browser does not support HTML5 video playback.
        </video>
      )}
    </div>
  );
};
