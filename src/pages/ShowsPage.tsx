import React from 'react';
import { motion } from 'motion/react';
import { UpcomingShows } from '../components/UpcomingShows';
import { Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useFirestoreData } from '../hooks/useFirestoreData';

interface ShowsPageProps {
  onOpenBooking: (showTitle?: string) => void;
}

export const ShowsPage: React.FC<ShowsPageProps> = ({ onOpenBooking }) => {
  const { shows, loading } = useFirestoreData();

  return (
    <>
      <SEO 
        title="Vishal Jogdeo Live Shows & Concert Schedule | Abhanga Sandhya" 
        description="Check upcoming live show dates, concert venues, and event tickets for Vishal Jogdeo (Vishal Jogdev). Book live Abhanga Sandhya, Bhagwati Jagran, and temple programs." 
        keywords="Vishal Jogdeo Live Show, Vishal Jogdeo Concerts, Vishal Jogdeo Tour Dates, Abhanga Sandhya Booking, Bhagwati Jagran Vishal Jogdeo, Vishal Jogdev Live" 
      />
      <div className="pt-20 sm:pt-24 space-y-8 pb-16">
        <UpcomingShows shows={shows} loading={loading} onOpenBookingForShow={(show) => onOpenBooking(show.title)} />
      </div>
  </>
  );
};

