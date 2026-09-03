import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, User, Calendar, Mic, Trophy, Youtube, Facebook, Instagram } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SpotifyIcon } from './SpotifyIcon';
import { SINGER_PROFILE } from '../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main Banner: Photo Left, Core Profile Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121218] p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
          
          {/* Left Column: Photo & Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative space-y-3"
          >
            <div className="relative overflow-hidden p-3 bg-gradient-to-b from-stone-900 via-[#16161d] to-stone-950 rounded-2xl border border-amber-500/30 group shadow-xl flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Ambient Gold Glow behind portrait */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] bg-gradient-to-br from-amber-500/20 via-yellow-600/15 to-orange-500/10 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              <img
                src={SINGER_PROFILE.portraitImage}
                alt="Vishal Jogdeo - Devotional Playback Singer"
                className="relative z-10 w-full h-[320px] sm:h-[380px] object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="relative z-10 w-full mt-3 p-3 bg-stone-900/90 border border-amber-500/20 rounded-xl space-y-1 text-center">
                <span className="inline-block px-2.5 py-0.5 bg-amber-400 text-black text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow">
                  २४+ वर्षे संगीत कारकीर्द
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  महानुभाव पंथ भजनसम्राट
                </h3>
                <p className="text-[11px] text-amber-200/90 font-sans">
                  १५००+ भक्तीगीते व ५००+ महानुभाव भजने
                </p>
              </div>
            </div>

            {/* Silver Button Badge */}
            <div className="bg-stone-900 border border-amber-500/30 p-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 shrink-0">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">विदर्भातील पहिला Silver Button Winner</p>
                  <p className="text-[12px] font-semibold text-amber-300">YouTube Silver Play Button</p>
                  <p className="text-[11px] text-stone-400 font-medium">(By Nitin Gadkari)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Exact Requested Home Text */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>विशाल जोगदेव अधिकृत परिचय</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white leading-tight">
                विशाल जोगदेव
                <span className="block text-base sm:text-xl lg:text-2xl font-normal text-amber-300 mt-1 sm:mt-1.5">
                  (महानुभाव पंथ भजनसम्राट)
                </span>
              </h2>
              
              {/* EXACT USER REQUESTED HOME PAGE TEXT */}
              <div className="p-5 sm:p-6 bg-stone-900/90 rounded-2xl border border-amber-500/30 space-y-3 shadow-inner">
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  विशाल जोगदेव हे महाराष्ट्रातील सुप्रसिद्ध भक्तीगीत गायक आहेत. त्यांनी आजवर अनेक चित्रपट, मालिका आणि अल्बमसाठी अनेक अजरामर गाणी गायली आहेत .
                </p>
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  सुमधुर व भावपूर्ण आवाज तसेच भजन सादर करण्याची एक वेगळी पद्धत हीच विशाल जोगदेव यांची विशेष ओळख आहे.
                </p>
                <p className="text-amber-200/95 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  विशाल जोगदेव यांनी गायलेली दीड हजारहून अधिक भक्तीगीते सर्वच म्युझिक प्लॅटफॉर्मवर उपलब्ध आहेत. जी भक्तिगीते आज ही भक्तांच्या तनामनात सखोल घर करून आहे. तसेच महानुभाव पंथासाठी देखील त्यांनी पाचशेहून अधिक सुप्रसिद्ध भजने गायली आहेत व त्यामुळेच महानुभाव पंथात त्यांना <strong className="text-amber-300 font-bold">*महानुभाव पंथ भजनसम्राट*</strong> या उपाधीने संबोधल्या जाते.
                </p>
              </div>

            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 bg-stone-900/90 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <p className="text-xl font-bold text-amber-300 font-heading">1500+</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">भक्तीगीते</p>
              </div>
              <div className="p-3 bg-stone-900/90 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <p className="text-xl font-bold text-amber-300 font-heading">500+</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">महानुभाव भजने</p>
              </div>
              <div className="p-3 bg-stone-900/90 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <p className="text-xl font-bold text-amber-300 font-heading">24+</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">वर्षे अनुभव</p>
              </div>
              <div className="p-3 bg-stone-900/90 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <p className="text-xl font-bold text-amber-300 font-heading">1000+</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">लाइव्ह शो</p>
              </div>
            </div>

            {/* अधिकृत सोशल मीडिया प्लॅटफॉर्म्स (Official Social Media Platforms) */}
            <div className="space-y-3 pt-5 border-t border-stone-800/80">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                अधिकृत सोशल मीडिया प्लॅटफॉर्म्स
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <a
                  href="https://youtube.com/channel/UC4VL0F50tmB15hp_1xcAqbQ?si=B17lL_GVWyFPycFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">मुख्य युट्यूब चॅनेल</p>
                    <p className="text-[10px] text-stone-400 font-sans">Official YouTube Channel</p>
                  </div>
                </a>

                <a
                  href="https://youtube.com/@vishaljogdeo?si=qgvJLr_mIlxl7GCx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">विशाल जोगदेव अधिकृत</p>
                    <p className="text-[10px] text-stone-400 font-sans">@vishaljogdeo</p>
                  </div>
                </a>

                <a
                  href="https://youtube.com/@vishaljogdeosong?si=qVfckl16L0VrpmEW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">विशाल जोगदेव गाणी चॅनेल</p>
                    <p className="text-[10px] text-stone-400 font-sans">@vishaljogdeosong</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/share/1AMnZnHGyd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-blue-500/50 hover:bg-blue-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">अधिकृत फेसबुक पेज</p>
                    <p className="text-[10px] text-stone-400 font-sans">Facebook Profile</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/917038086864?text=नमस्कार,%20मला%20विशाल%20जोगदेव%20यांच्या%20अधिकृत%20माहिती%20आणि%20अपडेट्सबद्दल%20संपर्क%20करायचा%20आहे."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">अधिकृत व्हॉट्सॲप</p>
                    <p className="text-[10px] text-stone-400 font-sans">WhatsApp Direct Contact</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/vishaljogdeo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-pink-500/50 hover:bg-pink-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">अधिकृत इन्स्टाग्राम</p>
                    <p className="text-[10px] text-stone-400 font-sans">@vishaljogdeo</p>
                  </div>
                </a>

                <a
                  href="https://open.spotify.com/playlist/2LgZXXcDdeKV7CVa1DIQBq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <SpotifyIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">अधिकृत स्पॉटिफाय</p>
                    <p className="text-[10px] text-stone-400 font-sans">Spotify Playlist</p>
                  </div>
                </a>
              </div>
            </div>

          </motion.div>

        </div>

        {/* PROPER OPEN SECTIONS DISPLAYED DIRECTLY ON PAGE (NO MODAL / NO READ MORE) */}
        <div className="space-y-8 pt-4">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">संपूर्ण जीवनपट व माहिती</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              विशाल जोगदेव विस्तृत माहिती
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
              प्रारंभिक जीवनापासून ते १५००+ भक्तीगीते आणि व्हीआयपी सन्मानांपर्यंतचा संपूर्ण प्रवास.
            </p>
          </div>

          {/* Grid of 4 Detailed Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. प्रारंभिक जीवन */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-[#121218] rounded-3xl border border-amber-500/20 space-y-3 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 shrink-0">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-heading leading-tight">
                    प्रारंभिक जीवन
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">(Early Life)</span>
                  </h4>
                  <p className="text-[11px] text-amber-300/80 font-medium mt-1">जन्म, बालपण आणि संगीताची सुरुवात</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                <p>
                  विशाल जोगदेव यांचा जन्म <strong className="text-amber-200">२२ मार्च १९८३</strong> रोजी नागपूर, महाराष्ट्र येथे झाला. लहान वयापासूनच त्यांना संगीताची विशेष आवड होती.
                </p>
                <p>
                  त्यांनी वयाच्या १५ व्या वर्षापासून सार्वजनिक मंचावर भक्तीगीत गायनास सुरुवात केली.
                </p>
                <p>
                  त्यांनी २००१ पासून व्यावसायिक संगीत क्षेत्रात कार्य सुरू केले व त्यानंतर <strong className="text-amber-200">T-Series, कृणाल म्युझिक, HMV म्युझिक, SAREGAMA</strong> अशा विविध नामांकित संगीत कंपन्यांसाठी तसेच मराठी, हिंदी आणि धार्मिक अल्बमांसाठी अनेक भक्तिगीते गायली आहेत.
                </p>
              </div>
            </motion.div>

            {/* 2. संगीत कारकीर्द */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-[#121218] rounded-3xl border border-amber-500/20 space-y-3 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 shrink-0">
                  <Mic className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-heading leading-tight">
                    संगीत कारकीर्द
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">(Musical Career)</span>
                  </h4>
                  <p className="text-[11px] text-amber-300/80 font-medium mt-1">१५००+ भक्तीगीते व ५००+ महानुभाव भजने</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                <p>
                  २००१ मध्ये त्यांचा पहिला भक्तिगीतांचा अल्बम प्रदर्शित झाला. महाराष्ट्रातील प्रत्येक मंदिरासाठी व म्युझिक कंपन्यांसाठी त्यांनी भक्तीगीते रेकॉर्ड केली आहेत.
                </p>
                <p className="text-amber-200 font-medium">
                  महानुभाव पंथातील संगीत क्षेत्रासाठी विशाल जोगदेव यांचे सर्वात मोठे योगदान आहे. महानुभाव पंथात बऱ्याच घरची सकाळ ही विशाल जोगदेव यांच्या भजनांनीच होत असते.
                </p>
                <p>
                  महानुभाव पंथासाठी विशाल यांनी गायलेले श्लोक, पारंपरिक आरत्या, दत्तात्रेय कवच, पंचावतार मंत्र, व ५०० हून अधिक भजने गेल्या १५ वर्षांपासून गाजत आहेत. त्यामुळेच त्यांना संपूर्ण महानुभाव पंथात <strong className="text-amber-300">“महानुभाव पंथ भजनसम्राट”</strong> या उपाधीने संबोधले जाते.
                </p>
                <p className="text-stone-300">
                  त्यांनी सोनू निगम, अनुराधा पौडवाल, सुरेश वाडकर, साधना सरगम, वैशाली सामंत व आदर्श शिंदे यांसारख्या दिग्गज गायकांसोबत अनेक युगल भक्तीगीते (Duets) गायली आहेत.
                </p>
              </div>
            </motion.div>

            {/* 3. राजकीय व व्हीआयपी सन्मान */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-[#121218] rounded-3xl border border-amber-500/20 space-y-3 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 shrink-0">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-heading leading-tight">
                    प्रमुख सन्मान व अनावरण
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">(VIP Honors)</span>
                  </h4>
                  <p className="text-[11px] text-amber-300/80 font-medium mt-1">केंद्रीय मंत्री व मुख्यमंत्र्यांच्या हस्ते विशेष गौरव</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans list-disc list-inside">
                <li>
                  केंद्रीय मंत्री <strong className="text-white">नितीन गडकरी</strong> यांच्या हस्ते विशाल जोगदेव यांना YouTube कडून मिळणारा विदर्भातील पहिला <strong className="text-amber-300">"Silver Play Button Award"</strong> नागपूर येथे सन्मानाने प्रदान करण्यात आला.
                </li>
                <li>
                  उप मुख्यमंत्री <strong className="text-white">एकनाथ शिंदे</strong> यांच्या हस्ते विशाल जोगदेव यांनी गायलेले <strong className="text-amber-200">"आम्ही देवाचे पुजारी"</strong> या गीताचे अनावरण करण्यात आले.
                </li>
                <li>
                  महाराष्ट्राचे मुख्यमंत्री <strong className="text-white">देवेंद्र फडणवीस</strong> यांच्या हस्ते महानुभाव पंथात केलेल्या विशेष योगदानासाठी सन्मानित करण्यात आले असून कृष्ण भजनांचे अनावरण करण्यात आले.
                </li>
                <li>
                  विशाल जोगदेव यांचे सोशल मीडियावर असंख्य फॉलोवर्स असून ते सोशल मीडियावर सर्वात जास्त सर्च होणारे विदर्भातील एकमेव गायक आहेत.
                </li>
              </ul>
            </motion.div>

            {/* 4. वैयक्तिक माहिती */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-[#121218] rounded-3xl border border-amber-500/20 space-y-3 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-300 shrink-0">
                  <User className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-heading leading-tight">
                    वैयक्तिक माहिती
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">(Personal Details)</span>
                  </h4>
                  <p className="text-[11px] text-amber-300/80 font-medium mt-1">कुटुंब, शिक्षण व जन्मस्थान</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">पूर्ण नाव:</span>
                  <strong className="text-amber-200">विशाल अरुण जोगदेव</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">जन्म तारीख:</span>
                  <strong className="text-white">२२ मार्च १९८३</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">जन्मस्थान:</span>
                  <strong className="text-white">नागपूर, महाराष्ट्र</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">जात:</span>
                  <strong className="text-white">ब्राह्मण हिंदू</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">पत्नी:</span>
                  <strong className="text-white">मयुरी जोगदेव</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">पुत्र:</span>
                  <strong className="text-white">सर्वज्ञ जोगदेव</strong>
                </div>
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between sm:col-span-2">
                  <span className="text-stone-400">शिक्षण:</span>
                  <strong className="text-amber-300">B.com, A.T.D, C.T.D.</strong>
                </div>
              </div>
            </motion.div>

          </div>

          {/* User Requested Photographic Showcase: Lifestyle & Family */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* 1. Vishal Jogdeo Lifestyle Photo */}
            <figure className="bg-[#121218] p-4 rounded-3xl border border-amber-500/25 space-y-3 shadow-xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src="https://cnd.vishaljogdeo.com/1788071932306_1788068980383_IMG-20260830-WA0013.jpg"
                  alt="Vishal Jogdeo Lifestyle"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="space-y-1 text-left px-1">
                <h4 className="text-sm font-bold text-amber-300 font-heading">
                  Vishal Jogdeo Lifestyle
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  नियमित सकाळी ब्रह्ममुहूर्तावर रियाज, सात्विक जीवनशैली आणि शास्त्रीय संगीतातील अविरत साधना हे विशाल जोगदेव यांच्या जीवनशैलीचे मुख्य सूत्र आहे.
                </p>
              </figcaption>
            </figure>

            {/* 2. Vishal Jogdeo Wife Photo */}
            <figure className="bg-[#121218] p-4 rounded-3xl border border-amber-500/25 space-y-3 shadow-xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src="https://cnd.vishaljogdeo.com/1788071957747_1788071240647_VISHAL_JOGDEO_-_WIFE_MAYURI_JOGDEO_FAMELY_PICS__13_.jpeg"
                  alt="Vishal Jogdeo Wife"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="space-y-1 text-left px-1">
                <h4 className="text-sm font-bold text-amber-300 font-heading">
                  Vishal Jogdeo Wife (मयुरी जोगदेव व कुटुंब)
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  विशाल जोगदेव यांच्या सांगीतिक प्रवासात त्यांची पत्नी मयुरी जोगदेव आणि संपूर्ण कुटुंबीयांचे मोलाचे सहकार्य व पाठींबा लाभला आहे.
                </p>
              </figcaption>
            </figure>

          </div>
        </div>

      </div>
    </section>
  );
};




