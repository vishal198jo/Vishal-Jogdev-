import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, X, ArrowLeft, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_FOLDERS, GALLERY_ITEMS } from '../data/mockData';

export const GallerySection: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Get active folder object if a folder is selected
  const activeFolder = GALLERY_FOLDERS.find(f => f.id === selectedFolderId);

  // Filter items based on selected folder or all items if no folder selected
  const displayItems = GALLERY_ITEMS.filter(item => {
    return selectedFolderId ? item.folderId === selectedFolderId : true;
  });

  const currentIndex = selectedItem
    ? displayItems.findIndex(i => i.id === selectedItem.id)
    : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (displayItems.length === 0 || currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + displayItems.length) % displayItems.length;
    setSelectedItem(displayItems[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (displayItems.length === 0 || currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % displayItems.length;
    setSelectedItem(displayItems[nextIndex]);
  };

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, currentIndex, displayItems]);

  return (
    <section id="gallery" className="py-6 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header */}
        {!selectedFolderId ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-widest">
              <Folder className="w-3.5 h-3.5" />
              <span>Folder Media Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-stone-900">
              Photos & Video <span className="font-serif italic text-amber-900 font-normal">Folders Archive</span>
            </h1>
          </motion.div>
        ) : (
          <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4">
            <button 
              onClick={() => setSelectedFolderId(null)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Folders</span>
            </button>
            <h2 className="text-lg font-bold font-heading text-stone-900">
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
                <div className="w-full aspect-square overflow-hidden bg-stone-100 rounded-2xl border border-stone-200 relative shadow-sm hover:shadow-md transition-all">
                  <img
                    src={folder.coverImage}
                    alt={folder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/60" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white">
                    <Folder className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold">{folder.count}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold font-heading text-stone-800 text-center line-clamp-1 group-hover:text-amber-900 px-1">
                  {folder.name}
                </h3>
              </motion.div>
            ))}
          </div>
        )}

        {/* Media Items Grid (When inside a selected folder) */}
        {selectedFolderId && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 sm:gap-2">
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer relative aspect-square bg-stone-100 overflow-hidden group"
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 text-stone-900 ml-0.5" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Preview Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Bar with Title, Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 z-[110] flex items-center justify-between text-white pointer-events-auto">
            <div className="flex items-center gap-2 bg-stone-900/80 px-3.5 py-1.5 rounded-full border border-stone-700 text-xs font-semibold backdrop-blur-md">
              <span className="text-amber-400 font-bold">{activeFolder?.name || 'Media'}</span>
              <span className="text-stone-400">•</span>
              <span>{currentIndex + 1} / {displayItems.length}</span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
              className="p-2.5 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors shadow-lg backdrop-blur-md"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button (<) */}
          {displayItems.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-[110] p-3 sm:p-4 bg-stone-900/80 hover:bg-amber-600 rounded-full text-white transition-all shadow-2xl border border-stone-700/80 hover:scale-110 active:scale-95 group pointer-events-auto"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-stone-200 group-hover:text-white" />
            </button>
          )}

          {/* Next Button (>) */}
          {displayItems.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-[110] p-3 sm:p-4 bg-stone-900/80 hover:bg-amber-600 rounded-full text-white transition-all shadow-2xl border border-stone-700/80 hover:scale-110 active:scale-95 group pointer-events-auto"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-stone-200 group-hover:text-white" />
            </button>
          )}

          {/* Media Content Display */}
          <div 
            className="w-full h-full p-12 sm:p-16 md:p-20 flex items-center justify-center relative select-none"
            onClick={(e) => e.stopPropagation()} 
          >
            {selectedItem.type === 'video' ? (
              <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative border border-stone-800">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem.youtubeId || 'dQw4w9WgXcQ'}`}
                  title={selectedItem.title}
                  className="w-full h-full border-0 pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center max-w-full max-h-full">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[82vh] object-contain drop-shadow-2xl select-none pointer-events-none rounded-lg"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  referrerPolicy="no-referrer"
                />
                {selectedItem.title && (
                  <p className="mt-3 text-stone-300 text-xs sm:text-sm font-medium text-center bg-stone-900/70 px-4 py-1.5 rounded-full border border-stone-800 backdrop-blur-sm">
                    {selectedItem.title}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

