import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Calendar, Music2, ArrowRight, Globe } from 'lucide-react';
import { SliderSkeleton } from './SkeletonLoader';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface SlideItem {
  id: number | string;
  image: string;
  altText: string;
  linkUrl?: string;
  buttonText?: string;
  buttonIcon?: string;
}

export const HERO_SLIDES: SlideItem[] = [
  {
    id: 1,
    image: "https://i.ibb.co/tTqHDwC3/IMG-3759.png",
    altText: "Vishal Jogdeo Devotional Banner 1",
  },
  {
    id: 2,
    image: "https://i.ibb.co/r2hX0c9G/IMG-2042.png",
    altText: "Vishal Jogdeo Devotional Banner 2",
  },
  {
    id: 3,
    image: "https://i.ibb.co/q8dD001/IMG-3773.png",
    altText: "Vishal Jogdeo Devotional Banner 3",
  },
  {
    id: 4,
    image: "https://i.ibb.co/nN8b2pCt/IMG-3789.png",
    altText: "Vishal Jogdeo Devotional Banner 4",
  },
];

interface HeroSliderProps {
  slides?: Array<{
    id: string | number;
    image: string;
    altText?: string;
    linkUrl?: string;
    buttonText?: string;
    buttonIcon?: string;
  }>;
  onOpenBooking?: () => void;
  onPlayFeaturedSong?: () => void;
  loading?: boolean;
}

const RenderButtonIcon: React.FC<{ iconName?: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'youtube':
      return (
        <svg className="w-4 h-4 fill-red-600 shrink-0" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'spotify':
      return (
        <svg className="w-4 h-4 fill-[#1DB954] shrink-0" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.26c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.24zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.18-1.2.78-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z"/>
        </svg>
      );
    case 'whatsapp':
      return <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />;
    case 'calendar':
      return <Calendar className="w-4 h-4 text-stone-900 shrink-0" />;
    case 'music':
      return <Music2 className="w-4 h-4 text-stone-900 shrink-0" />;
    case 'arrow':
      return <ArrowRight className="w-4 h-4 text-stone-900 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" />;
    case 'external':
    default:
      return <ExternalLink className="w-4 h-4 text-stone-900 shrink-0" />;
  }
};

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

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, loading = false }) => {
  const activeSlides = (slides && slides.length > 0) ? slides : [];
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  // Preload all banner images immediately on mount for zero lag / zero flicker
  useEffect(() => {
    activeSlides.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, [activeSlides]);

  // Smooth auto-play every 3 seconds, pauses when user clicks/touches and holds to read
  useEffect(() => {
    if (isPaused || activeSlides.length === 0 || loading) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [page, isPaused, activeSlides, loading]);

  if (loading) {
    return <SliderSkeleton />;
  }

  if (activeSlides.length === 0) {
    return (
      <div className="w-full relative overflow-hidden rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 shadow-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] sm:min-h-[340px]">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          Official Artist Portal
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading mb-2">
          Vishal Jogdeo
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm max-w-lg font-sans">
          Devotional Classical Vocalist & Marathi Abhanga Singer.
        </p>
      </div>
    );
  }

  const activeIndex = ((page % activeSlides.length) + activeSlides.length) % activeSlides.length;

  const currentSlide = activeSlides[activeIndex] || activeSlides[0];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div 
      className="w-full relative overflow-hidden rounded-2xl border border-stone-800/80 bg-black shadow-2xl group active:cursor-grabbing select-none"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerLeave={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
    >
      {/* Container aspect ratio adapted for full view on mobile without cropping */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[200px] sm:min-h-[340px] md:min-h-[420px] overflow-hidden flex items-center justify-center bg-black">
        
        {/* Animated Slide Transition with Touch Swipe support & Hardware Acceleration */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none transform-gpu"
          >
            {/* Display complete uncropped banner on mobile (object-contain) and full bleed on desktop */}
            <img
              src={currentSlide.image}
              alt={currentSlide.altText || 'Vishal Jogdeo Banner'}
              className="w-full h-full object-contain sm:object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>

        {/* Professional Button Overlay on Slide Banner if Link/Button text exists */}
        {(currentSlide.linkUrl || currentSlide.buttonText) && (
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-20 pointer-events-auto">
            <a
              href={currentSlide.linkUrl || '#'}
              target={currentSlide.linkUrl?.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/50 backdrop-blur-md group/btn cursor-pointer"
            >
              <RenderButtonIcon iconName={currentSlide.buttonIcon} />
              <span>{currentSlide.buttonText || 'Visit Link'}</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};





