import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeroSection } from '../components/HeroSection';
import { AnnouncementTicker } from '../components/AnnouncementTicker';
import { HomepageSEOArticle } from '../components/HomepageSEOArticle';
import { SEOFAQSection } from '../components/SEOFAQSection';
import { FEATURED_SONGS } from '../data/mockData';
import { SEO_FAQS } from '../data/seoFaqsData';
import { ARTICLES_DATA } from '../data/articlesData';
import { Song } from '../types';
import { SEO } from '../components/SEO';
import { Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useFirestoreData } from '../hooks/useFirestoreData';

interface HomePageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onPlaySong,
  onOpenBooking
}) => {
  const { heroSlides, notifications, shows, loading } = useFirestoreData();
  const navigate = useNavigate();

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://vishaljogdeo.com/#website",
      "url": "https://vishaljogdeo.com/",
      "name": "Vishal Jogdeo",
      "alternateName": ["Vishal Jogdeo Official", "विशाल जोगदेव", "Vishal Jogdeo Ke Bhajan", "Vishal Jogdeo Songs"],
      "description": "Official website of Vishal Jogdeo. Listen to popular Vishal Jogdeo Ke Bhajan and Vishal Jogdeo Songs, read complete lyrics, explore lifestyle, biography, and upcoming live shows.",
      "inLanguage": ["mr-IN", "en-IN", "hi-IN"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vishaljogdeo.com/songs?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://vishaljogdeo.com/#person",
      "name": "Vishal Jogdeo",
      "alternateName": ["विशाल जोगदेव", "भजनसम्राट विशाल जोगदेव", "Singer Vishal Jogdeo"],
      "jobTitle": "Devotional Playback Singer & Classical Vocalist",
      "url": "https://vishaljogdeo.com/",
      "image": "https://cnd.vishaljogdeo.com/IMG_4239-removebg-preview.png",
      "description": "Acclaimed Marathi devotional singer and classical vocalist with 24+ years of stage and recording career in Abhangas, Mahanubhav Bhajans, and live spiritual concerts.",
      "birthPlace": {
        "@type": "Place",
        "name": "Maharashtra, India"
      },
      "nationality": {
        "@type": "Country",
        "name": "India"
      },
      "knowsAbout": [
        "Marathi Abhangas",
        "Mahanubhav Panth Bhajans",
        "Indian Classical Music",
        "Devotional Playback Singing",
        "Bhakti Sangeet"
      ],
      "sameAs": [
        "https://open.spotify.com/playlist/2LgZXXcDdeKV7CVa1DIQBq",
        "https://youtube.com/@vishaljogdeo",
        "https://www.instagram.com/vishaljogdeo",
        "https://www.facebook.com/share/1AMnZnHGyd/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://vishaljogdeo.com/#faq",
      "mainEntity": SEO_FAQS.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEO 
        title="Vishal Jogdeo" 
        description="Official website of Vishal Jogdeo. Listen to popular Vishal Jogdeo Ke Bhajan and Vishal Jogdeo Songs, read complete lyrics, explore lifestyle, biography, and upcoming live shows." 
        keywords="Vishal Jogdeo, Vishal Jogdeo Ke Bhajan, Vishal Jogdeo Songs, Vishal Jogdeo Bhajan, Vishal Jogdeo MP3, Vishal Jogdeo Lifestyle, Vishal Jogdeo Lyrics, विशाल जोगदेव, विशाल जोगदेव के भजन, विशाल जोगदेव सॉंग्स, Abhanga Sandhya" 
        url="/"
        schema={homeSchema}
      />
      
      {/* Top Announcement Ticker Bar */}
      <div className="pt-16 sm:pt-20">
        <AnnouncementTicker notifications={notifications} shows={shows} onOpenBooking={() => navigate('/contact')} />
      </div>

      <div className="space-y-12 pb-16">
      
        {/* Main 16:9 Hero Slider & Artist Profile Section (Contains Single H1 on Homepage) */}
        <HeroSection 
          slides={heroSlides}
          onPlayFeaturedSong={() => onPlaySong(FEATURED_SONGS[0])}
          onOpenBooking={() => navigate('/contact')}
          loading={loading}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* 1000-1500 WORDS SEO ARTICLE SECTION WITH IMAGES & INTERNAL LINKS */}
          <HomepageSEOArticle />

          {/* CURATED ARTICLES & EDITORIAL SHOWCASE */}
          <section className="py-8 border-t border-amber-500/20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-500/20 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Spiritual Insights & Articles</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Vishal Jogdeo Editorial & Guides
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  In-depth articles covering his devotional music journey, Marathi Abhangas, lifestyle, and career.
                </p>
              </div>

              <Link
                to="/articles"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ARTICLES_DATA.map((art) => (
                <div
                  key={art.id}
                  className="p-5 rounded-2xl bg-[#121218] border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>{art.publishedDate}</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock className="w-3 h-3" /> {art.readingTime}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
                      <Link to={`/articles/${art.slug}`}>{art.h1Title}</Link>
                    </h3>
                    <p className="text-xs text-stone-300 font-sans line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                  <Link
                    to={`/articles/${art.slug}`}
                    className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* SPOTIFY EMBEDDED PLAYER SECTION */}
          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="py-8 border-y border-amber-500/20 space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4 fill-[#1DB954]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.26c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.24zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.18-1.2.78-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z"/>
                </svg>
                <span>Spotify Discography</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">
                Top Vishal Jogdeo Tracks
              </h2>
              <p className="text-amber-200/70 text-xs sm:text-sm max-w-lg mx-auto">Listen to official Marathi Abhangas, Bhajans, and devotional tracks directly on Spotify.</p>
            </div>

            {/* Responsive Spotify Player Card */}
            <div className="flex justify-center w-full pt-2">
              <div className="w-full max-w-[380px] md:max-w-5xl aspect-[9/16] md:aspect-none md:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-[#121218] p-1 sm:p-2 relative group transition-all duration-300 gold-glow">
                <iframe 
                  title="Vishal Jogdeo Spotify Playlist"
                  style={{ borderRadius: '20px' }}
                  src="https://open.spotify.com/embed/playlist/2LgZXXcDdeKV7CVa1DIQBq?utm_source=generator&theme=0" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </div>
          </motion.section>

          {/* 20+ FAQ SECTION WITH SEARCH, CATEGORY PILLS & STRUCTURED DATA */}
          <SEOFAQSection />

          {/* DIRECT EVENT BOOKING BANNER */}
          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#18120a] via-[#241a0d] to-[#18120a] text-stone-100 p-8 sm:p-10 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl gold-glow"
          >
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Event Inquiries</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Want to Organize Bhajan Sandhya or Wedding Shows?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm font-sans">
                Connect directly with Vishal Jogdeo's official management team for concert bookings, wedding devotional programs, and corporate cultural events.
              </p>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              Book Vishal Jogdeo Now
            </button>
          </motion.section>

        </div>
      </div>
    </>
  );
};



