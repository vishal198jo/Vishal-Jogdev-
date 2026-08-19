import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { GALLERY_ITEMS } from '../data/mockData';
import { ProgressiveImage } from './ProgressiveImage';

export const VishalGalleryPreview: React.FC = () => {
  const navigate = useNavigate();
  const { galleryPhotos, galleryFolders } = useFirestoreData();

  // Filter ONLY photos (exclude videos)
  const photoList = galleryPhotos.length > 0
    ? galleryPhotos.filter(p => p.type !== 'video' && !p.videoUrl && !(p.imageUrl && (p.imageUrl.includes('.mp4') || p.imageUrl.includes('.webm') || p.imageUrl.includes('.mov') || p.imageUrl.includes('.m3u8'))))
    : GALLERY_ITEMS.filter(p => p.type !== 'video');

  const sortedPhotos = [...photoList].sort((a, b) => {
    const timeA = 'createdAt' in a && a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = 'createdAt' in b && b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  // Sabhi folders ke thode thode photo select karo taki sabhi cover ho
  const foldersToCover = galleryFolders.length > 0 ? galleryFolders : [];
  const selectedPhotos: typeof sortedPhotos = [];

  // First pass: pick 1 photo from each folder to guarantee all folders are covered
  foldersToCover.forEach(folder => {
    const folderPhoto = sortedPhotos.find(p => p.folderId === folder.id && !selectedPhotos.some(sp => sp.id === p.id));
    if (folderPhoto) {
      selectedPhotos.push(folderPhoto);
    }
  });

  // Second pass: fill up to 8 photos with remaining recent photos
  sortedPhotos.forEach(p => {
    if (selectedPhotos.length < 8 && !selectedPhotos.some(sp => sp.id === p.id)) {
      selectedPhotos.push(p);
    }
  });

  // Fallback if list is empty
  const displayPhotos = (selectedPhotos.length > 0 ? selectedPhotos : sortedPhotos).slice(0, 8);

  const handlePhotoClick = () => {
    navigate('/gallery');
  };

  return (
    <section className="py-8 space-y-6 w-full border-t border-amber-500/20" id="vishal-gallery-preview">
      {/* CLEAN HEADING ONLY */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white">
          Vishal's Gallery
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
