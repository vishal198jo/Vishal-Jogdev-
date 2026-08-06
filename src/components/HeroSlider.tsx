import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import heroImg1 from '../assets/images/vishal_jogdev_hero_1785893999710.jpg';
import heroImg2 from '../assets/images/devotional_stage_concert_1785894013298.jpg';
import heroImg3 from '../assets/images/vishal_concert_slide3_1786025115221.jpg';

export interface SlideItem {
  id: number;
  title: string;
  image: string;
}

export const HERO_SLIDES: SlideItem[] = [
  {
    id: 1,
    title: "Vishal Jogdeo Live Concert",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsxRke2ViwYLU9CrGBQA6JdUud4Lo36yg6g6uoMqo-og&s=10",
  },
  {
    id: 2,
    title: "Devotional Performance - Vishal Jogdeo",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRty3hAYC4U2OFt6JWf0STNOB9zWEBqxtEF2epU3opVBwEznIzheJQZCggU&s=10",
  },
  {
    id: 3,
    title: "Grand Devotional Concerts - Vishal Jogdeo",
    image: heroImg2,
  },
  {
    id: 4,
    title: "Vishal Jogdeo Live - Playback Singer",
    image: heroImg1,
  },
  {
    id: 5,
    title: "Bhakti Sangeet & Classical Vocal Seva",
    image: heroImg3,
  }
];

interface HeroSliderProps {
  onOpenBooking?: () => void;
  onPlayFeaturedSong?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <div 
      className="w-full relative overflow-hidden rounded-2xl border border-stone-800 bg-black shadow-2xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 16:9 YouTube Thumbnail Aspect Ratio Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden flex items-center bg-black">
        
        {/* Simple Slide Image without Fade In/Out Animation */}
        <img
          key={currentSlide.id}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* 2 Left / Right Simple Icon Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-500/40 transition-colors shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-500/40 transition-colors shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Bottom Simple Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-full border border-stone-800 shadow-md">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeSlide 
                  ? 'w-6 bg-amber-400' 
                  : 'w-2 bg-stone-600 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

