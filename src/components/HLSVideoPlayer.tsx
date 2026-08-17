import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface HLSVideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
}

export const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ src, title, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Reset player states when source changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setHasStarted(false);
    setShowControls(false);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // Auto-hide controls after 3 seconds of playing
  useEffect(() => {
    if (!hasStarted) {
      setShowControls(false);
      return;
    }
    if (!isPlaying) {
      setShowControls(true);
      return;
    }
    const handler = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(handler);
  }, [isPlaying, currentTime, hasStarted]);

  // Helper to extract YouTube ID
  const getYoutubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(src);
  const isYoutube = !!youtubeId;

  // YT Player Instance Reference
  const ytPlayerRef = useRef<any>(null);

  // 1. YouTube Iframe API Loader
  useEffect(() => {
    if (!isYoutube) return;

    if (!window.YT) {
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }, [isYoutube]);

  // 2. YouTube Player Initialization & Control Synchronizer
  useEffect(() => {
    if (!isYoutube) return;

    let checkInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const initPlayer = () => {
      if (!ytContainerRef.current) return;
      
      try {
        ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0, // Disable native controls completely
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0
          },
          events: {
            onReady: (event: any) => {
              setIsLoading(false);
              setDuration(event.target.getDuration() || 0);
              // sync initial volume
              event.target.setVolume(volume * 100);
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
            },
            onStateChange: (event: any) => {
              const state = event.data;
              // YT.PlayerState: PLAYING=1, PAUSED=2, BUFFERING=3, ENDED=0, CUED=5
              if (state === 1) {
                setIsPlaying(true);
                setIsLoading(false);
              } else if (state === 2) {
                setIsPlaying(false);
              } else if (state === 3) {
                setIsLoading(true);
              } else if (state === 0) {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            },
            onError: () => {
              setHasError(true);
              setIsLoading(false);
            }
          }
        });
      } catch (err) {
        console.error("Error creating YouTube player:", err);
      }
    };

    const checkReady = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        clearInterval(checkInterval);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      checkInterval = setInterval(checkReady, 100);
    }

    // Progress updates
    progressInterval = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function' && isPlaying) {
        setCurrentTime(ytPlayerRef.current.getCurrentTime());
        const dur = ytPlayerRef.current.getDuration();
        if (dur > 0 && duration === 0) {
          setDuration(dur);
        }
      }
    }, 400);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (progressInterval) clearInterval(progressInterval);
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {
          // ignore destroy errors on unmount
        }
        ytPlayerRef.current = null;
      }
    };
  }, [src, isYoutube]);

  // 3. Native & HLS Player Initialization
  useEffect(() => {
    if (isYoutube) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    setIsLoading(true);
    setHasError(false);

    const isHls = src.includes('.m3u8') || src.includes('m3u8');

    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxMaxBufferLength: 10,
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS error:', data);
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
        // Native HLS (Safari/iOS)
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
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
      // Universal video file support (MP4, WebM, MOV, M4V, OGG, MKV, AVI, etc.)
      video.src = src;
      video.load();

      const handleLoaded = () => {
        setIsLoading(false);
        if (video.duration && !isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };

      const handleMeta = () => {
        if (video.duration && !isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };

      const handleError = () => {
        console.error("Video load error for src:", src);
        setHasError(true);
        setIsLoading(false);
      };

      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('loadedmetadata', handleMeta);
      video.addEventListener('canplay', handleLoaded);
      video.addEventListener('error', handleError);

      // Try autoplay preview or load
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
        setIsLoading(false);
      }).catch(() => {
        // Autoplay blocked or waiting for user interaction
        setIsLoading(false);
      });

      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('loadedmetadata', handleMeta);
        video.removeEventListener('canplay', handleLoaded);
        video.removeEventListener('error', handleError);
      };
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, isYoutube]);

  // 4. Player control event handlers
  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setShowControls(true);
    }

    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch((err) => console.log('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (isYoutube) return;
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleDurationChange = () => {
    if (isYoutube) return;
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);

    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      ytPlayerRef.current.seekTo(newTime, true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);

    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      ytPlayerRef.current.setVolume(newVol * 100);
      if (newVol > 0 && ytPlayerRef.current.isMuted()) {
        ytPlayerRef.current.unMute();
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.volume = newVol;
    video.muted = newVol === 0;
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      if (nextMuted) {
        ytPlayerRef.current.mute();
      } else {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(volume * 100);
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.muted = nextMuted;
  };

  const handleToggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      const enterFS = 
        container.requestFullscreen || 
        (container as any).webkitRequestFullscreen || 
        (container as any).mozRequestFullScreen || 
        (container as any).msRequestFullscreen;

      if (enterFS) {
        enterFS.call(container).then(() => {
          setIsFullscreen(true);
          if (screen.orientation && (screen.orientation as any).lock) {
            (screen.orientation as any).lock('landscape').catch(() => {});
          }
        }).catch(err => {
          console.warn('Error entering fullscreen:', err);
        });
      }
    } else {
      const exitFS = 
        document.exitFullscreen || 
        (document as any).webkitExitFullscreen || 
        (document as any).mozCancelFullScreen || 
        (document as any).msExitFullscreen;

      if (exitFS) {
        exitFS.call(document).then(() => {
          setIsFullscreen(false);
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
        });
      }
    }
  };

  // Monitor screen fullscreen changes (e.g. if exited via Escape key)
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    document.addEventListener('mozfullscreenchange', handleFSChange);
    document.addEventListener('MSFullscreenChange', handleFSChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
      document.removeEventListener('mozfullscreenchange', handleFSChange);
      document.removeEventListener('MSFullscreenChange', handleFSChange);
    };
  }, []);

  // Format time (seconds -> mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.pointer-events-auto') || target.tagName === 'INPUT' || target.tagName === 'BUTTON') {
          return;
        }
        // Toggle controls visibility on click/tap only if video has started
        if (hasStarted) {
          setShowControls(prev => !prev);
        }
      }}
      className={`group w-full relative aspect-video bg-black overflow-hidden rounded-2xl border border-stone-800 shadow-2xl transition-all duration-300 select-none ${isFullscreen ? 'rounded-none border-none h-screen max-w-none' : 'max-w-5xl mx-auto'}`}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs text-stone-400 font-sans">Loading media stream...</p>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 z-40 bg-stone-950 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-400">
            <RotateCcw className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-white">This video stream is unavailable</p>
          <p className="text-xs text-stone-400 max-w-xs font-sans leading-relaxed">
            Please make sure the video stream or YouTube link is correct and public.
          </p>
        </div>
      )}

      {/* The Media Element */}
      {isYoutube ? (
        <div className="w-full h-full pointer-events-none select-none flex items-center justify-center bg-black relative">
          <div className="w-full h-full aspect-video flex items-center justify-center">
            <div ref={ytContainerRef} className="w-full h-full" />
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          poster={poster && !poster.includes('unsplash.com') ? poster : undefined}
          className="w-full h-full object-contain pointer-events-auto select-none cursor-pointer"
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          playsInline
          preload="auto"
        />
      )}

      {/* Centered Big Play Button Overlay (before starting or when paused) */}
      {!isPlaying && !hasError && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/30 cursor-pointer group/play transition-colors duration-300 pointer-events-auto"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 transform group-hover/play:scale-110 active:scale-95">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-black translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Custom Control Bar Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 pt-10 flex flex-col gap-2 transition-opacity duration-300 pointer-events-auto ${showControls ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        
        {/* Progress seek bar */}
        <div className="flex items-center gap-3 w-full pointer-events-auto">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full accent-amber-500 h-1 bg-stone-700 rounded-lg cursor-pointer hover:h-1.5 transition-all outline-none"
            style={{
              background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / (duration || 1)) * 100}%, #44403c ${(currentTime / (duration || 1)) * 100}%, #44403c 100%)`
            }}
          />
        </div>

        {/* Buttons & Indicators Row */}
        <div className="flex items-center justify-between mt-1 text-white">
          <div className="flex items-center gap-4">
            {/* Play / Pause */}
            <button
              onClick={handlePlayPause}
              className="p-1.5 hover:bg-stone-800/80 rounded-full text-amber-400 hover:text-amber-300 transition-colors pointer-events-auto"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-amber-400" /> : <Play className="w-5 h-5 fill-amber-400" />}
            </button>

            {/* Time display */}
            <div className="text-xs text-stone-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-stone-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Volume controls */}
            <div className="flex items-center gap-1.5 group/vol pointer-events-auto">
              <button
                onClick={handleToggleMute}
                className="p-1.5 hover:bg-stone-800/80 rounded-full text-stone-300 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 accent-amber-500 h-1 bg-stone-700 rounded-lg cursor-pointer outline-none"
              />
            </div>

            {/* Fullscreen Landscape Toggle */}
            <button
              onClick={handleToggleFullscreen}
              className="p-1.5 hover:bg-stone-800/80 rounded-full text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px] font-bold pointer-events-auto"
              title="Full screen Landscape Mode"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <>
                  <Maximize className="w-4 h-4" />
                  <span className="hidden sm:inline-block font-sans text-[10px]">Landscape</span>
                </>
              )}
            </button>
          </div>
        </div>

        {title && (
          <div className="text-left text-xs text-stone-400 truncate font-sans px-1 pointer-events-none select-none">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
