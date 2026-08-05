import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { useSEO } from '../hooks/useSEO';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  useSEO({
    title: "Official Booking & Contact Management",
    description: "Inquire about booking Vishal Jogdeo for Abhanga Sandhya, temple programs, devotional concerts, and music recording projects.",
    keywords: "Book Vishal Jogdeo, Abhanga Sandhya Booking, Devotional Singer Inquiry, Contact Management"
  });

  return (
    <div className="pt-20 space-y-8 pb-16">
      <ContactSection />
    </div>
  );
};


