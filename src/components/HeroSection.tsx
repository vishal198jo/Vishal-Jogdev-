import React from 'react';
import { Link } from 'react-router-dom';
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
import { CountUpNumber } from './CountUpNumber';
import { HeroSlider } from './HeroSlider';
import { ServicesBookingSection } from './ServicesBookingSection';
import { SpotifyIcon } from './SpotifyIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { VishalGalleryPreview } from './VishalGalleryPreview';

interface HeroSectionProps {
  slides?: Array<{
    id: string | number;
    image: string;
    altText?: string;
    linkUrl?: string;
    buttonText?: string;
    buttonIcon?: string;
  }>;
  onPlayFeaturedSong: () => void;
  onOpenBooking: () => void;
  loading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ slides, onPlayFeaturedSong, onOpenBooking, loading = false }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageSummaries = [
    {
      id: 'songs',
      path: '/songs',
      title: 'भक्ती गीत MP3 Songs',
      shortDesc: '१५०० हून अधिक सुप्रसिद्ध अभंग, भावगीते, आरत्या आणि भजनांचा संग्रह.',
      icon: <Music2 className="w-4 h-4 text-amber-400" />,
      tag: '१५००+ गाणी'
    },
    {
      id: 'lyrics',
      path: '/lyrics',
      title: 'भक्तीगीत शब्दरचना (Lyrics)',
      shortDesc: 'अजरामर भक्तीगीते व भजनांच्या संपूर्ण देवनागरी शब्दरचना ऑडिओसह.',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
      tag: 'शब्दरचना'
    },
    {
      id: 'shows',
      path: '/shows',
      title: 'Upcoming Live Shows',
      shortDesc: 'आगामी भक्ती संगीत महोत्सव, अभंग संध्या व लाईव्ह कॉन्सर्टचे वेळापत्रक.',
      icon: <Calendar className="w-4 h-4 text-amber-400" />,
      tag: 'लाइव्ह कॉन्सर्ट'
    },
    {
      id: 'about',
      path: '/about',
      title: 'Vishal Jogdeo Biography',
      shortDesc: '१५+ वर्षांहून अधिक काळाचा शास्त्रीय संगीत व भक्तीगीत गायकीचा प्रवास.',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      tag: 'परिचय'
    },
    {
      id: 'gallery',
      path: '/gallery',
      title: 'फोटो व कॉन्सर्ट गॅलरी',
      shortDesc: 'थेट संगीत सोहळे, व्हीआयपी सन्मान, स्टुडिओ रेकॉर्डिंग व क्षणचित्रे.',
      icon: <Folder className="w-4 h-4 text-amber-400" />,
      tag: 'गॅलरी'
    },
    {
      id: 'contact',
      path: '/contact',
      title: 'अधिकृत संपर्क व बुकिंग',
      shortDesc: 'धार्मिक कार्यक्रम, अभंग संध्या व भक्ती संगीत सोहळ्यांच्या बुकिंगसाठी संपर्क.',
      icon: <PhoneCall className="w-4 h-4 text-amber-400" />,
      tag: 'बुकिंग'
    }
  ];

  return (
    <section id="home" className="relative min-h-[85vh] pt-3 sm:pt-4 pb-12 flex flex-col items-center overflow-hidden bg-[#0b0b0e] text-stone-100 border-b border-amber-500/20">
      {/* Background Gold Lights & Vignette */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
        
        {/* TOP FEATURE: Shreya Ghoshal Style 3-Thumbnail Photo Slider Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSlider slides={slides} onOpenBooking={onOpenBooking} onPlayFeaturedSong={onPlayFeaturedSong} loading={loading} />
        </motion.div>

        {/* Main Hero Profile Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#121218]/80 p-6 sm:p-8 rounded-3xl border border-amber-500/20 backdrop-blur-md">
          
          {/* Left Column: Profile Photo + Social Icons */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            {/* Profile Photo Container */}
            <div className="relative w-full max-w-sm aspect-[4/5] flex items-center justify-center group">
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
                  className="absolute w-[92%] h-[92%] bg-gradient-to-br from-amber-500/20 via-yellow-600/20 to-orange-500/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl"
                />
              </div>

              <img
                src={SINGER_PROFILE.portraitImage}
                alt="Vishal Jogdeo - Devotional Playback Singer"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Social Media Links */}
            <div className="w-full max-w-sm flex flex-col items-center justify-center">
              <div className="w-full h-px bg-amber-500/20 mb-3"></div>
              <div className="flex items-center justify-center gap-3 pb-1">
                <a
                  href={SINGER_PROFILE.contact.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-red-950/80 border border-stone-800 hover:border-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                  title="YouTube Channel"
                >
                  <svg className="w-5 h-5 fill-current text-red-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a
                  href={SINGER_PROFILE.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-pink-950/80 border border-stone-800 hover:border-pink-500 flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                  title="Instagram Profile"
                >
                  <svg className="w-5 h-5 text-pink-500 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>

                <a
                  href={SINGER_PROFILE.contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-blue-950/80 border border-stone-800 hover:border-blue-500 flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                  title="Facebook Page"
                >
                  <svg className="w-5 h-5 fill-current text-blue-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://wa.me/917038086864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-emerald-950/80 border border-stone-800 hover:border-emerald-500 flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                  title="WhatsApp Direct Contact"
                >
                  <WhatsAppIcon className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
                </a>

                <a
                  href={SINGER_PROFILE.contact.socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-emerald-950/80 border border-stone-800 hover:border-emerald-500 flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                  title="Spotify Profile"
                >
                  <SpotifyIcon className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Name, Tagline, Bio snippet & Metrics */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-[0.2em]">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Devotional Portal</span>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white whitespace-nowrap">
                Vishal Jogdeo
              </h1>
              <p className="text-base sm:text-lg font-semibold text-amber-200/90 font-sans tracking-wide">
                {SINGER_PROFILE.shortTagline}
              </p>
            </div>

            {/* About Bio snippet */}
            <div className="space-y-3 py-4 border-y border-amber-500/20">
              <h3 className="text-xs font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5 text-amber-300">
                <Music2 className="w-3.5 h-3.5 text-amber-400" />
                <span>About Vishal Jogdeo</span>
              </h3>
              <p className="text-sm sm:text-base font-sans leading-relaxed text-stone-300">
                {SINGER_PROFILE.shortBio}
              </p>
              <div className="pt-1 flex justify-center lg:justify-start">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-black text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Learn Full Biography</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left p-3 rounded-2xl bg-stone-900/80 border border-amber-500/20">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">
                  <CountUpNumber end={1500} suffix="+" />
                </p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.15em]">भक्तीगीते (Songs)</p>
              </div>
              <div className="text-center lg:text-left p-3 rounded-2xl bg-stone-900/80 border border-amber-500/20">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">
                  <CountUpNumber end={500} suffix="+" />
                </p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.15em]">महानुभाव भजने</p>
              </div>
              <div className="text-center lg:text-left p-3 rounded-2xl bg-stone-900/80 border border-amber-500/20">
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">
                  <CountUpNumber end={24} suffix="+" />
                </p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.15em]">वर्षे कारकीर्द (Exp)</p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* SERVICES & SHOW BOOKING SECTION (3 DEV CONTAINERS) */}
        <ServicesBookingSection />

        {/* VISHAL'S GALLERY SECTION (LATEST PHOTOS FROM ALL FOLDERS) */}
        <VishalGalleryPreview />

        {/* Short Page Summaries Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pt-8 border-t border-amber-500/20 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">वेबसाईट प्रमुख दालने</span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Explore Portal Sections
              </h2>
            </div>
            <span className="text-xs text-amber-200/70 font-medium">६ मुख्य विभाग</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageSummaries.map((page) => (
              <Link
                key={page.id}
                to={page.path}
                className="p-4 rounded-2xl border border-stone-800 hover:border-amber-400/80 transition-all duration-300 group flex flex-col justify-between bg-[#121218]/90 hover:bg-[#181824] shadow-lg hover:shadow-amber-500/10 space-y-3 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-950/60 border border-amber-500/30 rounded-xl shrink-0 group-hover:bg-amber-900/80 transition-colors">
                    {page.icon}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-bold text-stone-100 font-heading group-hover:text-amber-300 transition-colors truncate">
                        {page.title}
                      </h3>
                      <span className="text-[9px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                        {page.tag}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-sans line-clamp-2 leading-relaxed">
                      {page.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-500/10 text-[11px] font-semibold text-amber-400/90 group-hover:text-amber-300 transition-colors">
                  <span>विभाग पहा (Explore)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};



