import React from 'react';
import { motion } from 'motion/react';
import { Music, Sparkles, Heart, PhoneCall, CalendarCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ServicesBookingSection: React.FC = () => {
  const primaryPhone = "7038086864";
  const secondaryPhone = "8208958856";

  const services = [
    {
      id: 'wedding-sangeet',
      title: 'सुगम संगीत एवं लग्न गीते 💕',
      badge: 'Wedding & Live Show',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      description: 'महाराष्ट्राचे सुप्रसिद्ध गायक विशाल जोगदेव यांची महानुभाव पंथीय गाजलेली भजने, लग्न गीते, तसेच महानुभाव पंथीय मंगलाष्टकांसोबत हिंदी मराठी फिल्मी गाण्यांच्या कार्यक्रमाचा एक अनोखा संगम.',
      specialNote: '✨ आपल्याकडील लग्न समारंभात आम्हाला नक्की बोलवा',
      whatsappText: 'नमस्कार, मला सुगम संगीत एवं लग्न गीते शो बुकिंगबद्दल माहिती हवी आहे.',
      phoneText: 'Contact for All Type Live & Wedding Show',
      phones: [primaryPhone],
      accentGradient: 'from-rose-500/20 via-rose-600/10 to-transparent',
      borderColor: 'border-rose-500/30',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-500/40'
    },
    {
      id: 'bhajan-sandhya',
      title: 'श्री चक्रधर भक्तीधारा (महानुभाव पंथ भजनसंध्या) 🌸',
      badge: 'महानुभाव पंथ भजनसंध्या',
      icon: <Music className="w-6 h-6 text-amber-400" />,
      description: 'महानुभाव पंथाचे सुप्रसिद्ध व लाडके, भजनसम्राट श्री विशाल जोगदेव यांचा सुमधुर आवाज, उत्कृष्ट वाद्यवृंद आणि श्रीकृष्ण, सुदामा, मिरा तथा अनेक नयनरम्य सजीव झाक्यानी सजलेला व महाराष्ट्रात गाजलेला एक दर्जेदार कार्यक्रम.',
      whatsappText: 'नमस्कार, मला श्री चक्रधर भक्तीधारा (महानुभाव पंथ भजनसंध्या) कार्यक्रमाच्या बुकिंगबद्दल माहिती हवी आहे.',
      phoneText: 'भजनसंध्या हेतू संपर्क',
      phones: [primaryPhone, secondaryPhone],
      accentGradient: 'from-amber-500/20 via-yellow-600/10 to-transparent',
      borderColor: 'border-amber-500/40',
      badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-400/50'
    },
    {
      id: 'devi-jagran',
      title: 'विशाल भगवती जागरण 🌺',
      badge: 'Devi Jagran Group',
      subTitle: 'जसगायक- विशाल जोगदेव (T-Series Playback Singer)',
      icon: <Sparkles className="w-6 h-6 text-orange-400" />,
      description: 'संपूर्ण मध्यभारत में धूम मचानेवाला कलाकारो का संच, साथ ही साईबाबा, भोलेबाबा, काली मां, राधा कृष्ण ऐसी असंख्य नयनरम्य झांकीयो से सजा मध्यभारत का सुप्रसिद्ध जागरण ग्रुप…',
      whatsappText: 'नमस्कार, मला विशाल भगवती जागरण कार्यक्रमाच्या बुकिंगबद्दल माहिती हवी आहे.',
      phoneText: 'Contact For Devi Jagran',
      phones: [primaryPhone],
      accentGradient: 'from-orange-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-orange-500/30',
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
          लाइव्ह शो व <span className="font-serif italic text-gold-gradient font-normal">कार्यक्रम बुकिंग</span>
        </h2>

        <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-2xl mx-auto">
          महानुभाव पंथीय भजनसंध्या, सुगम संगीत एवं लग्न गीते आणि भव्य भगवती जागरण कार्यक्रमांसाठी संपर्क करा
        </p>
      </div>

      {/* 3 CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((srv) => {
          const encodedMessage = encodeURIComponent(srv.whatsappText);
          const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodedMessage}`;

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

                {/* Title & SubTitle */}
                <div>
                  <h3 className="text-lg font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  {srv.subTitle && (
                    <p className="text-xs font-semibold text-amber-300 mt-1 italic">
                      {srv.subTitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                  {srv.description}
                </p>

                {/* Special Note if any */}
                {srv.specialNote && (
                  <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-200 text-xs font-medium">
                    {srv.specialNote}
                  </div>
                )}
              </div>

              {/* Bottom WhatsApp & Phone CTA Buttons */}
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

                <div className="space-y-1.5">
                  <p className="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider text-center">
                    {srv.phoneText}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {srv.phones.map((phoneNum) => (
                      <a
                        key={phoneNum}
                        href={`tel:${phoneNum}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-200 hover:text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 min-w-[130px]"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{phoneNum}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

