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
    <section id="shows" className="py-12 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="flex justify-start mb-8 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 border border-stone-200">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-stone-900 text-stone-50 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
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
                  className="bg-white border border-stone-200 hover:border-amber-800 p-5 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group"
                >
                  {/* Date Badge Column */}
                  <div className="w-full md:w-28 bg-stone-50 border border-stone-200 p-3 text-center shrink-0 flex flex-row md:flex-col items-center justify-around md:justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 font-heading">{monthStr}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">{dayStr}</span>
                    <span className="text-[10px] font-medium text-stone-500">{yearStr}</span>
                  </div>

                  {/* Banner thumbnail */}
                  <div className="w-full md:w-44 h-28 overflow-hidden shrink-0 relative bg-stone-100 border border-stone-200">
                    <img
                      src={show.bannerImage}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-950/10" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold">
                      {show.status}
                    </span>
                  </div>

                  {/* Show Details */}
                  <div className="flex-1 space-y-2 w-full text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 border border-amber-200">
                        {show.city}, {show.state}
                      </span>
                      {show.isOrganizedByTrust && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-medium">
                          Trust Event
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-heading group-hover:text-amber-900 transition-colors">
                      {show.title}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-600 font-sans pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-800" />
                        <strong>Venue:</strong> {show.venue}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-800" />
                        <strong>Time:</strong> {show.time}
                      </span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => onOpenBookingForShow(show)}
                      className="flex-1 md:flex-initial px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-3.5 h-3.5 text-stone-50" />
                      <span>Book Pass</span>
                    </button>

                    <button
                      onClick={() => setSelectedShowDetails(show)}
                      className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-800" />
                      <span>Details</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State as requested */
          <div className="p-10 text-center bg-white border border-stone-200 space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600">
              <Calendar className="w-5 h-5 text-stone-600" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-heading">No Upcoming Shows</h3>
            <p className="text-xs text-stone-500 font-sans">
              There are currently no listed concerts matching "{selectedCity}". Check back soon or request a custom event in your city.
            </p>
            <button
              onClick={() => setSelectedCity('All')}
              className="px-4 py-2 bg-stone-900 text-stone-50 font-medium text-xs"
            >
              View All Locations
            </button>
          </div>
        )}

      </div>

      {/* Show Details Modal */}
      {selectedShowDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FDFCFB] border border-stone-200 max-w-xl w-full p-6 sm:p-8 space-y-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setSelectedShowDetails(null)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors border border-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">{selectedShowDetails.city}, {selectedShowDetails.state}</span>
              <h3 className="text-2xl font-bold font-heading text-stone-900">{selectedShowDetails.title}</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              <p><strong className="text-stone-900 font-medium">Date & Time:</strong> {selectedShowDetails.date} at {selectedShowDetails.time}</p>
              <p><strong className="text-stone-900 font-medium">Venue Address:</strong> {selectedShowDetails.venue}, {selectedShowDetails.city}</p>
              <p><strong className="text-stone-900 font-medium">Event Overview:</strong> {selectedShowDetails.description}</p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedShowDetails(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedShowDetails;
                  setSelectedShowDetails(null);
                  onOpenBookingForShow(s);
                }}
                className="px-5 py-2.5 bg-stone-900 text-stone-50 font-medium text-xs hover:bg-stone-800 transition-colors"
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

