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
      {/* JSON-LD Structured Data for Google Image Search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Vishal Jogdeo Official Photo & Concert Gallery",
          "description": "High resolution photos, concert moments, and lifestyle gallery of singer Vishal Jogdeo.",
          "author": {
            "@type": "Person",
            "name": "Vishal Jogdeo",
            "url": "https://vishaljogdeo.com"
          },
          "image": displayPhotos.map(p => ({
            "@type": "ImageObject",
            "contentUrl": p.imageUrl,
            "name": `Vishal Jogdeo - ${p.title || 'Devotional Singer'}`,
            "description": p.description || `Official photo of Marathi devotional singer Vishal Jogdeo (${p.title || 'Live Performance'}).`,
            "caption": `Vishal Jogdeo - ${p.title || 'Concert Image'}`
          }))
        })
      }} />

      {/* CLEAN HEADING ONLY */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">छायाचित्रे व क्षणचित्रे</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white">
            Vishal's Gallery
          </h2>
        </div>

        <button
          onClick={() => navigate('/gallery')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient text-black text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
          title="View all Vishal Jogdeo photos"
        >
          <span>View All Photos</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* SQUARE PHOTOS GRID (7-8 PHOTOS) - CLICKS GO DIRECTLY TO /gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 transform-gpu">
        {displayPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id || idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2) }}
            onClick={handlePhotoClick}
            className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden bg-[#121218] border border-stone-800 hover:border-amber-400/80 shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform-gpu will-change-transform"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 200px' }}
          >
            <ProgressiveImage
              src={photo.imageUrl}
              alt={`Vishal Jogdeo photo - ${photo.title || 'Devotional Singer Concert Photo'}`}
              thumbnailWidth={350}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
              <span className="text-[11px] font-bold text-white mb-1 line-clamp-1">
                {photo.title || 'Vishal Jogdeo'}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-[10px] font-extrabold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                Open Gallery
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
