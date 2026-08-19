import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, Info, X, CalendarCheck2, Building2 } from 'lucide-react';
import { Show } from '../types';

interface UpcomingShowsProps {
  shows?: Show[];
  onOpenBookingForShow?: (show: Show) => void;
  loading?: boolean;
}

export const UpcomingShows: React.FC<UpcomingShowsProps> = ({ shows, loading = false }) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedShowDetails, setSelectedShowDetails] = useState<Show | null>(null);

  const activeShowsList = (shows && shows.length > 0) ? shows : [];

  const now = new Date();

  // Sort: Genuine Upcoming Shows come FIRST (ascending order by date), Past Shows come UNDERNEATH (descending order)
  const sortedShowsList = [...activeShowsList].sort((a, b) => {
    const timeA = a.date ? new Date(`${a.date}T23:59:59`).getTime() : 0;
    const timeB = b.date ? new Date(`${b.date}T23:59:59`).getTime() : 0;

    const isUpcomingA = timeA >= now.getTime() && a.status !== 'past' && a.status !== 'completed';
    const isUpcomingB = timeB >= now.getTime() && b.status !== 'past' && b.status !== 'completed';

    // 1. Upcoming shows first, past shows below
    if (isUpcomingA && !isUpcomingB) return -1;
    if (!isUpcomingA && isUpcomingB) return 1;

    // 2. If both are upcoming: earliest date first (ascending)
    if (isUpcomingA && isUpcomingB) {
      return timeA - timeB;
    }

    // 3. If both are past: most recent past show first (descending)
    return timeB - timeA;
  });

  const cities = ['All', ...Array.from(new Set(sortedShowsList.map(s => s.city).filter(Boolean)))];

  const filteredShows = selectedCity === 'All'
    ? sortedShowsList
    : sortedShowsList.filter(s => s.city.toLowerCase().includes(selectedCity.toLowerCase()));

  // Lock background screen scrolling when details modal is open
  useEffect(() => {
    if (selectedShowDetails) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedShowDetails]);

  const handleNavigateToContact = () => {
    if (selectedShowDetails) {
      setSelectedShowDetails(null);
    }
    navigate('/contact');
  };

  if (loading) {
    return (
      <section id="shows" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-6 bg-stone-900 border border-stone-800 rounded-full w-40 mx-auto animate-pulse"></div>
          <div className="h-10 bg-stone-900 rounded-xl w-72 mx-auto animate-pulse"></div>
          <div className="space-y-4 pt-10">
            <div className="h-24 bg-[#121218] border border-stone-800 rounded-3xl animate-pulse"></div>
            <div className="h-24 bg-[#121218] border border-stone-800 rounded-3xl animate-pulse"></div>
            <div className="h-24 bg-[#121218] border border-stone-800 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shows" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Upcoming Concerts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Upcoming <span className="font-serif italic text-gold-gradient font-normal">Shows</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
            Discover upcoming Abhang sandhya concerts, devotional events, and Wedding shows.
          </p>
        </div>

        {/* Filter Bar */}
        {cities.length > 2 && (
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#121218] border border-stone-800 rounded-full shadow-lg">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                    selectedCity === city
                      ? 'bg-gold-gradient text-black shadow-md scale-105'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Cards Grid */}
        {filteredShows.length > 0 ? (
          <div className="space-y-4">
            {filteredShows.map((show, idx) => {
              let dayStr = '--';
              let monthStr = 'EVENT';
              let yearStr = '2026';
              let showDateObj = new Date();

              if (show.date) {
                const showDate = new Date(show.date);
                if (!isNaN(showDate.getTime())) {
                  dayStr = String(showDate.getDate());
                  monthStr = showDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                  yearStr = String(showDate.getFullYear());
                }
                const parsedDateObj = new Date(`${show.date}T23:59:59`);
                if (!isNaN(parsedDateObj.getTime())) {
                  showDateObj = parsedDateObj;
                }
              }

              const now = new Date();
              const isUpcoming = showDateObj >= now;

              return (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-[#121218] border border-stone-800 hover:border-amber-500/50 p-5 rounded-3xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group shadow-xl hover:shadow-2xl"
                >
                  {/* Date Badge Column */}
                  <div className="w-full md:w-28 bg-stone-900 border border-amber-500/30 rounded-2xl p-3 text-center shrink-0 flex flex-row md:flex-col items-center justify-around md:justify-center shadow-inner">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-heading">{monthStr}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">{dayStr}</span>
                    <span className="text-[10px] font-medium text-stone-400">{yearStr}</span>
                  </div>

                  {/* Banner thumbnail - Real Natural Aspect Ratio Container (No Cropping / No Distortion) */}
                  <div className="w-full md:w-56 h-36 sm:h-40 overflow-hidden shrink-0 relative rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center p-1.5 group/img shadow-inner">
                    <img
                      src={show.bannerImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"}
                      alt={show.title}
                      className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-300 rounded-xl"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {isUpcoming ? (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/85 border border-amber-500/50 text-amber-300 text-[10px] font-bold shadow-md">
                        Upcoming
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-stone-900/90 border border-stone-800 text-stone-400 text-[10px] font-medium shadow-md">
                        Past Show
                      </span>
                    )}
                  </div>

                  {/* Show Details */}
                  <div className="flex-1 space-y-2 w-full text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="text-xs font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {show.city}{show.state ? `, ${show.state}` : ''}
                      </span>
                      {show.isOrganizedByTrust && (
                        <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                          Trust Event
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                      {show.title}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-300 font-sans pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <strong className="text-amber-200">Venue:</strong> {show.venue}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <strong className="text-amber-200">Time:</strong> {show.time}
                      </span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={handleNavigateToContact}
                      className="flex-1 md:flex-initial px-5 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 shadow-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <CalendarCheck2 className="w-3.5 h-3.5 text-black" />
                      <span>Book for Your Event</span>
                    </button>

                    <button
                      onClick={() => setSelectedShowDetails(show)}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-xs rounded-full border border-stone-800 hover:border-amber-500/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>Details</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-10 text-center bg-[#121218] border border-stone-800 rounded-3xl space-y-4 max-w-md mx-auto shadow-xl">
            <div className="w-12 h-12 mx-auto bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">No Upcoming Shows</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              There are currently no listed concerts matching "{selectedCity}". You can book a custom Abhang Sandhya or Devotional program for your event.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setSelectedCity('All')}
                className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 font-medium text-xs rounded-full border border-stone-800 transition-colors"
              >
                View All Locations
              </button>
              <button
                onClick={handleNavigateToContact}
                className="w-full sm:w-auto px-5 py-2 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 transition-transform"
              >
                Book for Your Event
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Show Details Modal with Background Scroll Lock & Real Aspect Ratio Poster */}
      <AnimatePresence>
        {selectedShowDetails && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedShowDetails(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121218] border border-amber-500/40 rounded-3xl max-w-xl w-full text-stone-100 shadow-2xl relative overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Top Banner Image Header - Uncropped Real Size Poster Display */}
              {selectedShowDetails.bannerImage && (
                <div className="relative w-full max-h-[380px] bg-stone-950 shrink-0 overflow-hidden border-b border-stone-800 flex items-center justify-center p-3 sm:p-4">
                  <img 
                    src={selectedShowDetails.bannerImage} 
                    alt={selectedShowDetails.title}
                    className="w-full max-h-[320px] sm:max-h-[360px] object-contain object-center rounded-2xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md">
                      {selectedShowDetails.city}{selectedShowDetails.state ? `, ${selectedShowDetails.state}` : ''}
                    </span>
                    {selectedShowDetails.isOrganizedByTrust && (
                      <span className="px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md">
                        Trust Seva
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelectedShowDetails(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/70 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition-colors border border-stone-700 shadow-lg cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body with internal smooth scroll */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                    Devotional Concert Details
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                    {selectedShowDetails.title}
                  </h3>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-3.5 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Date & Time</span>
                    </div>
                    <p className="text-sm font-medium text-white pl-6">
                      {selectedShowDetails.date} • {selectedShowDetails.time}
                    </p>
                  </div>

                  <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-3.5 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Location</span>
                    </div>
                    <p className="text-sm font-medium text-white pl-6">
                      {selectedShowDetails.city}{selectedShowDetails.state ? `, ${selectedShowDetails.state}` : ''}
                    </p>
                  </div>

                  <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-3.5 space-y-1 sm:col-span-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                      <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Venue Address</span>
                    </div>
                    <p className="text-sm font-medium text-stone-200 pl-6 leading-snug">
                      {selectedShowDetails.venue}
                    </p>
                  </div>
                </div>

                {/* Event Overview / Description */}
                {selectedShowDetails.description && (
                  <div className="space-y-2 pt-2 border-t border-stone-800/80">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Event Overview & Instructions
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed whitespace-pre-line bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                      {selectedShowDetails.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer CTAs */}
              <div className="p-4 sm:p-6 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedShowDetails(null)}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-medium rounded-full border border-stone-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleNavigateToContact}
                  className="px-6 py-2.5 bg-gold-gradient text-black font-extrabold text-xs sm:text-sm rounded-full hover:opacity-95 shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <CalendarCheck2 className="w-4 h-4 text-black" />
                  <span>Book for Your Event</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
