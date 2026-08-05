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
      <div className="pt-28 sm:pt-32 space-y-8 pb-16">
        <UpcomingShows onOpenBookingForShow={(show) => onOpenBooking(show.title)} />
      </div>
  </>
  );
};

