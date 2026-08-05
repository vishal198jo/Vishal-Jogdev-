import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  

  return (
    <>
      <SEO title="Official Booking & Contact Management" description="Inquire about booking Vishal Jogdeo for Abhanga Sandhya, temple programs, devotional concerts, and music recording projects." keywords="Book Vishal Jogdeo, Abhanga Sandhya Booking, Devotional Singer Inquiry, Contact Management" />
      <div className="pt-20 space-y-8 pb-16">
      <ContactSection />
    </div>
  </>
  );
};


