import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { useSEO } from '../hooks/useSEO';

export const GalleryPage: React.FC = () => {
  useSEO({
    title: "HD Media & Photo Gallery Archive",
    description: "Browse high-definition photos and concert video highlights of Vishal Jogdeo categorized into Live Concerts, Temple Seva, Lifestyle, and Studio sessions.",
    keywords: "Vishal Jogdeo Photos, Concert Gallery, Abhanga Sandhya Photos, Devotional Singer Gallery"
  });

  return (
    <div className="pt-20 space-y-8 pb-16">
      <GallerySection />
    </div>
  );
};

