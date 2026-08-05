import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Youtube, Instagram, Facebook, Heart, ArrowUp } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

interface FooterProps {
  onOpenPrivacyModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-sm bg-stone-100 border border-stone-700">
                <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-stone-50">Vishal Jogdeo</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Official Website</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
              {SINGER_PROFILE.shortTagline}. Dedicated to spreading peace, spiritual love, and cultural heritage through classical devotional singing.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SINGER_PROFILE.contact.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SINGER_PROFILE.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold font-heading text-stone-200 uppercase tracking-widest">Quick Navigation Pages</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-stone-100 transition-colors">Home Page & Demos</Link></li>
              <li><Link to="/about" className="hover:text-stone-100 transition-colors">Biography & Devotional Journey</Link></li>
              <li><Link to="/songs" className="hover:text-stone-100 transition-colors">Featured Devotional Songs</Link></li>
              <li><Link to="/lyrics" className="hover:text-stone-100 transition-colors">Song Lyrics Archive</Link></li>
              <li><Link to="/gallery" className="hover:text-stone-100 transition-colors">Photo & Video Gallery</Link></li>
              <li><Link to="/shows" className="hover:text-stone-100 transition-colors">Upcoming Shows Schedule</Link></li>
              <li><Link to="/contact" className="hover:text-stone-100 transition-colors">Event Booking & Contact</Link></li>
            </ul>
          </div>

          {/* Discography Highlights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold font-heading text-stone-200 uppercase tracking-widest">Popular Repertoire</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-amber-200 font-medium">Majhe Vithu Mauli</span> (Abhanga)</li>
              <li><span className="text-amber-200 font-medium">Shree Ram Chandra Kripalu</span> (Stotra)</li>
              <li><span className="text-amber-200 font-medium">Sukhkarta Dukhharta</span> (Aarti)</li>
              <li><span className="text-amber-200 font-medium">Om Namah Shivaya</span> (Kirtan)</li>
              <li><span className="text-amber-200 font-medium">Hanuman Chalisa</span> (Raga Based)</li>
            </ul>
          </div>

          {/* Scroll to Top Column */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-all flex items-center gap-2 text-xs font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
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

          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Devotional Music Lovers</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
