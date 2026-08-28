import React, { useState } from 'react';
import { getThumbnailUrl } from '../lib/imageOptimizer';
import { memoryImageCache } from '../lib/cacheManager';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  thumbnailWidth?: number;
  className?: string;
  aspectRatio?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  thumbnailWidth = 400,
  className = '',
  aspectRatio,
  ...props
}) => {
  const thumbSrc = getThumbnailUrl(src, thumbnailWidth);
  const activeSrc = thumbSrc || src;
  const alreadyCached = activeSrc ? memoryImageCache.has(activeSrc) : false;

  const [isLoaded, setIsLoaded] = useState(alreadyCached);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-900/60 ${className}`}>
      {/* Background Shimmer Placeholder (only shown if not in memory cache) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800/60 to-stone-900 animate-pulse" />
      )}

      {/* Main Image with Fast Progressive Loading & Instant Cache Rendering */}
      <img
        src={activeSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => {
          if (activeSrc) memoryImageCache.add(activeSrc);
          setIsLoaded(true);
        }}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover select-none pointer-events-none transform-gpu ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${alreadyCached ? 'transition-none' : 'transition-opacity duration-300 ease-out'}`}
        {...props}
      />
    </div>
  );
};

