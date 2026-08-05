import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Music2, 
  Disc, 
  CheckCircle2, 
  Youtube, 
  Instagram, 
  Facebook, 
  Folder, 
  Calendar, 
  PhoneCall, 
  Award,
  ArrowRight
} from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

// Use generated image
import heroImage from '../assets/images/vishal_jogdev_hero_1785893999710.jpg';

interface HeroSectionProps {
  onPlayFeaturedSong: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlayFeaturedSong, onOpenBooking }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageSummaries = [
    {
      id: 'about',
      title: 'About & Journey',
      shortDesc: '15+ years of Hindustani classical training and devotional playback singing.',
      icon: <Award className="w-4 h-4 text-amber-800" />,
      tag: 'Biography'
    },
    {
      id: 'songs',
      title: 'Audio Songs',
      shortDesc: 'Listen to 120+ soul-touching Abhangas, Bhajans, Aartis, and Kirtans.',
      icon: <Music2 className="w-4 h-4 text-amber-800" />,
      tag: '120+ Tracks'
    },
    {
      id: 'lyrics',
      title: 'Lyrics Page',
      shortDesc: 'Read verified Marathi Devanagari and English transliterated lyrics.',
      icon: <BookOpen className="w-4 h-4 text-amber-800" />,
      tag: 'Verified Texts'
    },
    {
      id: 'gallery',
      title: 'Folder Gallery',
      shortDesc: 'Browse photos by folder: Lifestyle, Concerts, Temple Seva & Studio.',
      icon: <Folder className="w-4 h-4 text-amber-800" />,
      tag: '4 Folders'
    },
    {
      id: 'shows',
      title: 'Upcoming Shows',
      shortDesc: 'Check schedule for upcoming live concerts in Mumbai, Pune & overseas.',
      icon: <Calendar className="w-4 h-4 text-amber-800" />,
      tag: 'Live Events'
    },
    {
      id: 'contact',
      title: 'Bookings & Contact',
      shortDesc: 'Direct event booking inquiries, office address & management details.',
      icon: <PhoneCall className="w-4 h-4 text-amber-800" />,
      tag: 'Event Inquiries'
    }
  ];

  return (
    <section id="home" className="relative min-h-[90vh] pt-28 pb-16 flex flex-col items-center overflow-hidden bg-[#FDFCFB] text-stone-900 border-b border-stone-200">
      {/* Soft warm ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-stone-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-16">
        
        {/* Main Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: PNG Profile Photo + SVG Social Media Icons underneath */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            {/* PNG Profile Photo */}
            <div className="relative w-full max-w-sm aspect-[4/5] flex items-center justify-center group">
              {/* Smooth Animated Background Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 25, ease: "linear", repeat: Infinity },
                    scale: { duration: 6, ease: "easeInOut", repeat: Infinity }
                  }}
                  className="absolute w-[90%] h-[90%] bg-gradient-to-br from-amber-100/80 via-stone-200/50 to-orange-100/60 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl opacity-70"
                />
                <motion.div 
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 35, ease: "linear", repeat: Infinity },
                    scale: { duration: 8, ease: "easeInOut", repeat: Infinity }
                  }}
                  className="absolute w-[85%] h-[85%] bg-gradient-to-tl from-stone-100/60 via-amber-200/40 to-stone-200/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl opacity-70"
                />
              </div>

              <img
                src={SINGER_PROFILE.portraitImage}
                alt="Vishal Jogdeo - Devotional Playback Singer"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Verified Artist Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 flex items-center gap-1.5 text-xs font-semibold text-stone-800 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Verified Artist</span>
              </div>
            </div>

            {/* Social Media Links - Pure SVG Platform Icons Underneath Picture */}
            <div className="w-full max-w-sm flex flex-col items-center justify-center">
              <div className="w-full h-px bg-stone-200/80 mb-3"></div>
              <div className="flex items-center justify-center gap-3.5 pb-2">
              {/* YouTube SVG */}
              <a
                href={SINGER_PROFILE.contact.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 border border-red-200/80 flex items-center justify-center transition-all hover:scale-110 shadow-xs group"
                title="YouTube Channel"
              >
                <svg className="w-5 h-5 fill-current text-red-600 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href={SINGER_PROFILE.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200/80 flex items-center justify-center transition-all hover:scale-110 shadow-xs group"
                title="Instagram Profile"
              >
                <svg className="w-5 h-5 text-pink-600 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href={SINGER_PROFILE.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200/80 flex items-center justify-center transition-all hover:scale-110 shadow-xs group"
                title="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current text-blue-600 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp SVG */}
              <a
                href={SINGER_PROFILE.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center transition-all hover:scale-110 shadow-xs group"
                title="WhatsApp Direct Inquiry"
              >
                <svg className="w-5 h-5 fill-current text-emerald-600 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338-11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Name, Tagline, About description, CTAs & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-[0.2em]">
              <Award className="w-3.5 h-3.5 text-amber-800" />
              <span>Official Devotional Portal</span>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight text-stone-900">
                Vishal <span className="font-serif italic font-normal text-amber-900">Jogdeo</span>
              </h1>
              <p className="text-base sm:text-lg font-semibold text-stone-700 font-sans tracking-wide">
                {SINGER_PROFILE.shortTagline}
              </p>
            </div>

            {/* About Bio snippet on the right under the name */}
            <div className="space-y-2 py-4 border-y border-stone-200">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-amber-800" />
                <span>About Vishal Jogdeo</span>
              </h3>
              <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
                {SINGER_PROFILE.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => handleScrollTo('songs')}
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
              >
                <Music2 className="w-4 h-4 text-amber-200" />
                <span>Listen Songs</span>
              </button>

              <button
                onClick={() => handleScrollTo('lyrics')}
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-stone-600" />
                <span>Lyrics Page</span>
              </button>

              <button
                onClick={onPlayFeaturedSong}
                className="px-4 py-3 rounded-full bg-stone-100 hover:bg-stone-200/70 border border-stone-200 text-stone-700 text-xs font-medium transition-all flex items-center gap-2"
                title="Play Featured Bhajan"
              >
                <Play className="w-3.5 h-3.5 fill-stone-800 text-stone-800" />
                <span>Quick Audio Sample</span>
              </button>
            </div>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">120+</p>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.15em]">Tracks</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">450+</p>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.15em]">Live Shows</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">15+</p>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.15em]">Years Exp.</p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Short Page Summaries Grid for Homepage Discovery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pt-10 border-t border-stone-200 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Website Map & Highlights</span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-stone-900">
                Explore All Sections of <span className="font-serif italic font-normal text-amber-900">Vishal Jogdeo's Portal</span>
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">6 Main Sections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageSummaries.map((page) => (
              <div
                key={page.id}
                onClick={() => handleScrollTo(page.id)}
                className="p-4 border border-stone-200 hover:border-amber-800 transition-colors cursor-pointer group flex items-start gap-3 bg-white"
              >
                <div className="p-2 bg-amber-50 border border-amber-200 shrink-0 group-hover:bg-amber-100 transition-colors">
                  {page.icon}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-heading group-hover:text-amber-900 transition-colors">
                      {page.title}
                    </h3>
                    <span className="text-[9px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 uppercase tracking-wider">
                      {page.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans line-clamp-2 leading-relaxed">
                    {page.shortDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};


