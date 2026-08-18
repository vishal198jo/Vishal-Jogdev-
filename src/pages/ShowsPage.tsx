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

  // Build Event JSON-LD schema for active upcoming shows
  const eventsSchema = shows.filter(s => s.status === 'upcoming').map(s => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": s.title,
    "startDate": s.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": s.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": s.city,
        "addressCountry": "IN"
      }
    },
    "performer": {
      "@type": "Person",
      "name": "Vishal Jogdeo",
      "sameAs": "https://vishaljogdeo.com"
    },
    "description": `Live devotional concert "${s.title}" by Vishal Jogdeo in ${s.city}. Book passes and attend spiritual musical evening.`,
    "offers": {
      "@type": "Offer",
      "url": "https://vishaljogdeo.com/contact",
      "availability": "https://schema.org/InStock",
      "price": s.ticketPrice ? String(s.ticketPrice).replace(/[^0-9]/g, '') || "0" : "0",
      "priceCurrency": "INR"
    }
  }));

  return (
    <>
      <SEO 
        title="Vishal Jogdeo Live Shows & Concert Schedule | Abhanga Sandhya Booking" 
        description="Check upcoming live show dates, concert venues, and event tickets for Vishal Jogdeo (Vishal Jogdev). Book live Abhanga Sandhya, Bhagwati Jagran, and temple programs." 
        keywords="Vishal Jogdeo Live Show, Vishal Jogdeo Concerts, Vishal Jogdeo Tour Dates, Abhanga Sandhya Booking, Bhagwati Jagran Vishal Jogdeo, Bhajan Sandhya, विशाल जोगदेव लाईव्ह शो, अभंग संध्या, Vishal Jogdev Live" 
        url="/shows"
        schema={eventsSchema.length > 0 ? eventsSchema : undefined}
      />
      <div className="pt-20 sm:pt-24 space-y-8 pb-16">
        <UpcomingShows shows={shows} loading={loading} onOpenBookingForShow={(show) => onOpenBooking(show.title)} />
      </div>
  </>
  );
};

