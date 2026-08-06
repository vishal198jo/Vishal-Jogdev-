import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { SEO } from '../components/SEO';

export const GalleryPage: React.FC = () => {
  return (
    <>
      <SEO title="HD Media & Photo Gallery Archive" description="Browse high-definition photos and concert video highlights of Vishal Jogdeo categorized into Live Concerts, Temple Seva, Lifestyle, and Studio sessions." keywords="Vishal Jogdeo Photos, Concert Gallery, Abhanga Sandhya Photos, Devotional Singer Gallery" />
      <div className="pt-20 space-y-8 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
      <GallerySection />
    </div>
  </>
  );
};

