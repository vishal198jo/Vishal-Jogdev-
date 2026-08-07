import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ArrowLeft, Folder, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_FOLDERS, GALLERY_ITEMS } from '../data/mockData';

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

export const GallerySection: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Active folder object
  const activeFolder = GALLERY_FOLDERS.find(f => f.id === selectedFolderId);

  // Filter items based on selected folder or all items if no folder selected
  const displayItems = GALLERY_ITEMS.filter(item => {
    return selectedFolderId ? item.folderId === selectedFolderId : true;
  });

  const activeIndex = selectedItem
    ? ((page % displayItems.length) + displayItems.length) % displayItems.length
    : -1;

  const currentItem = selectedItem && activeIndex >= 0 ? displayItems[activeIndex] : null;

  const paginate = (newDirection: number) => {
    if (displayItems.length <= 1) return;
    setZoomScale(1); // Reset zoom on photo change
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const handleOpenItem = (item: GalleryItem, index: number) => {
    setZoomScale(1);
    setPage([index, 0]);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setZoomScale(1);
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

  return (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {GALLERY_FOLDERS.map((folder, idx) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedFolderId(folder.id)}
                className="group cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square overflow-hidden bg-[#121218] rounded-2xl border border-stone-800 hover:border-amber-500/50 relative shadow-lg hover:shadow-amber-500/10 transition-all">
                  <img
                    src={folder.coverImage}
                    alt={folder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white">
                    <Folder className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">{folder.count}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold font-heading text-stone-200 text-center line-clamp-1 group-hover:text-amber-300 px-1">
                  {folder.name}
                </h3>
              </motion.div>
            ))}
          </div>
        )}

        {/* Media Items Grid (When inside a selected folder) */}
        {selectedFolderId && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onClick={() => handleOpenItem(item, idx)}
                className="cursor-pointer relative aspect-square bg-[#121218] rounded-xl overflow-hidden border border-stone-800 hover:border-amber-500/50 group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  referrerPolicy="no-referrer"
                />
                
                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-black ml-0.5 fill-black" />
                    </div>
                  </div>
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
        >
          {/* Subtle Close Button (Top Right - No Navigation or Titles) */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-[100000] p-3 rounded-full bg-black/60 hover:bg-stone-800 text-white/90 hover:text-white transition-all border border-white/10 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Floating Zoom Controls (Bottom Right - Subtle) */}
          {currentItem.type === 'photo' && (
            <div className="absolute bottom-6 right-6 z-[100000] flex items-center gap-2 bg-black/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <button
                onClick={zoomIn}
                className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              {zoomScale > 1 && (
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-2 hover:bg-white/20 rounded-full text-amber-400 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Left Arrow Button for Desktop / Click Navigation */}
          {displayItems.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="absolute left-2 sm:left-6 z-[100000] p-3 sm:p-4 bg-black/40 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-all border border-white/10 backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Right Arrow Button for Desktop / Click Navigation */}
          {displayItems.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="absolute right-2 sm:right-6 z-[100000] p-3 sm:p-4 bg-black/40 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-all border border-white/10 backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Full Screen Media Display with Touch Swipe & Zoom */}
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {currentItem.type === 'video' ? (
              <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative border border-stone-800">
                <iframe
                  src={`https://www.youtube.com/embed/${currentItem.youtubeId || 'dQw4w9WgXcQ'}`}
                  title={currentItem.title}
                  className="w-full h-full border-0 pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                    opacity: { duration: 0.2 }
                  }}
                  drag={zoomScale === 1 ? 'x' : true}
                  dragConstraints={zoomScale === 1 ? { left: 0, right: 0 } : false}
                  dragElastic={zoomScale === 1 ? 0.3 : 0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (zoomScale === 1) {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }
                  }}
                  onDoubleClick={toggleZoom}
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing transform-gpu"
                >
                  <motion.img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    animate={{ scale: zoomScale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-full h-full object-contain pointer-events-none select-none max-w-full max-h-full"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};


