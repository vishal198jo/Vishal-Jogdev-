import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Music, BookOpen, Mic, Calendar, Trophy, Image as ImageIcon, PhoneCall, ArrowRight, Star } from 'lucide-react';

export const ExplorePortal: React.FC = () => {
  const portalSections = [
    {
      title: 'अजरामर भक्तीगीते दालन',
      subtitle: 'Devotional Songs & Discography',
      description: 'T-Series, SAREGAMA, HMV व Krunal Music द्वारे प्रदर्शित १५००+ भक्तीगीतांचा संग्रह.',
      path: '/songs',
      badge: '१५००+ गाणी',
      icon: Music,
      color: 'border-amber-500/30 bg-gradient-to-br from-[#121218] to-[#18121f]',
    },
    {
      title: 'भक्तीगीत शब्दरचना (Lyrics)',
      subtitle: 'Audio Lyrics Directory',
      description: 'अजरामर भक्तीगीते व भजनांच्या संपूर्ण देवनागरी शब्दरचना ऑडिओ प्लेयरसह.',
      path: '/lyrics',
      badge: 'संपूर्ण शब्दरचना',
      icon: Mic,
      color: 'border-amber-500/30 bg-gradient-to-br from-[#121218] to-[#111918]',
    },
    {
      title: 'थेट संगीत सोहळे व बुकिंग',
      subtitle: 'Live Shows & Event Bookings',
      description: 'अभंग संध्या, धार्मिक संगीत सोहळे व मंदिर महोत्सवांसाठी अधिकृत थेट बुकिंग.',
      path: '/shows',
      badge: 'Live Concerts',
      icon: Calendar,
      color: 'border-amber-500/30 bg-gradient-to-br from-[#1a150e] to-[#121218]',
    },
    {
      title: 'पुरस्कार व व्हीआयपी सन्मान',
      subtitle: 'Awards & Accolades',
      description: 'YouTube Silver Play Button (नितीन गडकरी) आणि मुख्यमंत्री महोदयांच्या हस्ते गौरव.',
      path: '/about',
      badge: 'गौरव व उपाधी',
      icon: Trophy,
      color: 'border-amber-500/30 bg-gradient-to-br from-[#1c160a] to-[#121218]',
    },
    {
      title: 'छायाचित्रे व कॉन्सर्ट गॅलरी',
      subtitle: 'Photos & High-Res Gallery',
      description: 'थेट संगीत मैफिली, व्हीआयपी भेटी, स्टुडिओ रेकॉर्डिंग व भक्ती कार्यक्रमांची क्षणचित्रे.',
      path: '/gallery',
      badge: 'HD Gallery',
      icon: ImageIcon,
      color: 'border-amber-500/30 bg-gradient-to-br from-[#121218] to-[#191218]',
    },
  ];

  return (
    <section className="py-12 bg-[#0b0b0e] text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Portal Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">
            Explore <span className="font-serif italic text-gold-gradient font-normal">Website Portal</span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-sans">
            विशाल जोगदेव यांच्या भक्ती संगीत विश्वातील प्रमुख दालने आणि अधिकृत माहिती.
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalSections.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  to={portal.path}
                  className={`block h-full p-6 rounded-3xl border ${portal.color} transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/80 shadow-xl group relative overflow-hidden flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="px-3 py-1 bg-amber-950/90 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {portal.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-[11px] text-amber-200/70 font-mono">
                        {portal.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {portal.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors relative z-10">
                    <span>विभाग पहा (Explore Section)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
