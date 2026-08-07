import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideItem {
  id: number;
  image: string;
  altText: string;
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
  onOpenBooking?: () => void;
  onPlayFeaturedSong?: () => void;
}

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

export const HeroSlider: React.FC<HeroSliderProps> = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Preload all banner images immediately on mount for zero lag / zero flicker
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const activeIndex = ((page % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  // Smooth auto-play every 3 seconds, pauses when user clicks/touches and holds to read
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [page, isPaused]);

  const currentSlide = HERO_SLIDES[activeIndex];

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
              alt={currentSlide.altText}
              className="w-full h-full object-contain sm:object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left Navigation Button */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 sm:left-4 z-30 p-2 sm:p-3 text-white/90 hover:text-amber-300 bg-black/50 hover:bg-black/80 rounded-full transition-all hover:scale-110 drop-shadow-md border border-white/20"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 sm:right-4 z-30 p-2 sm:p-3 text-white/90 hover:text-amber-300 bg-black/50 hover:bg-black/80 rounded-full transition-all hover:scale-110 drop-shadow-md border border-white/20"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
};




