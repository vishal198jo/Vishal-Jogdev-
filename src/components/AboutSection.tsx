import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Music, Heart, Globe, ArrowRight, CheckCircle, X } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import concertImage from '../assets/images/devotional_stage_concert_1785894013298.jpg';

export const AboutSection: React.FC = () => {
  const [showFullModal, setShowFullModal] = useState(false);

  return (
    <section id="about" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grid Layout: Photo Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#121218] p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
          
          {/* Left Column: Photo & Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden p-1.5 bg-stone-900 rounded-2xl border border-amber-500/30 group shadow-xl">
              <img
                src={concertImage}
                alt="Vishal Jogdeo Devotional Performance"
                className="w-full h-[400px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                <span className="px-3 py-1 bg-amber-400 text-black text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow">
                  15+ Years Experience
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  12 Countries & 450+ Sacred Shows
                </h3>
                <p className="text-xs text-amber-200/90 font-sans">
                  Performing classic Abhangas, Bhajans, and Aartis globally.
                </p>
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="bg-stone-900 border border-amber-500/30 p-3.5 mt-3 rounded-2xl max-w-xs shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300">
                  <Heart className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Pure Devotion</p>
                  <p className="text-[11px] text-amber-200/70">Classical Raga Based Melody</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                A Lifelong Devotional & <span className="font-serif italic text-gold-gradient font-normal">Musical Journey</span>
              </h3>
              
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
                {SINGER_PROFILE.bio}
              </p>

              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans">
                {SINGER_PROFILE.journey}
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hindustani Classical Vocalist</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">Rigorous training in Ragas and voice modulation under renowned gurus.</p>
              </div>

              <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sant Sahitya Archival Work</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">Dedicating years to singing authentic verses of Sant Dnyaneshwar & Tukaram.</p>
              </div>

              <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Grand Temple Events</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">Regular performances at Pandharpur, Shirdi, Siddhivinayak, and Mahashivratri.</p>
              </div>

              <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Global Spiritual Outreach</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">Bringing Maharashtrian & Indian bhakti sangeet to international audiences.</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Expanded Modal for Learn More */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121218] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-100 shadow-2xl relative">
            <button
              onClick={() => setShowFullModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-amber-500/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-amber-500/20 pb-4">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-[0.2em]">Complete Profile</span>
              <h3 className="text-2xl font-bold font-heading text-white">Vishal Jogdeo Profile</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-stone-300 font-sans">
              <p>
                <strong className="text-amber-300">Musical Roots & Classical Gurukul:</strong> Vishal Jogdeo began his classical musical apprenticeship at the age of 5 under respected gurus in Maharashtra. Learning the nuances of Khyal, Thumri, and Natyasangeet, his true passion crystallized when he first performed an Abhanga at a local temple gathering.
              </p>
              <p>
                <strong className="text-amber-300">The Devotional Milestone:</strong> In 2012, Vishal released his first devotional studio album which earned immediate popularity. His ability to deliver pristine high-register notes while maintaining spiritual humility set him apart in the Marathi and Hindi devotional playback industry.
              </p>
              <p>
                <strong className="text-amber-300">Global Presence:</strong> Today, Vishal Jogdeo actively tours North America, Europe, UAE, and Southeast Asia, conducting grand "Abhanga Sandhya" and "Swar Bhakti" live concerts that connect NRI communities with their spiritual roots.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex justify-end">
              <button
                onClick={() => setShowFullModal(false)}
                className="px-5 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs"
              >
                Close Biography
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

