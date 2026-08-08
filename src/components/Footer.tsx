import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, ArrowUp, ExternalLink } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

interface FooterProps {
  onOpenPrivacyModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080b] text-stone-400 border-t border-stone-800/80 pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Column 1: Brand Info & Socials (Left Column) */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-stone-900 border border-amber-500/30 shrink-0">
                <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white">Vishal Jogdeo</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">Official Devotional Portal</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Discover divine melodies, traditional abhangas, and devotional compositions rendered by classical vocalist Vishal Jogdeo.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={SINGER_PROFILE.contact.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-red-400 hover:bg-stone-800 border border-stone-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-pink-400 hover:bg-stone-800 border border-stone-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-blue-400 hover:bg-stone-800 border border-stone-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Middle Column) */}
          <div className="space-y-4 md:pl-8 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-amber-500 pl-2">
              Section Navigation
            </h4>
            <div className="flex flex-col gap-y-2.5">
              <Link to="/" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                Contact
              </Link>
              <Link to="/songs" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                Songs
              </Link>
              <Link to="/lyrics" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                Lyrics
              </Link>
              <Link to="/gallery" className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                Gallery
              </Link>
            </div>
          </div>

          {/* Column 3: Developers Team Info & Scroll Top (Right Column) */}
          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-between text-left">
            <div className="space-y-3 w-full">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 md:border-l-0 md:border-r-2 border-amber-500 pl-2 md:pl-0 md:pr-2">
                Developers team
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed md:text-right">
                Design and developed by
              </p>
              <div className="pt-1 flex md:justify-end">
                <a
                  href="https://ykstudio.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/10 to-stone-900 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 hover:from-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs font-bold shadow-md shadow-amber-950/20"
                >
                  <span>YK Studio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-2 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all flex items-center gap-2 text-xs font-semibold self-start md:self-auto"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Vishal Jogdeo. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="hover:text-stone-300 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
