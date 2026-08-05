import React from 'react';
import { motion } from 'motion/react';
import { Disc, BookOpen, Calendar, Clock, Trophy } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { CountUpNumber } from './CountUpNumber';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Songs Released',
      numericValue: SINGER_PROFILE.songsCount,
      suffix: '+',
      sub: 'Official Devotional Singles & Albums',
      icon: Disc,
    },
    {
      label: 'Lyrics Published',
      numericValue: SINGER_PROFILE.lyricsCount,
      suffix: '+',
      sub: 'Abhangas, Bhajans & Aartis',
      icon: BookOpen,
    },
    {
      label: 'Shows Completed',
      numericValue: SINGER_PROFILE.showsCount,
      suffix: '+',
      sub: 'Live Spiritual Gatherings & Tours',
      icon: Calendar,
    },
    {
      label: 'Years Experience',
      numericValue: SINGER_PROFILE.experienceYears,
      suffix: '+',
      sub: 'Devotional Music Excellence',
      icon: Clock,
    },
  ];

  return (
    <section className="py-10 bg-stone-50 border-y border-stone-200 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 bg-white border border-stone-200 text-center space-y-2 group"
              >
                <div className="w-10 h-10 mx-auto bg-stone-100 border border-stone-200 flex items-center justify-center text-amber-900 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">
                  <CountUpNumber end={stat.numericValue} suffix={stat.suffix} />
                </h3>
                
                <p className="text-xs sm:text-sm font-semibold text-stone-800 font-heading">
                  {stat.label}
                </p>
                
                <p className="text-[11px] text-stone-500 font-sans hidden sm:block">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

