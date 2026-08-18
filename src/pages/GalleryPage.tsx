import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { SEO } from '../components/SEO';

export const GalleryPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Vishal Jogdeo Photos & Lifestyle Gallery | HD Images Archive" 
        description="Browse high-definition photos and video highlights of Vishal Jogdeo (Vishal Jogdev). Explore concert images, lifestyle photos, studio sessions, and temple performances." 
        keywords="Vishal Jogdeo Photos, Vishal Jogdeo Lifestyle, Vishal Jogdeo HD Images, Vishal Jogdeo Gallery, Vishal Jogdeo Concert Pictures, Vishal Jogdev Photos, विशाल जोगदेव फोटो गॅलरी, अभंग संध्या फोटो" 
        url="/gallery"
      />
      <div className="pt-20 space-y-8 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
      <GallerySection />
    </div>
  </>
  );
};

