import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  X, 
  ArrowLeft, 
  Folder, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Download, 
  Loader2,
  MoreVertical
} from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_FOLDERS, GALLERY_ITEMS, SINGER_PROFILE } from '../data/mockData';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { CardSkeleton } from './SkeletonLoader';
import { HLSVideoPlayer } from './HLSVideoPlayer';
import { SEO } from './SEO';
import { db } from '../lib/firebase';
import { doc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { ProgressiveImage } from './ProgressiveImage';
import { HDLightboxImage } from './HDLightboxImage';
import { downloadMediaFile, sanitizeDownloadFilename } from '../utils/downloadHelper';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
  }),
};

// Helper function to format view counts cleanly (e.g. 100, 1.2k, 2k, 1m)
const formatViewsCount = (views?: number): string => {
  if (!views || views <= 0) return '0';
  if (views < 1000) return `${views}`;
  if (views < 1000000) {
    const k = views / 1000;
    const formatted = k < 100 ? (k % 1 === 0 ? k : Number(k.toFixed(1))) : Math.round(k);
    return `${formatted}k`;
  }
  const m = views / 1000000;
  const formatted = m < 100 ? (m % 1 === 0 ? m : Number(m.toFixed(1))) : Math.round(m);
  return `${formatted}m`;
};

export const GallerySection: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [panConstraints, setPanConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    const containerRatio = containerWidth / containerHeight;
    const imgRatio = imgWidth / imgHeight;

    let fittedWidth = containerWidth;
    let fittedHeight = containerHeight;

    if (imgRatio > containerRatio) {
      fittedHeight = containerWidth / imgRatio;
    } else {
      fittedWidth = containerHeight * imgRatio;
    }

    setImageSize({ width: fittedWidth, height: fittedHeight });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageSize.width || !imageSize.height) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const limitX = Math.max(0, (imageSize.width * zoomScale - containerWidth) / 2);
    const limitY = Math.max(0, (imageSize.height * zoomScale - containerHeight) / 2);

    setPanConstraints({
      left: -limitX,
      right: limitX,
      top: -limitY,
      bottom: limitY
    });
  }, [zoomScale, imageSize, selectedItem]);

  const { galleryFolders, galleryPhotos, loading } = useFirestoreData();

  const activeFolders = galleryFolders.length > 0 
    ? [...galleryFolders]
        .sort((a, b) => {
          const orderA = typeof a.order === 'number' ? a.order : 99999;
          const orderB = typeof b.order === 'number' ? b.order : 99999;
          if (orderA !== orderB) return orderA - orderB;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        })
        .map(f => ({
          id: f.id,
          name: f.name,
          description: f.description || '',
          coverImage: f.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
          count: f.count || 0,
          order: f.order
        }))
    : [];

  const sortedGalleryPhotos = [...galleryPhotos].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  const activeItems = sortedGalleryPhotos.length > 0 
    ? sortedGalleryPhotos.map(p => {
        const isVid = p.type === 'video' || (p.videoUrl && p.videoUrl.trim() !== '') || (p.imageUrl && (p.imageUrl.includes('.mp4') || p.imageUrl.includes('.webm') || p.imageUrl.includes('.mov') || p.imageUrl.includes('.m3u8') || p.imageUrl.includes('blob:')));
        const actualVideoUrl = p.videoUrl || (isVid && p.imageUrl && (p.imageUrl.includes('.mp4') || p.imageUrl.includes('.webm') || p.imageUrl.includes('.mov') || p.imageUrl.includes('.m3u8') || p.imageUrl.includes('blob:')) ? p.imageUrl : '');
        const actualImageUrl = !isVid ? (p.imageUrl || '') : (p.imageUrl && !p.imageUrl.includes('.mp4') && !p.imageUrl.includes('.webm') && !p.imageUrl.includes('.mov') && !p.imageUrl.includes('.m3u8') && !p.imageUrl.includes('blob:') && !p.imageUrl.includes('unsplash.com') ? p.imageUrl : '');

        return {
          id: p.id,
          folderId: p.folderId,
          folderName: p.folderName || '',
          title: p.title || (isVid ? 'Concert Video' : 'Concert Photo'),
          type: (isVid ? 'video' : 'photo') as 'photo' | 'video' | 'event',
          imageUrl: actualImageUrl,
          videoUrl: actualVideoUrl,
          youtubeId: p.youtubeId || '',
          category: p.category || 'Concert',
          description: p.description || '',
          date: p.createdAt || '',
          location: '',
          views: typeof p.views === 'number' ? p.views : 0
        };
      })
    : [];

  // Active folder object
  const activeFolder = activeFolders.find(f => f.id === selectedFolderId);

  // Filter items based on selected folder or all items if no folder selected
  const displayItems = activeItems.filter(item => {
    return selectedFolderId ? item.folderId === selectedFolderId : true;
  });

  const activeIndex = selectedItem
    ? ((page % displayItems.length) + displayItems.length) % displayItems.length
    : -1;

  const currentItem = selectedItem && activeIndex >= 0 ? displayItems[activeIndex] : null;

  const paginate = (newDirection: number) => {
    if (displayItems.length <= 1) return;
    setMenuOpen(false);
    setZoomScale(1); // Reset zoom on photo change
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const handleOpenItem = (item: GalleryItem, index: number) => {
    setMenuOpen(false);
    setZoomScale(1);
    setPage([index, 0]);
    setSelectedItem(item);
  };

  // Increment photo views strictly once per user session when it becomes the current displayed item
  useEffect(() => {
    if (currentItem && currentItem.id) {
      const sessionKey = `viewed_photo_${currentItem.id}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, 'true');
        const incrementPhotoView = async () => {
          try {
            await updateDoc(doc(db, 'gallery_photos', currentItem.id), {
              views: increment(1)
            });
            await setDoc(doc(db, 'stats', 'global'), {
              totalPhotoViews: increment(1)
            }, { merge: true });
          } catch (e) {
            console.warn("Failed to increment photo views:", e);
          }
        };
        incrementPhotoView();
      }
    }
  }, [currentItem?.id]);

  const handleClose = () => {
    setSelectedItem(null);
    setZoomScale(1);
    setMenuOpen(false);
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadMedia = async (url: string, title: string, type: string) => {
    if (!url || isDownloading) return;
    setIsDownloading(true);
    try {
      const extension = type === 'video' ? 'mp4' : 'jpg';
      const targetFilename = sanitizeDownloadFilename(title, 'vishal_jogdeo_media', extension);
      const mediaType = type === 'video' ? 'video' : 'image';
      
      await downloadMediaFile(url, targetFilename, mediaType);
    } catch (e) {
      console.error('Error downloading media:', e);
    } finally {
      setIsDownloading(false);
      setMenuOpen(false);
    }
  };

  // Lock body scroll when full screen photo lightbox is active
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  // Keyboard Navigation
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, displayItems.length, page]);

  const toggleZoom = () => {
    setZoomScale(prev => (prev > 1 ? 1 : 2.5));
  };

  const zoomIn = () => setZoomScale(prev => Math.min(prev + 0.5, 3.5));
  const zoomOut = () => setZoomScale(prev => Math.max(prev - 0.5, 1));

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Dynamic SEO meta calculation based on folder or photo/video selection
  let seoTitle = "HD Media & Photo Gallery Archive | Vishal Jogdeo";
  let seoDescription = "Browse high-definition photos and concert video highlights of Vishal Jogdeo categorized into Live Concerts, Temple Seva, Lifestyle, and Studio sessions.";
  let seoKeywords = "Vishal Jogdeo Photos, Concert Gallery, Abhanga Sandhya Photos, Devotional Singer Gallery, विशाल जोगदेव फोटो";
  let seoImage = SINGER_PROFILE.portraitImage;
  let seoUrl = "/gallery";

  if (selectedItem) {
    seoTitle = `${selectedItem.title} - Photo & Video Gallery | Vishal Jogdeo`;
    seoDescription = selectedItem.description || `View high-definition photo/video of "${selectedItem.title}" from Vishal Jogdeo's official archive.`;
    seoKeywords = `${selectedItem.title}, Vishal Jogdeo Gallery, ${selectedItem.category || 'Concert'}, Devotional Singer Photos, Vishal Jogdev`;
    seoImage = selectedItem.imageUrl;
    seoUrl = selectedFolderId ? `/gallery?folder=${selectedFolderId}&item=${selectedItem.id}` : `/gallery?item=${selectedItem.id}`;
  } else if (selectedFolderId && activeFolder) {
    seoTitle = `${activeFolder.name} Photos & Videos | Vishal Jogdeo`;
    seoDescription = activeFolder.description || `Browse the complete collection of high-definition photos and video highlights of Vishal Jogdeo in ${activeFolder.name} folder.`;
    seoKeywords = `Vishal Jogdeo ${activeFolder.name}, ${activeFolder.name} photos, ${activeFolder.name} gallery, ${activeFolder.name} videos, Vishal Jogdev`;
    seoImage = activeFolder.coverImage || SINGER_PROFILE.portraitImage;
    seoUrl = `/gallery?folder=${selectedFolderId}`;
  }

  // Format view numbers nicely (e.g. 1.2K, 15, 1.5M)
  const formatViews = (count: number) => {
    if (!count || count < 0) return '0';
    if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return count.toLocaleString();
  };

  return (
    <>
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
        keywords={seoKeywords} 
        image={seoImage} 
        url={seoUrl} 
      />
      <section id="gallery" className="py-6 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header */}
        {!selectedFolderId ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span>Folder Media Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Photos & Video <span className="font-serif italic text-gold-gradient font-normal">Folders Archive</span>
            </h1>
          </motion.div>
        ) : (
          <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-4">
            <button 
              onClick={() => setSelectedFolderId(null)}
              className="flex items-center gap-2 text-stone-300 hover:text-amber-300 font-bold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back to Folders</span>
            </button>
            <h2 className="text-lg font-bold font-heading text-white">
               {activeFolder?.name}
            </h2>
          </div>
        )}

        {/* Folders Grid (When no specific folder is selected) */}
        {!selectedFolderId && (
          loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : activeFolders.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 transform-gpu">
              {activeFolders.map((folder, idx) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2) }}
                onClick={() => setSelectedFolderId(folder.id)}
                className="group cursor-pointer flex flex-col items-center gap-2 transform-gpu will-change-transform"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '180px 220px' }}
              >
                <div className="w-full aspect-square overflow-hidden bg-[#121218] rounded-2xl border border-stone-800 hover:border-amber-500/50 relative shadow-lg hover:shadow-amber-500/10 transition-all">
                  <ProgressiveImage
                    src={folder.coverImage}
                    alt={folder.name}
                    thumbnailWidth={350}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
                  
                  {/* Folder Icon & Count Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/50 border border-white/20 text-xs font-bold text-amber-300 px-2.5 py-0.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-md pointer-events-none">
                    <Folder className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                    <span>{folder.count}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold font-heading text-stone-200 text-center line-clamp-1 group-hover:text-amber-300 px-1">
                  {folder.name}
                </h3>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="p-10 text-center bg-[#121218] border border-stone-800 rounded-3xl space-y-3 max-w-md mx-auto shadow-xl">
              <Folder className="w-10 h-10 mx-auto text-amber-500/50" />
              <h3 className="text-base font-bold text-white">No Gallery Albums Yet</h3>
              <p className="text-xs text-stone-400">Photo folders and concert albums added from the Admin Panel will appear here.</p>
            </div>
          )
        )}

        {/* Media Items Grid (When inside a selected folder) */}
        {selectedFolderId && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 transform-gpu">
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.15) }}
                onClick={() => handleOpenItem(item, idx)}
                className="cursor-pointer relative aspect-square bg-[#121218] rounded-xl overflow-hidden border border-stone-800 hover:border-amber-500/50 group flex flex-col items-center justify-center transform-gpu will-change-transform"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '120px 120px' }}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-stone-950 flex flex-col items-center justify-center p-2 text-center relative group-hover:bg-stone-900 transition-colors">
                    {item.imageUrl ? (
                      <ProgressiveImage
                        src={item.imageUrl}
                        alt={item.title}
                        thumbnailWidth={300}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                      />
                    ) : null}
                    {/* Clean Centered Play Icon & Video Title */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10 pointer-events-none">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5 fill-black" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-stone-200 line-clamp-2 mt-1.5 px-1 text-center group-hover:text-amber-300 drop-shadow-md">
                        {item.title}
                      </span>
                    </div>

                    {/* Simple Plain Realtime Views Count (No Background Box) */}
                    <div className="absolute bottom-1.5 left-2 text-[11px] font-bold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] z-20 select-none pointer-events-none tracking-tight">
                      <span className="leading-none">{formatViewsCount(item.views)}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <ProgressiveImage
                      src={item.imageUrl}
                      alt={item.title}
                      thumbnailWidth={300}
                      className="w-full h-full group-hover:opacity-90 transition-opacity"
                    />

                    {/* Simple Plain Realtime Views Count (No Background Box) */}
                    <div className="absolute bottom-1.5 left-2 text-[11px] font-bold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] z-10 select-none pointer-events-none tracking-tight">
                      <span className="leading-none">{formatViewsCount(item.views)}</span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Pure Fullscreen Lightbox Modal (Portal to body so no container limits exist) */}
      {selectedItem && currentItem && createPortal(
        <div 
          className="fixed inset-0 z-[99999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden select-none touch-none"
          onContextMenu={(e) => e.preventDefault()}
          onClick={() => {
            if (menuOpen) setMenuOpen(false);
          }}
        >
          {/* Top Left Title & Media Index Indicator (Auto-Scrolling Marquee for Long Video Titles) */}
          <div className="absolute top-4 left-4 z-[100000] flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 text-white shadow-2xl max-w-[55vw] sm:max-w-md pointer-events-auto select-none overflow-hidden">
            <span className="text-amber-400 font-bold text-xs shrink-0">{activeIndex + 1} / {displayItems.length}</span>
            {currentItem.type === 'video' ? (
              <div className="overflow-hidden whitespace-nowrap mask-fade-edges relative flex-1">
                <span className="text-stone-200 text-xs inline-block animate-title-scroll">
                  {currentItem.title}
                </span>
              </div>
            ) : (
              <span className="text-stone-200 text-xs truncate">{currentItem.title}</span>
            )}
          </div>

          {/* Top Right Controls (3-Dots Menu & Close) */}
          <div className="absolute top-4 right-4 z-[100000] flex items-center gap-2">
            {/* 3-Dot Options Menu for Photos and Videos */}
            <div className="relative pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-3 rounded-full bg-black/60 hover:bg-stone-800 text-white/90 hover:text-white transition-all border border-white/10 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center"
                title="More options"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* 3-Dot Dropdown Menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 top-14 w-48 py-1.5 rounded-2xl bg-stone-900/95 border border-stone-700/80 shadow-2xl backdrop-blur-xl z-[100001] flex flex-col text-left overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Views Count Display */}
                  <div className={`flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-stone-300 select-none ${currentItem.type === 'photo' ? 'border-b border-stone-800/90' : ''}`}>
                    <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Views <strong className="text-amber-300 font-bold ml-1">{formatViewsCount(currentItem.views)}</strong></span>
                  </div>

                  {/* Download Action (Photos only) */}
                  {currentItem.type === 'photo' && (
                    <button
                      onClick={() => {
                        const downloadUrl = currentItem.imageUrl || currentItem.videoUrl;
                        handleDownloadMedia(downloadUrl, currentItem.title, currentItem.type);
                      }}
                      disabled={isDownloading}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-stone-200 hover:text-white hover:bg-white/10 transition-colors w-full disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 text-amber-400" />
                      )}
                      <span>{isDownloading ? 'Downloading...' : 'Download Image'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-black/60 hover:bg-stone-800 text-white/90 hover:text-white transition-all border border-white/10 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto"
              aria-label="Close"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Chevron Navigation Arrows on both sides (Hidden when video player is active) */}
          {displayItems.length > 1 && currentItem.type !== 'video' && (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={() => paginate(-1)}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-[100003] p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-stone-800 text-white hover:text-amber-400 transition-all border border-white/15 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto"
                aria-label="Previous Media"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => paginate(1)}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[100003] p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-stone-800 text-white hover:text-amber-400 transition-all border border-white/15 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto"
                aria-label="Next Media"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
            </>
          )}

          {/* Full Screen Media Display with Fast Hardware-Accelerated Gestures */}
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.15 }
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              >
                {currentItem.type === 'video' ? (
                  <div 
                    className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative z-10 pointer-events-auto p-2 sm:p-4"
                    onClick={(e) => e.stopPropagation()}
                    onPointerDownCapture={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <HLSVideoPlayer 
                      src={currentItem.videoUrl || currentItem.imageUrl} 
                      title={currentItem.title} 
                      poster={!currentItem.imageUrl.includes('unsplash') ? currentItem.imageUrl : undefined}
                      autoPlay={true}
                    />
                  </div>
                ) : (
                  <HDLightboxImage
                    imageUrl={currentItem.imageUrl}
                    title={currentItem.title}
                    onSwipeNext={() => paginate(1)}
                    onSwipePrev={() => paginate(-1)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>,
        document.body
      )}
    </section>
    </>
  );
};


