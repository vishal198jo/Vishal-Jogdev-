import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Music, Heart, Globe, ArrowRight, CheckCircle, X } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import concertImage from '../assets/images/devotional_stage_concert_1785894013298.jpg';

export const AboutSection: React.FC = () => {
  const [showFullModal, setShowFullModal] = useState(false);

  return (
    <section id="about" className="py-12 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-2 border-b border-stone-200 pb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-[0.2em]">
            <Award className="w-3.5 h-3.5 text-amber-800" />
            <span>Biography & Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-stone-900">
            About <span className="font-serif italic font-normal text-amber-900">Vishal Jogdeo</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Dedicated to enriching lives through authentic devotional voice, classical discipline, and spiritual warmth.
          </p>
        </motion.div>

        {/* Grid Layout: Photo Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photo & Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden p-1.5 bg-stone-100 border border-stone-200 group">
              <img
                src={concertImage}
                alt="Vishal Jogdeo Devotional Performance"
                className="w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                <span className="px-3 py-1 bg-white/95 text-stone-900 text-[11px] font-semibold uppercase tracking-wider">
                  15+ Years Experience
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  12 Countries & 450+ Sacred Shows
                </h3>
                <p className="text-xs text-stone-200 font-sans">
                  Performing classic Abhangas, Bhajans, and Aartis globally.
                </p>
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="bg-white border border-stone-200 p-3.5 mt-2 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Heart className="w-4 h-4 fill-amber-800/10" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">100% Pure Devotion</p>
                  <p className="text-[11px] text-stone-500">Classical Raga Based Melody</p>
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
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                A Lifelong Devotional & Musical Journey
              </h3>
              
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
                {SINGER_PROFILE.bio}
              </p>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                {SINGER_PROFILE.journey}
              </p>
            </div>

            {/* Key Pillars - Clean Line Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Hindustani Classical Vocalist</span>
                </div>
                <p className="text-[11px] text-stone-500 font-sans">Rigorous training in Ragas and voice modulation under renowned gurus.</p>
              </div>

              <div className="p-3.5 bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Sant Sahitya Archival Work</span>
                </div>
                <p className="text-[11px] text-stone-500 font-sans">Dedicating years to singing authentic verses of Sant Dnyaneshwar & Tukaram.</p>
              </div>

              <div className="p-3.5 bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Grand Temple Events</span>
                </div>
                <p className="text-[11px] text-stone-500 font-sans">Regular performances at Pandharpur, Shirdi, Siddhivinayak, and Mahashivratri.</p>
              </div>

              <div className="p-3.5 bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                  <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Global Spiritual Outreach</span>
                </div>
                <p className="text-[11px] text-stone-500 font-sans">Bringing Maharashtrian & Indian bhakti sangeet to international audiences.</p>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowFullModal(true)}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs transition-all flex items-center gap-2 group"
              >
                <span>Learn More About Vishal's Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Expanded Modal for Learn More */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFCFB] border border-stone-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowFullModal(false)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 border border-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-stone-200 pb-4">
              <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-[0.2em]">Complete Profile</span>
              <h3 className="text-2xl font-bold font-heading text-stone-900">Vishal Jogdeo Profile</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-stone-600 font-sans">
              <p>
                <strong className="text-stone-900">Musical Roots & Classical Gurukul:</strong> Vishal Jogdeo began his classical musical apprenticeship at the age of 5 under respected gurus in Maharashtra. Learning the nuances of Khyal, Thumri, and Natyasangeet, his true passion crystallized when he first performed an Abhanga at a local temple gathering.
              </p>
              <p>
                <strong className="text-stone-900">The Devotional Milestone:</strong> In 2012, Vishal released his first devotional studio album which earned immediate popularity. His ability to deliver pristine high-register notes while maintaining spiritual humility set him apart in the Marathi and Hindi devotional playback industry.
              </p>
              <p>
                <strong className="text-stone-900">Global Presence:</strong> Today, Vishal Jogdeo actively tours North America, Europe, UAE, and Southeast Asia, conducting grand "Abhanga Sandhya" and "Swar Bhakti" live concerts that connect NRI communities with their spiritual roots.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setShowFullModal(false)}
                className="px-5 py-2 bg-stone-900 text-stone-50 font-medium text-xs hover:bg-stone-800"
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

