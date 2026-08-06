import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MahanubhavPanthaPage } from './pages/MahanubhavPanthaPage';
import { SongsPage } from './pages/SongsPage';
import { LyricsPage } from './pages/LyricsPage';
import { SingleLyricPage } from './pages/SingleLyricPage';
import { GalleryPage } from './pages/GalleryPage';
import { ShowsPage } from './pages/ShowsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { Footer } from './components/Footer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BookEventModal } from './components/BookEventModal';

import { Song, Show } from './types';
import { FEATURED_SONGS } from './data/mockData';
import { X } from 'lucide-react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0b0b0e] text-stone-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
        
        {/* Sticky Header Navigation */}
        <Navbar
          onOpenBooking={() => { setPreselectedShow(null); setBookingModalOpen(true); }}
        />

        <main className="flex-1">
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
            <Route path="/mahanubhav-pantha" element={<MahanubhavPanthaPage onOpenBooking={() => setBookingModalOpen(true)} />} />
            
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
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
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
          onOpenLyrics={handleSelectLyricsById}
        />

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
    </BrowserRouter>
  );
}
