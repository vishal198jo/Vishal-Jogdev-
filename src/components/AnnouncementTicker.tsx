import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { UPCOMING_SHOWS } from '../data/mockData';

interface AnnouncementTickerProps {
  onOpenBooking?: () => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ onOpenBooking }) => {
  return (
    <div style={{ backgroundColor: '#ff0000' }} className="w-full text-stone-100 overflow-hidden shadow-md border-b border-red-950/40 relative z-30 font-sans">
      <div className="flex items-center max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Marquee Ticker Container */}
        <div className="relative overflow-hidden w-full flex items-center py-2 text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {/* Repeat list 3 times to create seamless continuous loop without gaps */}
            {[...UPCOMING_SHOWS, ...UPCOMING_SHOWS, ...UPCOMING_SHOWS].map((show, idx) => (
              <div 
                key={`${show.id}-${idx}`}
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 text-stone-200 hover:text-yellow-300 transition-colors"
              >
                <span className="inline-flex items-center gap-1 font-semibold text-yellow-400 bg-amber-950/70 px-2 py-0.5 rounded text-[11px] border border-amber-700/50">
                  <Calendar className="w-3 h-3 text-yellow-400" />
                  {show.date}
                </span>
                <span className="font-bold text-white tracking-wide">{show.title}</span>
                <span className="text-amber-200/90 text-xs flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-yellow-400 inline" />
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
            className="hidden sm:flex items-center gap-1.5 ml-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all rounded-sm shadow"
          >
            <span>Book Show</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
