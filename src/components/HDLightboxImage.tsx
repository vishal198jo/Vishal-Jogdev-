import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import { getThumbnailUrl, getHdImageUrl } from '../lib/imageOptimizer';

interface HDLightboxImageProps {
  imageUrl: string;
  title: string;
  zoomScale: number;
  panConstraints: { left: number; right: number; top: number; bottom: number };
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  toggleZoom: () => void;
}

export const HDLightboxImage: React.FC<HDLightboxImageProps> = ({
  imageUrl,
  title,
  zoomScale,
  panConstraints,
  onImageLoad,
  toggleZoom,
}) => {
  const [hdLoaded, setHdLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const thumbUrl = getThumbnailUrl(imageUrl, 600);
  const hdUrl = getHdImageUrl(imageUrl);

  useEffect(() => {
    setHdLoaded(false);
    setLoadingError(false);

    // Preload high-definition original image
    const img = new Image();
    img.src = hdUrl || imageUrl;
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      setHdLoaded(true);
    };
    img.onerror = () => {
      setLoadingError(true);
      setHdLoaded(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, hdUrl]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* HD Status Indicator Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none">
        <AnimatePresence mode="wait">
          {!hdLoaded ? (
            <motion.div
              key="loading-hd"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-black/75 border border-amber-500/50 text-amber-300 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-2xl"
            >
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Loading HD Quality...</span>
            </motion.div>
          ) : (
            <motion.div
              key="hd-ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-emerald-950/85 border border-emerald-500/40 text-emerald-300 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>HD Crystal Clear</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instant Low Quality Preview / Placeholder Image (Instant Display) */}
      {!hdLoaded && (
        <img
          src={thumbUrl || imageUrl}
          alt={title}
          className="absolute inset-0 m-auto max-w-full max-h-full object-contain filter blur-sm scale-[0.99] opacity-85 pointer-events-none transition-opacity duration-300"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Master HD Sharp Image (displays crisp image once loaded) */}
      <motion.img
        src={hdLoaded && !loadingError ? hdUrl : (thumbUrl || imageUrl)}
        alt={title}
        onLoad={onImageLoad}
        animate={{
          scale: zoomScale,
          x: zoomScale === 1 ? 0 : undefined,
          y: zoomScale === 1 ? 0 : undefined,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        drag={zoomScale > 1}
        dragConstraints={panConstraints}
        dragElastic={0.15}
        className={`max-w-full max-h-full object-contain select-none drop-shadow-2xl rounded-sm pointer-events-auto transition-all duration-500 ${
          hdLoaded ? 'filter-none opacity-100' : 'opacity-90'
        } ${zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
        draggable={false}
        onDoubleClick={toggleZoom}
        onContextMenu={(e) => e.preventDefault()}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
