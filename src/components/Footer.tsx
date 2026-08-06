import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

interface FooterProps {
  onOpenPrivacyModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080b] text-stone-400 border-t border-stone-800/80 pt-10 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-stone-900 border border-amber-500/30 shrink-0">
              <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-white">Vishal Jogdeo</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">Official Devotional Portal</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={SINGER_PROFILE.contact.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={SINGER_PROFILE.contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SINGER_PROFILE.contact.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all flex items-center gap-2 text-xs font-semibold ml-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
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
