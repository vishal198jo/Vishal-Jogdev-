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
    { name: 'Songs', path: '/songs' },
    { name: 'Lyrics', path: '/lyrics' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Upcoming Shows', path: '/shows' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Yellow Navigation Container */}
      <div 
        style={{ backgroundColor: '#ffff00' }}
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'text-stone-900 backdrop-blur-md border-b border-stone-200/80 py-3' 
            : 'text-stone-900 backdrop-blur-sm border-b border-stone-200/50 py-3.5'
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
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 bg-stone-100 border border-stone-200">
                <img src={SINGER_PROFILE.portraitImage} alt="Vishal Jogdeo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors whitespace-nowrap">
                  Vishal Jogdeo
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold whitespace-nowrap">
                  Devotional Artist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-stone-900 text-stone-50 shadow-sm font-semibold' 
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Book CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Social Icons */}
              <div className="flex items-center gap-1.5 pr-2 border-r border-stone-200">
                <a 
                  href={SINGER_PROFILE.contact.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-500 hover:text-red-600 hover:bg-stone-100 transition-colors"
                  title="YouTube Channel"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-500 hover:text-pink-600 hover:bg-stone-100 transition-colors"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-stone-500 hover:text-blue-600 hover:bg-stone-100 transition-colors"
                  title="Facebook Page"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

              {/* Book Event CTA Button */}
              <button
                onClick={onOpenBooking}
                className="px-5 py-2 text-xs font-medium rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-300" />
                <span>Book Event</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDFCFB] border-b border-stone-200 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors border flex items-center gap-2 ${
                      isActive
                        ? 'bg-stone-900 text-stone-50 border-stone-900 font-semibold'
                        : 'text-stone-800 hover:text-stone-900 hover:bg-stone-100 border-stone-200/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-300' : 'bg-amber-800'}`} />
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
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-red-600"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-pink-600"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-blue-600"
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
