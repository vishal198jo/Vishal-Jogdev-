import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BookEventModal } from './components/BookEventModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { useFirestoreData } from './hooks/useFirestoreData';

import { Song, Show } from './types';
import { FEATURED_SONGS } from './data/mockData';
import { X, Music2 } from 'lucide-react';
import { db } from './lib/firebase';
import { doc, setDoc, increment } from 'firebase/firestore';
import { 
  registerRouteForPreload, 
  preloadAllRegisteredRoutes 
} from './lib/cacheManager';

// Importer functions registered for intelligent preloading
const importHome = () => import('./pages/HomePage');
const importAbout = () => import('./pages/AboutPage');
const importSongs = () => import('./pages/SongsPage');
const importLyrics = () => import('./pages/LyricsPage');
const importSingleLyric = () => import('./pages/SingleLyricPage');
const importGallery = () => import('./pages/GalleryPage');
const importShows = () => import('./pages/ShowsPage');
const importContact = () => import('./pages/ContactPage');
const importPrivacy = () => import('./pages/PrivacyPolicyPage');
const importEmbedLyric = () => import('./pages/EmbedLyricPage');

registerRouteForPreload('/', importHome);
registerRouteForPreload('/about', importAbout);
registerRouteForPreload('/songs', importSongs);
registerRouteForPreload('/lyrics', importLyrics);
registerRouteForPreload('/lyrics/detail', importSingleLyric);
registerRouteForPreload('/gallery', importGallery);
registerRouteForPreload('/shows', importShows);
registerRouteForPreload('/contact', importContact);
registerRouteForPreload('/privacy', importPrivacy);

// Safe lazy import wrapper with auto-retry on dynamic import / chunk fetch errors
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T } | Record<string, any>>,
  namedExport?: string
) {
  return lazy(async () => {
    try {
      const module = await factory();
      if ('default' in module && module.default) {
        return { default: module.default as T };
      }
      if (namedExport && module[namedExport]) {
        return { default: module[namedExport] as T };
      }
      const firstKey = Object.keys(module)[0];
      return { default: module[firstKey] as T };
    } catch (err) {
      console.warn('Dynamic import load failed, retrying module fetch...', err);
      // Wait 300ms and retry once
      await new Promise(resolve => setTimeout(resolve, 300));
      const retryModule = await factory();
      if ('default' in retryModule && retryModule.default) {
        return { default: retryModule.default as T };
      }
      if (namedExport && retryModule[namedExport]) {
        return { default: retryModule[namedExport] as T };
      }
      const firstKey = Object.keys(retryModule)[0];
      return { default: retryModule[firstKey] as T };
    }
  });
}

// Lazy loaded page components for fast initial bundle loading
const HomePage = lazyWithRetry(importHome, 'HomePage');
const AboutPage = lazyWithRetry(importAbout, 'AboutPage');
const SongsPage = lazyWithRetry(importSongs, 'SongsPage');
const LyricsPage = lazyWithRetry(importLyrics, 'LyricsPage');
const SingleLyricPage = lazyWithRetry(importSingleLyric, 'SingleLyricPage');
const GalleryPage = lazyWithRetry(importGallery, 'GalleryPage');
const ShowsPage = lazyWithRetry(importShows, 'ShowsPage');
const ContactPage = lazyWithRetry(importContact, 'ContactPage');
const PrivacyPolicyPage = lazyWithRetry(importPrivacy, 'PrivacyPolicyPage');
const EmbedLyricPage = lazyWithRetry(importEmbedLyric, 'EmbedLyricPage');

// Sleek fallback component during page lazy load
const PageFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-amber-400 py-24 animate-in fade-in duration-150">
    <div className="w-9 h-9 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
    <span className="text-xs font-bold tracking-widest text-stone-300 uppercase font-sans">Loading....</span>
  </div>
);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useFirestoreData();

  // Background preload all routes and assets when idle for instant navigation
  useEffect(() => {
    preloadAllRegisteredRoutes();
  }, []);

  // Automatic Fullscreen Trigger on First User Interaction (No Buttons / Seamless Experience)
  useEffect(() => {
    let triggered = false;

    const tryAutoFullscreen = () => {
      if (triggered) return;
      triggered = true;

      const docEl = document.documentElement as any;
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (!isCurrentlyFullscreen && docEl) {
        const reqFullscreen =
          docEl.requestFullscreen ||
          docEl.webkitRequestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.msRequestFullscreen;

        if (typeof reqFullscreen === 'function') {
          try {
            const promise = reqFullscreen.call(docEl);
            if (promise && typeof promise.catch === 'function') {
              promise.catch(() => {
                // Silently ignore browser permission restrictions in iframes or unactivated contexts
              });
            }
          } catch {
            // Silently ignore
          }
        }
      }

      // Cleanup listeners once executed
      window.removeEventListener('click', tryAutoFullscreen, true);
      window.removeEventListener('touchstart', tryAutoFullscreen, true);
      window.removeEventListener('pointerdown', tryAutoFullscreen, true);
    };

    window.addEventListener('click', tryAutoFullscreen, { capture: true, once: true });
    window.addEventListener('touchstart', tryAutoFullscreen, { capture: true, once: true });
    window.addEventListener('pointerdown', tryAutoFullscreen, { capture: true, once: true });

    return () => {
      window.removeEventListener('click', tryAutoFullscreen, true);
      window.removeEventListener('touchstart', tryAutoFullscreen, true);
      window.removeEventListener('pointerdown', tryAutoFullscreen, true);
    };
  }, []);

  // Track unique website visited users strictly
  useEffect(() => {
    const trackingKey = 'vj_visited_user_strictly';
    if (!localStorage.getItem(trackingKey)) {
      const incrementVisitor = async () => {
        try {
          localStorage.setItem(trackingKey, 'true');
          await setDoc(doc(db, 'stats', 'global'), {
            visitedUsers: increment(1)
          }, { merge: true });
        } catch (e) {
          console.warn("Failed to increment visited users:", e);
        }
      };
      incrementVisitor();
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isEmbedRoute = location.pathname.startsWith('/embed');

  // Audio state
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Selected lyrics ID for dedicated reader view
  const [selectedLyricId, setSelectedLyricId] = useState<string | null>(null);

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedShow, setPreselectedShow] = useState<Show | null>(null);

  // Policy Modal
  const [policyModalTitle, setPolicyModalTitle] = useState<string | null>(null);

  // Handlers
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleSelectLyricsById = (lyricsId: string) => {
    setSelectedLyricId(lyricsId);
  };

  if (isEmbedRoute) {
    return (
      <main className="min-h-screen bg-[#0b0b0e]">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/embed/lyrics/:lyricId" element={<EmbedLyricPage />} />
          </Routes>
        </Suspense>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-stone-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
      
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenBooking={() => { setPreselectedShow(null); setBookingModalOpen(true); }}
      />

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Dynamic Home Page with Demos of all sections */}
            <Route 
              path="/" 
              element={
                <HomePage
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  onOpenBooking={() => { setPreselectedShow(null); setBookingModalOpen(true); }}
                />
              } 
            />

            {/* Dedicated Pages for each section */}
            <Route path="/about" element={<AboutPage />} />
            
            <Route 
              path="/songs" 
              element={
                <SongsPage
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  onOpenLyrics={handleSelectLyricsById}
                />
              } 
            />

            <Route 
              path="/songs/:songId" 
              element={
                <SongsPage
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  onOpenLyrics={handleSelectLyricsById}
                />
              } 
            />
            
            <Route 
              path="/lyrics" 
              element={
                <LyricsPage
                  selectedLyricId={selectedLyricId}
                  onPlaySong={(songId) => {
                    const song = FEATURED_SONGS.find(s => s.id === songId);
                    if (song) handlePlaySong(song);
                  }}
                />
              } 
            />

            <Route 
              path="/lyrics/:lyricId" 
              element={
                <SingleLyricPage
                  onPlaySong={handlePlaySong}
                />
              } 
            />

            <Route 
              path="/embed/lyrics/:lyricId" 
              element={<EmbedLyricPage />} 
            />
            
            <Route path="/gallery" element={<GalleryPage />} />
            
            <Route 
              path="/shows" 
              element={
                <ShowsPage
                  onOpenBooking={() => setBookingModalOpen(true)}
                />
              } 
            />
            
            <Route 
              path="/contact" 
              element={
                <ContactPage
                  onOpenBooking={() => setBookingModalOpen(true)}
                />
              } 
            />

            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={(title) => setPolicyModalTitle(title)}
      />

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onClosePlayer={() => { setIsPlaying(false); setCurrentSong(null); }}
        onSelectSong={(song) => {
          setCurrentSong(song);
          setIsPlaying(true);
        }}
      />

      {/* PWA Install Prompt & Offline Notification */}
      <PWAInstallBanner />

      {/* Booking Event Modal */}
      <BookEventModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedShow={preselectedShow}
      />

      {/* Privacy Policy / Terms Modal */}
      {policyModalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#121218] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 space-y-4 text-stone-100 shadow-2xl relative">
            <button
              onClick={() => setPolicyModalTitle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold font-heading text-white">{policyModalTitle}</h3>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              All music compositions, recordings, lyrics transliterations, and imagery on this official portal are property of Vishal Jogdeo Sangeet and licensed partners. Unauthorized copying or commercial broadcast without prior written approval is prohibited.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPolicyModalTitle(null)}
                className="px-5 py-2 rounded-full bg-gold-gradient text-black hover:opacity-95 font-extrabold text-xs shadow-md transition-all"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
