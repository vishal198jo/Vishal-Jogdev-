import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ARTICLES_DATA } from '../data/articlesData';

export const ArticlesPage: React.FC = () => {
  const articlesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://vishaljogdeo.com/articles#collection",
      "url": "https://vishaljogdeo.com/articles",
      "name": "Vishal Jogdeo Articles & Devotional Music Editorial Hub",
      "description": "Read comprehensive articles, biography, devotional music guides, and lifestyle chronicles of classical vocalist Vishal Jogdeo.",
      "hasPart": ARTICLES_DATA.map(art => ({
        "@type": "Article",
        "headline": art.h1Title,
        "url": `https://vishaljogdeo.com/articles/${art.slug}`,
        "description": art.metaDescription,
        "image": art.featuredImage,
        "datePublished": art.publishedDate,
        "author": {
          "@type": "Person",
          "name": "Vishal Jogdeo"
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title="Vishal Jogdeo Articles – Songs, Bhajans & Biography"
        description="Explore comprehensive articles on Vishal Jogdeo, popular Vishal Jogdeo Ke Bhajan, Vishal Jogdeo Songs, lifestyle, classical training, and devotional music insights."
        keywords="Vishal Jogdeo, Vishal Jogdeo Ke Bhajan, Vishal Jogdeo Songs, Vishal Jogdeo Lifestyle, Vishal Jogdeo Articles, विशाल जोगदेव, विशाल जोगदेव के भजन, विशाल जोगदेव सॉंग्स"
        url="/articles"
        schema={articlesSchema}
      />

      <div className="pt-24 sm:pt-28 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Section */}
          <header className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Editorial & Knowledge Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Vishal Jogdeo Articles & Chronicles
            </h1>
            
            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
              Curated long-form stories, musical biographies, and deep-dive guides into the art, lifestyle, and spiritual heritage of classical devotional singer <strong>Vishal Jogdeo</strong>.
            </p>
          </header>

          {/* Featured Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES_DATA.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#121218] border border-amber-500/20 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img
                      src={article.featuredImage}
                      alt={article.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  {/* Article Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors leading-snug">
                      <Link to={`/articles/${article.slug}`}>
                        {article.h1Title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-300 font-sans line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold transition-all border border-stone-800 hover:border-amber-400"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Trust Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#18120a] via-[#241a0d] to-[#18120a] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Authentic, Plagiarism-Free & Verified Content
              </h3>
              <p className="text-xs text-stone-300">
                All editorial pieces are researched, verified with classical scholars, and authorized by Vishal Jogdeo Sangeet.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs shadow-md hover:scale-105 transition-all whitespace-nowrap"
            >
              Contact Press & Media
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};
