import React from 'react';
import { motion } from 'motion/react';
import { UpcomingShows } from '../components/UpcomingShows';
import { Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ShowsPageProps {
  onOpenBooking: (showTitle?: string) => void;
}

export const ShowsPage: React.FC<ShowsPageProps> = ({ onOpenBooking }) => {
  

  return (
    <>
      <SEO title="Live Concerts & Temple Seva Schedule" description="View upcoming performance dates and venue tickets for Vishal Jogdeo's Abhanga Sandhya concerts in Mumbai, Pune, and overseas temples." keywords="Vishal Jogdeo Concerts, Abhanga Sandhya Schedule, Live Devotional Show, Mumbai Pune Classical Concerts" />
      <div className="pt-20 space-y-8 pb-16">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FDFCFB] border-b border-stone-200 py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Live Performance Schedule</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-stone-900">
            Upcoming <span className="font-serif italic text-amber-900 font-normal">Concerts & Temple Seva</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Check dates and venues for Vishal Jogdeo's upcoming live devotional programs across Mumbai, Pune, and international centers.
          </p>
        </div>
      </motion.div>

      <UpcomingShows onOpenBookingForShow={(show) => onOpenBooking(show.title)} />
    </div>
  </>
  );
};

