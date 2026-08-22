import React, { useState } from 'react';
import { getThumbnailUrl } from '../lib/imageOptimizer';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const thumbSrc = getThumbnailUrl(src, thumbnailWidth);

  return (
    <div className={`relative overflow-hidden bg-stone-900/60 ${className}`}>
      {/* Background Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800/60 to-stone-900 animate-pulse" />
      )}

      {/* Main Image with Fast Progressive Loading */}
      <img
        src={thumbSrc || src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-out select-none pointer-events-none transform-gpu ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
