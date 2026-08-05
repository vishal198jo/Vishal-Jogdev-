import React from 'react';
import { motion } from 'motion/react';
import { AboutSection } from '../components/AboutSection';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Award, Music, Heart, Globe, BookOpen } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  

  return (
    <>
      <SEO title="Biography & Musical Journey" description="Learn about Vishal Jogdeo's 15-year classical vocal journey, Gurukul lineage, Sant Sahitya research, and global devotional concert tours." keywords="Vishal Jogdeo Biography, Classical Music Vocalist, Sant Sahitya, Hindustani Music, Pune Singer" />
      <div className="pt-20 space-y-10">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FDFCFB] border-b border-stone-200 py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Official Biography</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-stone-900">
            About <span className="font-serif italic text-amber-900 font-normal">Vishal Jogdeo</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            A 15-year journey of classical vocal discipline, spiritual devotion, and global Maharashtrian culture promotion.
          </p>
        </div>
      </motion.div>

      {/* Main About Component */}
      <AboutSection />

      {/* Stats Breakdown */}
      <StatsSection />

      {/* Gurukul & Classical Lineage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 sm:p-10 border border-stone-200 space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1.5 border-b border-stone-200 pb-4">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">Gharana & Musical Foundation</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
              Classical Discipline & <span className="font-serif italic text-amber-900 font-normal">Spiritual Lineage</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Trained rigorously in Hindustani classical music with a focus on devotional voice modulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="w-9 h-9 bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center font-bold">
                <Music className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-heading">Hindustani Vocal Training</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Over 12 years of intensive Riyaz in Khyal gayaki, voice modulation, and octave transitions under venerable gurus in Pune and Mumbai.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="w-9 h-9 bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-heading">Sant Sahitya Archival Work</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Dedicated research into the authentic composition meters of Sant Dnyaneshwar, Sant Tukaram, Sant Namdev, and Sant Janabai.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="w-9 h-9 bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-heading">Global Performance Tours</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Conducted over 450+ live concerts in India, USA, UK, UAE, and Singapore, connecting the Indian diaspora with spiritual melody.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  </>
  );
};

