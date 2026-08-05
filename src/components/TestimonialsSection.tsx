import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Heart, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-2 border-b border-stone-200 pb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-[0.2em]">
            <Heart className="w-3.5 h-3.5 text-amber-800 fill-amber-800/20" />
            <span>Words of Praise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-stone-900">
            What <span className="font-serif italic font-normal text-amber-900">Maestros & Organizers</span> Say
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Testimonials from respected music composers, temple trustees, and festival chairs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white border border-stone-200 hover:border-amber-800 p-6 flex flex-col justify-between space-y-6 relative group transition-all duration-300"
            >
              {/* Quote icon watermark */}
              <Quote className="w-8 h-8 text-stone-200 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-800">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-800 text-amber-800" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed font-sans">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-heading">{t.name}</h3>
                  <p className="text-xs text-amber-900 font-medium">{t.role}</p>
                  {t.organization && (
                    <p className="text-[10px] text-stone-500">{t.organization}</p>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

