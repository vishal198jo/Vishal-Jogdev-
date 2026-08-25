import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, ArrowUp, ExternalLink } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { SpotifyIcon } from './SpotifyIcon';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenPrivacyModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#14141f] via-[#0e0e16] to-[#08080d] text-stone-300 border-t border-amber-500/20 pt-14 pb-8 relative shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Column 1: Brand Info & Socials (Left Column) */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-stone-900 border border-amber-500/40 shrink-0 ring-2 ring-amber-500/10">
                <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white">Vishal Jogdeo</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">Official Devotional Portal</span>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm font-sans">
              विदर्भातील सुप्रसिद्ध भक्तीगीत गायक व महानुभाव पंथ भजनसम्राट विशाल जोगदेव यांच्या अभंग, भजने व संगीत मैफिलींचे अधिकृत संकेतस्थळ.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={SINGER_PROFILE.contact.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#181824] text-stone-300 hover:text-red-400 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#181824] text-stone-300 hover:text-pink-400 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#181824] text-stone-300 hover:text-blue-400 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917038086864"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#181824] text-stone-300 hover:text-emerald-400 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#181824] text-stone-300 hover:text-emerald-400 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 transition-colors shadow-sm"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Middle Column) */}
          <div className="space-y-4 md:pl-8 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-amber-500 pl-2">
              Section Navigation
            </h4>
            <div className="flex flex-col gap-y-2.5">
              <Link to="/" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                Contact
              </Link>
              <Link to="/songs" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                Songs
              </Link>
              <Link to="/lyrics" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                Lyrics
              </Link>
              <Link to="/gallery" className="text-xs text-stone-300 hover:text-amber-400 transition-colors">
                Gallery
              </Link>
            </div>
          </div>

          {/* Column 3: Developer Link & Scroll Top (Right Column) */}
          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-between text-left">
            <div className="space-y-2 w-full">
              <a
                href="https://ykstudio.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors inline-block"
              >
                Developer's
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-2.5 px-4 rounded-full bg-[#181824] hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-700/70 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs font-semibold self-start md:self-auto shadow-md hover:scale-105 active:scale-95"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Vishal Jogdeo. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-amber-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
