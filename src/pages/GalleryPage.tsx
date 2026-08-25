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
      <div className="pt-20 space-y-8 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
        <div className="bg-[#121218] border-b border-amber-500/20 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Vishal Jogdeo <span className="font-serif italic text-gold-gradient font-normal">Photos & Lifestyle Gallery</span>
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
              विशाल जोगदेव यांचे लाईव्ह कॉन्सर्ट, भक्तीसंध्या, पुरस्कार सोहळे व सांगीतिक प्रवासातील क्षणचित्रे.
            </p>
          </div>
        </div>
        <GallerySection />
      </div>
    </>
  );
};

