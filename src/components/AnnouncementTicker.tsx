import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { UPCOMING_SHOWS } from '../data/mockData';

interface AnnouncementTickerProps {
  onOpenBooking?: () => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#140b0b] via-[#200e0e] to-[#140b0b] text-stone-100 overflow-hidden shadow-xl border-b border-amber-500/30 relative z-30 font-sans">
      <div className="flex items-center max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Marquee Ticker Container */}
        <div className="relative overflow-hidden w-full flex items-center py-2.5 text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {/* Repeat list 3 times to create seamless continuous loop without gaps */}
            {[...UPCOMING_SHOWS, ...UPCOMING_SHOWS, ...UPCOMING_SHOWS].map((show, idx) => (
              <div 
                key={`${show.id}-${idx}`}
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 text-stone-200 hover:text-amber-300 transition-colors"
              >
                <span className="inline-flex items-center gap-1 font-bold text-amber-300 bg-amber-950/90 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-500/40 shadow-sm">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {show.date}
                </span>
                <span className="font-extrabold text-white tracking-wide">{show.title}</span>
                <span className="text-amber-200/90 text-xs flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3 text-amber-400 inline" />
                  {show.venue}
                </span>
                <span className="text-amber-500/80 text-xs px-2">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA Button */}
        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-1.5 ml-3 px-3.5 py-1 bg-gold-gradient hover:opacity-90 text-black font-extrabold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all rounded-full shadow-md hover:scale-105 active:scale-95"
          >
            <span>Book Show</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        )}
      </div>
    </div>
  );
};
