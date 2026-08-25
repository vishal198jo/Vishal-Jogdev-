import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Book Vishal Jogdeo | Official Contact & Inquiries",
    "url": "https://vishaljogdeo.com/contact",
    "description": "Official booking and contact page for devotional playback singer Vishal Jogdeo.",
    "mainEntity": {
      "@type": "Person",
      "name": "Vishal Jogdeo",
      "telephone": "+91-7038086864",
      "email": "vishaljogdeo22@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Book Vishal Jogdeo | Official Contact, Phone Number & Event Inquiries" 
        description="Book Vishal Jogdeo (Vishal Jogdev) for live Abhanga Sandhya concerts, Bhajan programs, weddings, and studio recordings. Official contact details and phone number." 
        keywords="Book Vishal Jogdeo, Vishal Jogdeo Contact, Vishal Jogdeo Phone Number, Vishal Jogdeo Event Booking, Vishal Jogdeo Management, Vishal Jogdeo, Vishal Jogdev, विशाल जोगदेव संपर्क" 
        url="/contact"
        schema={contactSchema}
      />
      <div className="pt-20 space-y-8 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
      <ContactSection />
    </div>
  </>
  );
};


