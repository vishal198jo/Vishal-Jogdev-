import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Ticket, ChevronRight, Info, CheckCircle2, X } from 'lucide-react';
import { Show } from '../types';
import { UPCOMING_SHOWS } from '../data/mockData';

interface UpcomingShowsProps {
  onOpenBookingForShow: (show: Show) => void;
}

export const UpcomingShows: React.FC<UpcomingShowsProps> = ({ onOpenBookingForShow }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedShowDetails, setSelectedShowDetails] = useState<Show | null>(null);

  const cities = ['All', 'Mumbai', 'Pune', 'Nashik', 'San Jose, CA'];

  const filteredShows = selectedCity === 'All'
    ? UPCOMING_SHOWS
    : UPCOMING_SHOWS.filter(s => s.city.toLowerCase().includes(selectedCity.toLowerCase()));

  return (
    <section id="shows" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Tour & Concert Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Upcoming <span className="font-serif italic text-gold-gradient font-normal">Concerts & Seva</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-sans">
            Experience live Abhanga Sandhya performances in prestigious halls and sacred temple auditoriums.
          </p>
        </div>

        {/* Filter Bar */}
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

        {/* Timeline Cards Grid */}
        {filteredShows.length > 0 ? (
          <div className="space-y-4">
            {filteredShows.map((show, idx) => {
              const showDate = new Date(show.date);
              const dayStr = showDate.getDate();
              const monthStr = showDate.toLocaleString('default', { month: 'short' }).toUpperCase();
              const yearStr = showDate.getFullYear();

              return (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-[#121218] border border-stone-800 hover:border-amber-500/50 p-5 rounded-3xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group shadow-xl"
                >
                  {/* Date Badge Column */}
                  <div className="w-full md:w-28 bg-stone-900 border border-amber-500/30 rounded-2xl p-3 text-center shrink-0 flex flex-row md:flex-col items-center justify-around md:justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-heading">{monthStr}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">{dayStr}</span>
                    <span className="text-[10px] font-medium text-stone-400">{yearStr}</span>
                  </div>

                  {/* Banner thumbnail */}
                  <div className="w-full md:w-44 h-28 overflow-hidden shrink-0 relative rounded-2xl bg-stone-900 border border-stone-800">
                    <img
                      src={show.bannerImage}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                      {show.status}
                    </span>
                  </div>

                  {/* Show Details */}
                  <div className="flex-1 space-y-2 w-full text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="text-xs font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {show.city}, {show.state}
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
                      onClick={() => onOpenBookingForShow(show)}
                      className="flex-1 md:flex-initial px-5 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-3.5 h-3.5 text-black" />
                      <span>Book Pass</span>
                    </button>

                    <button
                      onClick={() => setSelectedShowDetails(show)}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-xs rounded-full border border-stone-800 flex items-center justify-center gap-1.5 transition-colors"
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
          <div className="p-10 text-center bg-[#121218] border border-stone-800 rounded-3xl space-y-3 max-w-md mx-auto shadow-xl">
            <div className="w-12 h-12 mx-auto bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">No Upcoming Shows</h3>
            <p className="text-xs text-stone-400 font-sans">
              There are currently no listed concerts matching "{selectedCity}". Check back soon or request a custom event in your city.
            </p>
            <button
              onClick={() => setSelectedCity('All')}
              className="px-5 py-2.5 bg-gold-gradient text-black font-bold text-xs rounded-full"
            >
              View All Locations
            </button>
          </div>
        )}

      </div>

      {/* Show Details Modal */}
      {selectedShowDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#121218] border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-stone-100 shadow-2xl relative">
            <button
              onClick={() => setSelectedShowDetails(null)}
              className="absolute top-4 right-4 p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full transition-colors border border-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-stone-800 pb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{selectedShowDetails.city}, {selectedShowDetails.state}</span>
              <h3 className="text-2xl font-bold font-heading text-white">{selectedShowDetails.title}</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              <p><strong className="text-amber-300 font-medium">Date & Time:</strong> {selectedShowDetails.date} at {selectedShowDetails.time}</p>
              <p><strong className="text-amber-300 font-medium">Venue Address:</strong> {selectedShowDetails.venue}, {selectedShowDetails.city}</p>
              <p><strong className="text-amber-300 font-medium">Event Overview:</strong> {selectedShowDetails.description}</p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedShowDetails(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-medium rounded-full border border-stone-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedShowDetails;
                  setSelectedShowDetails(null);
                  onOpenBookingForShow(s);
                }}
                className="px-5 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 transition-colors"
              >
                Book Pass Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

