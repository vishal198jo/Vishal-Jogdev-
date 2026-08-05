import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, X, ArrowLeft, Folder } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_FOLDERS, GALLERY_ITEMS } from '../data/mockData';

export const GallerySection: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Get active folder object if a folder is selected
  const activeFolder = GALLERY_FOLDERS.find(f => f.id === selectedFolderId);

  // Filter items based on selected folder
  const displayItems = GALLERY_ITEMS.filter(item => {
    return selectedFolderId ? item.folderId === selectedFolderId : false;
  });

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
            className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="w-full h-full p-4 md:p-8 flex items-center justify-center relative select-none"
            onClick={(e) => e.stopPropagation()} 
          >
            {selectedItem.type === 'video' ? (
              <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem.youtubeId || 'dQw4w9WgXcQ'}`}
                  title={selectedItem.title}
                  className="w-full h-full border-0 pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
