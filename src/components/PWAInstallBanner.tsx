import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';
import { Download, WifiOff, X, Sparkles } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isOffline, promptInstall } = usePWA();
  const [dismissed, setDismissed] = useState(false);

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

      {/* Mobile PWA Install Bottom Floating Banner */}
      {isInstallable && !dismissed && (
        <div 
          id="pwa-install-banner"
          className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#121218]/95 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <img 
                  src="https://cnd.vishaljogdeo.com/IMG_0016.JPG" 
                  alt="Vishal Jogdeo Icon" 
                  className="w-full h-full rounded-[10px] object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white font-heading">Install Music App</h4>
                  <span className="flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-2.5 h-2.5" /> PWA
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 leading-tight">
                  Instant offline access to 1500+ songs, lyrics & shows.
                </p>
              </div>
            </div>
            <button
              id="pwa-dismiss-btn"
              onClick={() => setDismissed(true)}
              className="text-stone-500 hover:text-stone-300 p-1 transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              id="pwa-install-action-btn"
              onClick={promptInstall}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install to Home Screen</span>
            </button>
            <button
              id="pwa-later-btn"
              onClick={() => setDismissed(true)}
              className="py-2 px-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold rounded-xl transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </>
  );
};
