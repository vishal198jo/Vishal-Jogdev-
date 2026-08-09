import React from 'react';
import { motion } from 'motion/react';
import { Mic2, Music, Sparkles, PhoneCall, CalendarCheck } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

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
          महानुभाव पंथीय भजनसंध्या, धार्मिक कार्यक्रम आणि स्टुडिओ भजन रेकॉर्डिंगसाठी थेट संपर्क करा
        </p>
      </div>

      {/* 3 DEV CONTAINERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                {/* Title */}
                <h3 className="text-lg font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors leading-snug">
                  {srv.title}
                </h3>

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
                  <svg className="w-4 h-4 fill-current text-white group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
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
