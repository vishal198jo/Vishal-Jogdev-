import React from 'react';
import { Trophy, Award, Newspaper, ShieldCheck } from 'lucide-react';
import { AWARDS } from '../data/mockData';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-800" />
            <span>Honors & Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-stone-900">
            Awards & <span className="font-serif italic font-normal text-amber-900">Recognition</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto font-sans">
            Prestigious honors, certificates, magazine features, and media mentions celebrating devotional singing.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              className="bg-white border border-stone-200/80 hover:border-stone-400 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4 group transition-all duration-300"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-2">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-stone-900/80 text-stone-50 text-[10px] font-bold uppercase backdrop-blur-sm">
                  {award.category}
                </span>
                <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-stone-100 text-amber-900 text-xs font-bold font-heading border border-stone-200">
                  {award.year}
                </span>
              </div>

              <div className="space-y-1 flex-1">
                <p className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider">{award.organization}</p>
                <h3 className="text-base font-bold text-stone-900 font-heading group-hover:text-amber-900 transition-colors">
                  {award.title}
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1">
                  {award.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
