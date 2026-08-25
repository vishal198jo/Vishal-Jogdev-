import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { SEO } from '../components/SEO';

export const GalleryPage: React.FC = () => {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://vishaljogdeo.com/gallery#gallery",
    "name": "Vishal Jogdeo HD Photo & Concert Gallery",
    "url": "https://vishaljogdeo.com/gallery",
    "description": "Exclusive collection of high resolution concert photos, lifestyle images, and musical performance moments of devotional playback singer Vishal Jogdeo.",
    "author": {
      "@type": "Person",
      "name": "Vishal Jogdeo",
      "sameAs": "https://vishaljogdeo.com"
    }
  };

  return (
    <>
      <SEO 
        title="Vishal Jogdeo Photos, Lifestyle & Concert Pictures | HD Image Gallery" 
        description="Browse high-definition photos and concert gallery of Vishal Jogdeo (Vishal Jogdev). Explore live stage images, lifestyle photos, studio recordings, and award ceremonies." 
        keywords="Vishal Jogdeo Photos, Vishal Jogdeo Lifestyle, Vishal Jogdeo HD Images, Vishal Jogdeo Gallery, Vishal Jogdeo Concert Pictures, Vishal Jogdev Photos, Vishal Jogdeo, Vishal Jogdev, विशाल जोगदेव फोटो गॅलरी, विशाल जोगदेव" 
        url="/gallery"
        schema={gallerySchema}
      />
      <div className="pt-20 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
        <GallerySection />
      </div>
    </>
  );
};

