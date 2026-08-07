import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Music, 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Facebook, 
  Calendar
} from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Mahanubhav Pantha', path: '/mahanubhav-pantha' },
    { name: 'Songs', path: '/songs' },
    { name: 'Lyrics', path: '/lyrics' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Upcoming Shows', path: '/shows' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Luxury Dark Navigation Container */}
      <div 
        className={`transition-all duration-300 bg-[#0c0c11] border-b border-amber-500/30 text-white shadow-2xl gpu-layer ${
          isScrolled 
            ? 'py-2.5 shadow-amber-900/10' 
            : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand */}
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Vishal Jogdeo Homepage"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-amber-400/80 shadow-md group-hover:scale-105 transition-transform duration-300 bg-black">
                <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  Vishal <span className="font-serif italic text-amber-400 font-normal">Jogdeo</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-amber-200/80 font-bold whitespace-nowrap">
                  Devotional Vocalist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-stone-950/80 p-1.5 rounded-full border border-amber-500/20">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isMahanubhav = link.path === '/mahanubhav-pantha';
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-gold-gradient text-black shadow-md font-bold scale-[1.02]' 
                        : 'text-stone-300 hover:text-amber-300 hover:bg-white/5'
                    }`}
                  >
                    {isMahanubhav && (
                      <img 
                        src="https://i.ibb.co/kVHCQ0gz/Picsart-26-08-06-09-55-05-686.png" 
                        alt="Mahanubhav Logo" 
                        className="w-4 h-4 rounded-full object-contain bg-white border border-amber-400"
                      />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Book CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Social Icons */}
              <div className="flex items-center gap-1 pr-2 border-r border-amber-500/20">
                <a 
                  href={SINGER_PROFILE.contact.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-300 hover:text-red-400 hover:bg-white/10 transition-colors"
                  title="YouTube Channel"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-300 hover:text-pink-400 hover:bg-white/10 transition-colors"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-300 hover:text-blue-400 hover:bg-white/10 transition-colors"
                  title="Facebook Page"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

              {/* Book Event CTA Button */}
              <button
                onClick={onOpenBooking}
                className="px-5 py-2 text-xs font-bold rounded-full bg-gold-gradient text-black hover:opacity-95 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span>Book Event</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-gold-gradient text-black transition-colors flex items-center gap-1 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-amber-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e14] border-b border-amber-500/30 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-amber-500/20">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors border flex items-center gap-2 ${
                      isActive
                        ? 'bg-gold-gradient text-black border-amber-400 font-bold'
                        : 'text-stone-200 hover:text-white hover:bg-white/5 border-stone-800'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-amber-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <a 
                  href={SINGER_PROFILE.contact.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-red-400"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-pink-400"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-blue-400"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
