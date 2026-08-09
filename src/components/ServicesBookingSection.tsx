import React from 'react';
import { motion } from 'motion/react';
import { Mic2, Music, Sparkles, PhoneCall, CalendarCheck, Heart } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ServicesBookingSection: React.FC = () => {
  const whatsappNumber = "917038086864";

  const services = [
    {
      id: 'recording',
      title: 'भजन रेकॉर्डिंग (विशाल जोगदेव यांच्या आवाजात)',
      badge: 'Studio Recording',
      icon: <Mic2 className="w-6 h-6 text-amber-400" />,
      description: 'तुम्हाला अशा प्रकारचे तुमचे कुठले भजन विशाल जोगदेव यांच्या आवाजात रेकॉर्ड करायचे असल्यास तुम्ही खालील नंबरवर थेट संपर्क करू शकता..',
      whatsappText: 'नमस्कार, मला विशाल जोगदेव यांच्या आवाजात भजन रेकॉर्डिंगबद्दल संपर्क करायचा आहे.',
      accentGradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40'
    },
    {
      id: 'bhajan-sandhya',
      title: 'महानुभाव पंथीय भजनसंध्या (लाइव्ह शो व कार्यक्रम)',
      badge: 'Live Concert / Show',
      icon: <Music className="w-6 h-6 text-amber-400" />,
      description: 'महानुभाव पंथीय भजनसंध्या हेतू संपर्क.. विशाल जोगदेव यांचा सुमधुर आवाज सोबतच असंख्य नयनरम्य झाक्या व नामवंत कलाकारांचा एक मात्र महानुभाव पंथीय संच.',
      whatsappText: 'नमस्कार, मला महानुभाव पंथीय भजनसंध्या लाइव्ह शो बुकिंगबद्दल माहिती हवी आहे.',
      accentGradient: 'from-yellow-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-amber-500/40',
      badgeBg: 'bg-amber-900/90 text-amber-200 border-amber-400/50'
    },
    {
      id: 'devi-jagran',
      title: 'देवी जागरण व धार्मिक कार्यक्रम',
      badge: 'Religious Events',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      description: 'भव्य देवी जागरण, गोंधळ, तुळजापूर व कोल्हापूर आई भवानी जागरण, अखंड नामसप्ताह आणि कौटुंबिक धार्मिक उत्सवांसाठी सुमधुर भजनांच्या कार्यक्रमाकरिता संपर्क करा.',
      whatsappText: 'नमस्कार, मला देवी जागरण व धार्मिक कार्यक्रमासाठी संपर्क करायचा आहे.',
      accentGradient: 'from-orange-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-orange-950/80 text-orange-300 border-orange-500/40'
    },
    {
      id: 'wedding-sangeet',
      title: 'लग्नसोहळा सुगम संगीत',
      badge: 'Wedding Music',
      subText: '🎶 विशाल जोगदेव यांच्या आवाची सुरेल मैफल 🎶',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      description: 'आपल्या लग्नसोहळ्यासाठी विशाल जोगदेव यांचा मधुर आवाज आणि सुगम संगीताचा खास कार्यक्रम बुक करा.',
      whatsappText: 'नमस्कार, मला लग्नसोहळा सुगम संगीत कार्यक्रमाच्या बुकिंगबद्दल माहिती हवी आहे.',
      accentGradient: 'from-rose-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-rose-500/30',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-500/40'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="py-8 space-y-8 w-full"
    >
      {/* SECTION HEADER */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-md">
          <CalendarCheck className="w-4 h-4 text-amber-400" />
          <span>भजनसंध्या व शो बुकिंग</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight">
          लाइव्ह शो व <span className="font-serif italic text-gold-gradient font-normal">रेकॉर्डिंगसाठी</span> संपर्क
        </h2>

        <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-2xl mx-auto">
          महानुभाव पंथीय भजनसंध्या, सुगम संगीत, धार्मिक कार्यक्रम आणि स्टुडिओ भजन रेकॉर्डिंगसाठी थेट संपर्क करा
        </p>
      </div>

      {/* 4 DEV CONTAINERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv) => {
          const encodedMessage = encodeURIComponent(srv.whatsappText);
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

          return (
            <div
              key={srv.id}
              className={`relative bg-[#121218]/90 border ${srv.borderColor} rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 group overflow-hidden`}
            >
              {/* Corner Glow Accent */}
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${srv.accentGradient} rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="space-y-4 relative z-10">
                {/* Header Row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${srv.badgeBg} shadow-sm`}>
                    {srv.badge}
                  </span>
                </div>

                {/* Title & optional Subtext */}
                <div>
                  <h3 className="text-lg font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  {srv.subText && (
                    <p className="text-xs font-semibold text-amber-300 mt-1 italic">
                      {srv.subText}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                  {srv.description}
                </p>
              </div>

              {/* Bottom WhatsApp CTA Button */}
              <div className="pt-2 relative z-10 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 group/btn"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                  <span>WhatsApp वर संपर्क करा</span>
                </a>

                <a
                  href={`tel:${SINGER_PROFILE.contact.phone}`}
                  className="w-full py-2 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>थेट कॉल करा: {SINGER_PROFILE.contact.phone}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};
