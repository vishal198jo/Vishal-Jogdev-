import React from 'react';
import { Trophy, Award, Newspaper, ShieldCheck } from 'lucide-react';
import { AWARDS } from '../data/mockData';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors & Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Awards & <span className="font-serif italic text-gold-gradient font-normal">Recognition</span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-sans">
            Prestigious honors, certificates, magazine features, and media mentions celebrating devotional singing.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              className="bg-[#121218] border border-stone-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 group transition-all duration-300"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-2 border border-stone-800">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-amber-300 text-[10px] font-bold uppercase backdrop-blur-sm border border-amber-500/20">
                  {award.category}
                </span>
                <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-stone-900 text-amber-400 text-xs font-bold font-heading border border-stone-800">
                  {award.year}
                </span>
              </div>

              <div className="space-y-1 flex-1">
                <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">{award.organization}</p>
                <h3 className="text-base font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                  {award.title}
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed pt-1">
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
