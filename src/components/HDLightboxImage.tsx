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
