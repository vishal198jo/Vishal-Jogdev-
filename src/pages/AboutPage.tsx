import React from 'react';
import { motion } from 'motion/react';
import { AboutSection } from '../components/AboutSection';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Award, Music, Heart, Globe, BookOpen, Sparkles, Mic, Trophy } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO title="विशाल जोगदेव - अधिकृत माहिती व संगीत प्रवास" description="सुप्रसिद्ध भक्तीगीत गायक व महानुभाव पंथ भजनसम्राट विशाल जोगदेव यांची अधिकृत माहिती, २५ वर्षांची संगीत कारकीर्द, १५००+ भक्तीगीते व ५००+ महानुभाव पंथ भजने." keywords="Vishal Jogdeo Biography, महानुभाव पंथ भजनसम्राट, भक्तिगीत गायक, विशाल जोगदेव" />
      <div className="pt-20 sm:pt-24 space-y-10">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0b0b0e] border-b border-amber-500/20 py-10 text-stone-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Biography & Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            About <span className="font-serif italic text-gold-gradient font-normal">Vishal Jogdeo</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            महाराष्ट्रातील सुप्रसिद्ध भक्तीगीत गायक व महानुभाव पंथ भजनसम्राट विशाल जोगदेव यांचा संगीत प्रवास.
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
          className="bg-[#121218] p-6 sm:p-10 rounded-3xl border border-amber-500/20 space-y-8 text-stone-100 shadow-xl"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1.5 border-b border-amber-500/20 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">विशेष योगदान व वैशिष्ट्ये</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              संगीत क्षेत्रातील <span className="font-serif italic text-gold-gradient font-normal">प्रमुख टप्पे</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              २००१ पासून आजतागायत १५००+ हून अधिक भक्तीगीते आणि ५००+ महानुभाव पंथ भजने.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-2.5">
              <div className="w-9 h-9 bg-amber-950/80 border border-amber-500/30 rounded-lg text-amber-300 flex items-center justify-center font-bold">
                <Mic className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">१५००+ भक्तिगीते रेकॉर्डिंग</h3>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                T-Series, कृणाल म्युझिक, HMV म्युझिक, SAREGAMA यांसारख्या कंपन्यांसाठी मराठी व हिंदी भक्तीगीते रेकॉर्ड केली.
              </p>
            </div>

            <div className="p-5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-2.5">
              <div className="w-9 h-9 bg-amber-950/80 border border-amber-500/30 rounded-lg text-amber-300 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">महानुभाव पंथ सेवा</h3>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                महानुभाव पंथासाठी ५००+ भजने, श्लोक, आरत्या, दत्तात्रेय कवच, पंचावतार मंत्र - ज्याने त्यांना "महानुभाव पंथ भजनसम्राट" ही उपाधी मिळवून दिली.
              </p>
            </div>

            <div className="p-5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-2.5">
              <div className="w-9 h-9 bg-amber-950/80 border border-amber-500/30 rounded-lg text-amber-300 flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">यूट्यूब सिल्वर प्ले बटण</h3>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                केंद्रीय मंत्री नितीन गडकरी यांच्या हस्ते नागपूर येथे विदर्भातील पहिला YouTube Silver Play Button पुरस्कार प्रदान करण्यात आला.
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


