import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, Sparkles, Music, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { SEO_FAQS, FAQItem } from '../data/seoFaqsData';

interface SEOFAQSectionProps {
  initialOpenCount?: number;
  showSearch?: boolean;
}

export const SEOFAQSection: React.FC<SEOFAQSectionProps> = ({
  initialOpenCount = 3,
  showSearch = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return SEO_FAQS.slice(0, initialOpenCount).map(f => f.id);
  });

  const categories = [
    { id: 'all', label: 'All FAQs', count: SEO_FAQS.length, icon: HelpCircle },
    { id: 'general', label: 'General & Bio', count: SEO_FAQS.filter(f => f.category === 'general').length, icon: Sparkles },
    { id: 'music', label: 'Songs & Bhajans', count: SEO_FAQS.filter(f => f.category === 'music').length, icon: Music },
    { id: 'shows', label: 'Concerts & Booking', count: SEO_FAQS.filter(f => f.category === 'shows').length, icon: Calendar },
    { id: 'lifestyle', label: 'Lifestyle & Riyaz', count: SEO_FAQS.filter(f => f.category === 'lifestyle').length, icon: Heart },
  ];

  const filteredFaqs = useMemo(() => {
    return SEO_FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.keywords.some(k => k.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map(f => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  return (
    <section id="faq-section" className="py-12 border-t border-amber-500/20 space-y-8">
      
      {/* Header Container with Proper H2 Heading */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Verified Knowledge Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
          Detailed answers regarding classical vocalist <strong>Vishal Jogdeo</strong>, his devotional music, biography, daily lifestyle, wife Mayuri Jogdeo, all lyrics, MP3 songs, and concert bookings.
        </p>
      </div>

      {/* Controls: Category Filter + Search Bar */}
      <div className="space-y-4 max-w-4xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-stone-900/80 text-stone-300 hover:text-white border-amber-500/20 hover:border-amber-500/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-black text-amber-400' : 'bg-stone-800 text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Expand/Collapse Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. 'lifestyle', 'wife', 'songs', 'shows')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-stone-100 text-xs sm:text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 text-xs">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

      </div>

      {/* Accordion Questions List */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-stone-900/50 rounded-2xl border border-stone-800 p-6 space-y-2">
            <p className="text-sm text-stone-300 font-medium">No FAQs found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-amber-400 hover:underline font-bold"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#121218] border border-amber-500/20 overflow-hidden transition-all duration-300 hover:border-amber-500/40"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/20 mt-0.5">
                      {index + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors font-sans">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-1.5 rounded-full bg-stone-900 text-stone-400 group-hover:text-amber-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-amber-500/20 text-amber-300' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-amber-500/10 font-sans pl-12 sm:pl-13 space-y-2">
                        <p>{faq.answer}</p>
                        
                        {/* Keyword tags */}
                        {faq.keywords && faq.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {faq.keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 rounded-md bg-stone-900 text-[10px] text-amber-300/80 border border-stone-800"
                              >
                                #{kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Trust & Verification Footer Note */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-center text-xs text-stone-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>All answers are verified directly by the official Vishal Jogdeo management team.</span>
      </div>

    </section>
  );
};
