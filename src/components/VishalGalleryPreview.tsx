import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { GALLERY_ITEMS } from '../data/mockData';
import { ProgressiveImage } from './ProgressiveImage';

export const VishalGalleryPreview: React.FC = () => {
  const navigate = useNavigate();
  const { galleryPhotos } = useFirestoreData();

  // Explicitly sort by newest createdAt first so newly uploaded photos/videos appear 1st
  const sortedPhotos = [...galleryPhotos].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  // Photos list (using Firestore photos if available, else fallback)
  const activePhotos = sortedPhotos.length > 0
    ? sortedPhotos.map(p => ({
        id: p.id,
        imageUrl: p.imageUrl || (p.type === 'video' ? 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop' : ''),
        title: p.title || "Vishal's Gallery",
        type: p.type || 'photo'
      }))
    : GALLERY_ITEMS.map(p => ({
        id: p.id,
        imageUrl: p.imageUrl,
        title: p.title,
        type: p.type || 'photo'
      }));

  // Take latest 8 photos in square shape (newest photo/video is 1st)
  const displayPhotos = activePhotos.slice(0, 8);

  const handlePhotoClick = () => {
    navigate('/gallery');
  };

  return (
    <section className="py-8 space-y-6 w-full border-t border-amber-500/20" id="vishal-gallery-preview">
      {/* CLEAN HEADING ONLY */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white">
          Vishal's <span className="font-serif italic text-gold-gradient font-normal">Gallery</span>
        </h2>

        <button
          onClick={() => navigate('/gallery')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient text-black text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* SQUARE PHOTOS GRID (7-8 PHOTOS) - CLICKS GO DIRECTLY TO /gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {displayPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id || idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            onClick={handlePhotoClick}
            className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden bg-[#121218] border border-stone-800 hover:border-amber-400/80 shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
          >
            <ProgressiveImage
              src={photo.imageUrl}
              alt={photo.title}
              thumbnailWidth={400}
              className="w-full h-full group-hover:scale-108 transition-transform duration-500"
            />
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-full bg-amber-500 text-black text-[11px] font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                Open Gallery
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
