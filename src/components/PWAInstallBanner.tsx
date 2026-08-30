import React, { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';
import { Download, WifiOff } from 'lucide-react';

const PWA_STORAGE_KEY = 'vj_pwa_prompt_seen';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isOffline, promptInstall } = usePWA();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [hasSeenPrompt, setHasSeenPrompt] = useState<boolean>(() => {
    try {
      return localStorage.getItem(PWA_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Wait until the full website is completely loaded before presenting the popup
  useEffect(() => {
    if (hasSeenPrompt) return;

    const onFullyLoaded = () => {
      // Allow a brief 2-second grace period so all initial page animations and fonts settle
      const timer = window.setTimeout(() => {
        setIsPageLoaded(true);
      }, 2000);
      return () => window.clearTimeout(timer);
    };

    if (document.readyState === 'complete') {
      onFullyLoaded();
    } else {
      window.addEventListener('load', onFullyLoaded, { once: true });
      return () => window.removeEventListener('load', onFullyLoaded);
    }
  }, [hasSeenPrompt]);

  const markAsSeen = () => {
    try {
      localStorage.setItem(PWA_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
    setHasSeenPrompt(true);
  };

  const handleInstall = async () => {
    markAsSeen();
    await promptInstall();
  };

  const handleLater = () => {
    markAsSeen();
  };

  return (
    <>
      {/* Offline Status Pill */}
      {isOffline && (
        <div 
          id="pwa-offline-notification"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-amber-950/90 border border-amber-500/40 text-amber-200 text-xs font-semibold rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Offline Mode Active • Playing from local cache</span>
        </div>
      )}

      {/* One-Time PWA Install Popup (Shown only once on first visit after full site load) */}
      {isInstallable && isPageLoaded && !hasSeenPrompt && (
        <div 
          id="pwa-install-banner"
          className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-[#121218]/95 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-stone-900 border border-amber-500/40 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <img 
                src="https://cnd.vishaljogdeo.com/IMG_0016.JPG" 
                alt="Vishal Jogdeo" 
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs font-bold text-white font-heading truncate">Install Music App</h4>
              <p className="text-[11px] text-stone-400 leading-tight">
                Quick offline access to songs, lyrics & shows.
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-2">
            <button
              id="pwa-install-action-btn"
              onClick={handleInstall}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              id="pwa-later-btn"
              onClick={handleLater}
              className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  );
};

