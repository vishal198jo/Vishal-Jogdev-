import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeroSection } from '../components/HeroSection';
import { FEATURED_SONGS, LATEST_LYRICS, GALLERY_FOLDERS, UPCOMING_SHOWS, SINGER_PROFILE } from '../data/mockData';
import { Song } from '../types';
import { SEO } from '../components/SEO';
import { 
  Play, 
  Pause, 
  BookOpen, 
  Folder, 
  Calendar, 
  ArrowRight, 
  Music2, 
  MapPin, 
  PhoneCall, 
  Award,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onOpenBooking
}) => {
  

  // Demo items
  const demoSongs = FEATURED_SONGS.slice(0, 3);
  const demoLyrics = LATEST_LYRICS.slice(0, 2);
  const demoShows = UPCOMING_SHOWS.slice(0, 2);

  return (
    <>
      <SEO title="Home | Devotional Classical Vocalist" description="Official Portal of Vishal Jogdeo - 15+ years classical vocalist & devotional singer specializing in authentic Marathi Abhangas, Bhajans, and live spiritual concerts." keywords="Vishal Jogdeo, Devotional Singer, Abhanga, Bhajan, Classical Vocalist, Marathi Devotional Music" />
      
      <div className="pt-24 sm:pt-28 space-y-12 pb-16">
      
      {/* Hero Section with Photo on Left, Name & About on Right */}
      <HeroSection 
        onPlayFeaturedSong={() => onPlaySong(FEATURED_SONGS[0])}
        onOpenBooking={onOpenBooking}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. SONGS DEMO PREVIEW - Clean Border Section */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="py-8 border-y border-stone-200 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Music2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Audio Demo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                Popular <span className="font-serif italic text-amber-900 font-normal">Devotional Songs</span> Demo
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">Listen to a sample of 120+ authentic Abhangas and Bhajans by Vishal Jogdeo.</p>
            </div>
            
            <Link
              to="/songs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Explore All 120+ Tracks Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demoSongs.map((song) => {
              const isCurrent = currentSong?.id === song.id;
              const isCurrentPlaying = isCurrent && isPlaying;

              return (
                <div
                  key={song.id}
                  className={`p-4 border transition-all flex flex-col justify-between space-y-4 bg-white ${
                    isCurrent 
                      ? 'border-amber-800 bg-amber-50/40' 
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5">
                        {song.category}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 font-heading truncate">
                        {song.titleDevanagari || song.title}
                      </h3>
                      <p className="text-xs text-stone-500 truncate">{song.album}</p>
                    </div>

                    <button
                      onClick={() => onPlaySong(song)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                        isCurrentPlaying 
                          ? 'bg-amber-800 text-stone-50' 
                          : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-stone-50" />
                      ) : (
                        <Play className="w-4 h-4 fill-stone-50 ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-2 border-t border-stone-200">
                    <span>Duration: {song.duration}</span>
                    <span className="text-amber-900 font-semibold">{song.plays} listens</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 2. LYRICS DEMO PREVIEW - Clean Line Layout */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="py-8 border-b border-stone-200 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-amber-900 border border-stone-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Lyrics Reader Demo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                Verified <span className="font-serif italic text-amber-900 font-normal">Devotional Lyrics</span> Demo
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">Read Marathi Devanagari and English transliterated verses.</p>
            </div>
            
            <Link
              to="/lyrics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Open Dedicated Lyrics Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoLyrics.map((lyric) => (
              <div
                key={lyric.id}
                className="bg-white p-5 border border-stone-200 hover:border-amber-800 transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 font-heading">{lyric.titleDevanagari}</span>
                    <span className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 border border-amber-200 font-semibold">{lyric.composer}</span>
                  </div>
                  <h4 className="text-xs text-stone-600 font-medium italic">{lyric.title}</h4>
                  
                  {/* Devanagari Snippet */}
                  <div className="p-3 bg-stone-50 border border-stone-200 text-xs font-serif text-stone-800 space-y-1 leading-relaxed">
                    <p>{lyric.devanagariText[0]}</p>
                    <p>{lyric.devanagariText[1]}</p>
                    <p className="text-[10px] text-stone-400">...</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    to="/lyrics"
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Read Full Lyrics →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. GALLERY FOLDERS DEMO */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="py-8 border-b border-stone-200 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Folder className="w-3.5 h-3.5 text-amber-800" />
                <span>Photo Folders</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                Media & Photo <span className="font-serif italic text-amber-900 font-normal">Folders</span> Demo
              </h2>
            </div>
            
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>View Full Gallery Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {GALLERY_FOLDERS.map((folder, idx) => (
              <Link
                key={folder.id}
                to="/gallery"
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square overflow-hidden bg-stone-100 rounded-2xl border border-stone-200 relative shadow-sm hover:shadow-md transition-all">
                  <img
                    src={folder.coverImage}
                    alt={folder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/60" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white">
                    <Folder className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold">{folder.count}</span>
                  </div>
                </div>
                <h3 className="text-xs font-semibold font-heading text-stone-800 text-center line-clamp-1 group-hover:text-amber-900 px-1">
                  {folder.name}
                </h3>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 4. UPCOMING SHOWS DEMO */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="py-8 border-b border-stone-200 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>Live Schedule</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                Upcoming Live <span className="font-serif italic text-amber-900 font-normal">Concerts & Seva</span> Demo
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">Join Vishal Jogdeo live in Mumbai, Pune, and overseas temples.</p>
            </div>
            
            <Link
              to="/shows"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>View All Shows Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoShows.map((show) => (
              <div
                key={show.id}
                className="bg-white p-5 border border-stone-200 hover:border-amber-800 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-0.5">
                    {show.date} • {show.time}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 font-heading">{show.title}</h3>
                  <p className="text-xs text-stone-600 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-800" />
                    <span>{show.venue}, {show.city}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    {show.status}
                  </span>
                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium transition-colors"
                  >
                    Inquire Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. ABOUT & CONTACT QUICK DEMO BANNER */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-stone-900 text-stone-50 p-8 sm:p-10 border-y border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-amber-200 border border-stone-700 text-xs font-semibold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              <span>Direct Event Inquiries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              Want to Organize an <span className="font-serif italic font-normal text-amber-200">Abhanga Sandhya</span> or Temple Program?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-sans">
              Connect directly with Vishal Jogdeo's official management team for concert bookings, wedding devotional programs, and corporate cultural events.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-200 hover:bg-amber-100 text-stone-900 font-bold text-xs transition-all shadow-xs"
            >
              Book Event Now
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-50 font-medium text-xs border border-stone-700 transition-all text-center"
            >
              View Contact Page
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  </>
  );
};

