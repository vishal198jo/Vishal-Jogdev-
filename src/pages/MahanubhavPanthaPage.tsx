import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Clock, 
  Globe, 
  Award, 
  Compass, 
  ChevronRight, 
  Volume2, 
  Info, 
  X,
  Share2,
  Heart
} from 'lucide-react';
import { SEO } from '../components/SEO';

// Import generated deity portraits
import krishnabg from '../assets/images/shree_krishna_avatar_1785989701657.jpg';
import dattatreyabg from '../assets/images/dattatreya_avatar_1785989729278.jpg';
import chakrapanibg from '../assets/images/chakrapani_avatar_1785989741434.jpg';
import govindprabhubg from '../assets/images/govind_prabhu_avatar_1785989753630.jpg';
import chakradharbg from '../assets/images/chakradhar_swami_avatar_1785989816232.jpg';

interface MahanubhavPanthaPageProps {
  onOpenBooking?: () => void;
}

export interface PanchavataraDeity {
  id: string;
  nameEn: string;
  nameMr: string;
  colorBg: string;
  textColor: string;
  layout: 'image-left' | 'image-right';
  image: string;
  placeOfBirthEn: string;
  placeOfBirthDetailEn: string;
  placeOfBirthMr: string;
  timeOfBirthEn: string;
  timeOfBirthDetailEn: string;
  timeOfBirthMr: string;
  descriptionEn: string;
  descriptionMr: string;
  tirthakshetraEn: string[];
  tirthakshetraMr: string[];
}

export const PANCHAVATARA_DATA: PanchavataraDeity[] = [
  {
    id: 'krishna',
    nameEn: 'Lord Shree Krishna',
    nameMr: 'भगवान श्री कृष्ण',
    colorBg: 'bg-[#f98b00] border-amber-300',
    textColor: 'text-white',
    layout: 'image-left',
    image: krishnabg,
    placeOfBirthEn: 'Mathura detention (Prison)',
    placeOfBirthDetailEn: 'Uttar Pradesh',
    placeOfBirthMr: 'मथुरा (कारागृह), उत्तर प्रदेश',
    timeOfBirthEn: 'Shravan Krishna paksha eighth night',
    timeOfBirthDetailEn: 'at 12 pm (Wednesday)',
    timeOfBirthMr: 'श्रावण कृष्ण अष्टमी मध्यरात्र १२ वा. (बुधवार)',
    descriptionEn: 'The first incarnation of Supreme Parameshvara, whose divine Bhagavad Gita teachings and leelas establish the foundation of eternal Bhakti and Dharma.',
    descriptionMr: 'परमेश्वराचा पहिला अवतार, ज्यांच्या दिव्य भगवद्गीता उपदेशाने व बाललीलांनी भक्ती आणि धर्माचा पाया रचला.',
    tirthakshetraEn: ['Mathura (Uttar Pradesh)', 'Vrindavan', 'Dwarika'],
    tirthakshetraMr: ['मथुरा (उत्तर प्रदेश)', 'वृंदावन', 'द्वारिका']
  },
  {
    id: 'dattatreya',
    nameEn: 'Lord Shree Dattatreya Maharaj',
    nameMr: 'भगवान श्री दत्तात्रेय महाराज',
    colorBg: 'bg-[#b800e6] border-purple-300',
    textColor: 'text-white',
    layout: 'image-right',
    image: dattatreyabg,
    placeOfBirthEn: 'Badrikashram Uttarakhand',
    placeOfBirthDetailEn: '(Himalayas)',
    placeOfBirthMr: 'बद्रिकाश्रम उत्तराखंड (हिमालय)',
    timeOfBirthEn: 'Margshirsha Shukla Chaturdashi',
    timeOfBirthDetailEn: 'at 4 AM (Friday)',
    timeOfBirthMr: 'मार्गशीर्ष शुक्ल चतुर्दशी पहाटे ४ वा. (शुक्रवार)',
    descriptionEn: 'The eternal Avadhuta Guru embodiment of Brahma, Vishnu, and Shiva, showering timeless spiritual enlightenment and divine grace on seekers.',
    descriptionMr: 'त्रिगुणातीत अवधूत गुरुमूर्ती, साधकांना शाश्वत आत्मज्ञान आणि मोक्ष मार्ग प्रदान करणारे श्री गुरुदेवदत्त.',
    tirthakshetraEn: ['Badrikashram (Uttarakhand)', 'Girnar Parvat', 'Audumbar'],
    tirthakshetraMr: ['बद्रिकाश्रम (उत्तराखंड)', 'गिरनार पर्वत', 'औदुंबर']
  },
  {
    id: 'chakrapani',
    nameEn: 'Lord Shree Chakrapani Maharaj',
    nameMr: 'भगवान श्री चक्रपाणी महाराज',
    colorBg: 'bg-[#e60060] border-pink-300',
    textColor: 'text-white',
    layout: 'image-left',
    image: chakrapanibg,
    placeOfBirthEn: 'Phaltan district Satara',
    placeOfBirthDetailEn: '(Maharashtra)',
    placeOfBirthMr: 'फलटण, जिल्हा सातारा (महाराष्ट्र)',
    timeOfBirthEn: 'Ashwin ninth waning',
    timeOfBirthDetailEn: 'at 5 am (Thursday)',
    timeOfBirthMr: 'आश्विन वद्य नवमी पहाटे ५ वा. (गुरुवार)',
    descriptionEn: 'The third incarnation who performed divine miracles at Phaltan and Kamleshwar, bestowing liberation and awakening supreme spiritual consciousness.',
    descriptionMr: 'महानुभाव पंथातील तिसरे परमेश्वर अवतार, ज्यांनी फलटण व कमळेश्वर येथे अद्भुत लीला करून भक्तांचा उद्धार केला.',
    tirthakshetraEn: ['Phaltan (Satara)', 'Kamleshwar', 'Warangal'],
    tirthakshetraMr: ['फलटण (सातारा)', 'कमळेश्वर', 'वारंगळ']
  },
  {
    id: 'govind-prabhu',
    nameEn: 'Lord Shree Govind Prabhu',
    nameMr: 'भगवान श्री गोविंद प्रभु (गुंडम प्रभु)',
    colorBg: 'bg-[#0066ff] border-blue-300',
    textColor: 'text-white',
    layout: 'image-right',
    image: govindprabhubg,
    placeOfBirthEn: 'Katsur Ridhpur',
    placeOfBirthDetailEn: '(Maharashtra)',
    placeOfBirthMr: 'काटसूर, रिद्धपूर (महाराष्ट्र)',
    timeOfBirthEn: '10 pm Tryodashi Bhadrapad',
    timeOfBirthDetailEn: 'Shukla (Tuesday)',
    timeOfBirthMr: 'भाद्रपद शुक्ल त्रयोदशी रात्री १० वा. (मंगळवार)',
    descriptionEn: 'Revered as Shri Gundam Prabhu at Ridhpur, the ocean of boundless grace who blessed Sarvajnana Shri Chakradhar Swami with divine authority (Adhikara Svikara).',
    descriptionMr: 'रिद्धपूरचे महाप्रभू, अत्यंत दयाळू व वात्सल्यमूर्ती ज्यांनी सर्वज्ञ श्री चक्रधर स्वामींना शक्ती व अधिकार प्रदान केले.',
    tirthakshetraEn: ['Ridhpur (Amravati)', 'Katsur', 'Daryapur'],
    tirthakshetraMr: ['रिद्धपूर (अमरावती)', 'काटसूर', 'दर्यापूर']
  },
  {
    id: 'chakradhar-swami',
    nameEn: 'Lord Shree Chakradhar Swami',
    nameMr: 'सर्वज्ञ श्री चक्रधर स्वामी',
    colorBg: 'bg-[#ff1a1a] border-red-300',
    textColor: 'text-white',
    layout: 'image-left',
    image: chakradharbg,
    placeOfBirthEn: 'Bharuch,',
    placeOfBirthDetailEn: '(Gujarat)',
    placeOfBirthMr: 'भडोच (भरूच), गुजरात',
    timeOfBirthEn: '2 pm second Bhadrapad',
    timeOfBirthDetailEn: 'Shukla (Friday)',
    timeOfBirthMr: 'भाद्रपद शुक्ल द्वितीया दुपारी २ वा. (शुक्रवार)',
    descriptionEn: 'The founder of Mahanubhav Pantha (1268 AD) in Maharashtra who propagated Ahimsa, social equality, pure devotion to Parameshvara, and authored the foundational aphorisms.',
    descriptionMr: 'महानुभाव पंथाचे संस्थापक व प्रवर्तक, ज्यांनी मराठी भाषेत सूत्रपाठ व लीळाचरित्राच्या माध्यमातून अहिंसा व परमेश्वर भक्तीची अमर परंपरा निर्माण केली.',
    tirthakshetraEn: ['Panchaleshwar', 'Jalna', 'Ridhpur', 'Paithan', 'Mahur'],
    tirthakshetraMr: ['पंचाळेश्वर', 'जालना', 'रिद्धपूर', 'पैठण', 'माहूर']
  }
];

export const MahanubhavPanthaPage: React.FC<MahanubhavPanthaPageProps> = ({ onOpenBooking }) => {
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [activeModalDeity, setActiveModalDeity] = useState<PanchavataraDeity | null>(null);

  return (
    <>
      <SEO 
        title="Mahanubhav Pantha - Panchavatara Devotional Portal" 
        description="Explore the sacred Panchavatara (Five Incarnations) of Mahanubhav Pantha - Lord Shree Krishna, Lord Dattatreya, Lord Chakrapani, Lord Govind Prabhu, and Shri Chakradhar Swami." 
        keywords="Mahanubhav Pantha, Panchavatara, Shri Chakradhar Swami, Lord Dattatreya, Lilacharitra, Marathi Devotional Music, Vishal Jogdeo" 
      />

      <div className="pt-20 sm:pt-24 pb-20 bg-[#FDFCFB] text-stone-900 min-h-screen">
        
        {/* Page Top Header with Logo, Title and Language Toggle */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 text-center space-y-6 border-b border-stone-200 relative overflow-hidden">
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'en' ? 'Mahanubhav Sect • Panchavatara' : 'महानुभाव पंथ • पंचावतार दर्शन'}</span>
            </div>

            {/* Language Switcher */}
            <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-full border border-stone-300 text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all ${
                  lang === 'en' 
                    ? 'bg-stone-900 text-white shadow' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`px-3 py-1 rounded-full transition-all ${
                  lang === 'mr' 
                    ? 'bg-stone-900 text-white shadow' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Central Sacred Mahanubhav Logo Emblem Display */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center pt-2"
          >
            <div className="relative group">
              {/* Outer Glowing Golden Divine Halo Ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
              
              {/* Logo Frame */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2 border-4 border-amber-500 shadow-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/kVHCQ0gz/Picsart-26-08-06-09-55-05-686.png" 
                  alt="Official Mahanubhav Pantha Logo" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <span className="mt-3 text-xs sm:text-sm font-bold tracking-widest text-amber-900 uppercase bg-amber-100/80 border border-amber-300/80 px-4 py-1 rounded-full shadow-sm">
              {lang === 'en' ? 'Official Pantha Emblem' : '॥ जय श्रीकृष्ण सर्वज्ञ ॥'}
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-stone-900 pt-1">
            {lang === 'en' ? (
              <>
                Mahanubhav <span className="font-serif italic text-amber-900 font-normal">Pantha</span>
              </>
            ) : (
              <>
                महानुभाव <span className="font-serif italic text-amber-900 font-normal">पंथ</span>
              </>
            )}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            {lang === 'en' 
              ? 'Devotional reference to the five sacred incarnations (Panchavatara) of Supreme Parameshvara in the timeless Mahanubhav tradition established by Sarvajnana Shri Chakradhar Swami.'
              : 'सर्वज्ञ श्री चक्रधर स्वामींनी प्रस्थापित केलेल्या महानुभाव संप्रदायातील परमेश्वराचे पवित्र पंचावतार (पाच अवतार) दर्शन व जीवन परिचय.'}
          </p>

        </div>


        {/* PANCHAVATARA STADIUM CARDS SECTION (Matching Reference Screenshot EXACTLY) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 sm:space-y-12">
          
          {PANCHAVATARA_DATA.map((deity) => {
            const isImageLeft = deity.layout === 'image-left';

            return (
              <motion.div
                key={deity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveModalDeity(deity)}
                className={`relative group cursor-pointer overflow-hidden rounded-[80px] sm:rounded-[120px] md:rounded-[140px] shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl border-4 border-white outline outline-1 outline-stone-300 ${deity.colorBg}`}
              >
                {/* Inner Content Grid Container */}
                <div className={`p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Circular Avatar Frame */}
                  <div className="shrink-0 relative">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/90 shadow-xl bg-white/20 group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={deity.image} 
                        alt={deity.nameEn} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* Glowing halo indicator */}
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300/60 animate-pulse pointer-events-none" />
                  </div>

                  {/* Text Details Box */}
                  <div className={`flex-1 text-center ${isImageLeft ? 'md:text-left' : 'md:text-left'} space-y-3 sm:space-y-4 text-white drop-shadow-sm`}>
                    
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                      {lang === 'en' ? deity.nameEn : deity.nameMr}
                    </h2>

                    {/* Place of birth Block */}
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-yellow-200">
                        {lang === 'en' ? 'Place of birth:' : 'जन्मस्थान:'}
                      </p>
                      <p className="text-sm sm:text-lg font-bold leading-snug">
                        {lang === 'en' ? deity.placeOfBirthEn : deity.placeOfBirthMr}
                      </p>
                      {lang === 'en' && deity.placeOfBirthDetailEn && (
                        <p className="text-xs sm:text-sm font-medium opacity-90">
                          {deity.placeOfBirthDetailEn}
                        </p>
                      )}
                    </div>

                    {/* Time of birth Block */}
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-yellow-200">
                        {lang === 'en' ? 'Time of birth:' : 'जन्मवेळ व तिथी:'}
                      </p>
                      <p className="text-sm sm:text-base font-semibold leading-snug">
                        {lang === 'en' ? deity.timeOfBirthEn : deity.timeOfBirthMr}
                      </p>
                      {lang === 'en' && deity.timeOfBirthDetailEn && (
                        <p className="text-xs sm:text-sm font-medium opacity-90">
                          {deity.timeOfBirthDetailEn}
                        </p>
                      )}
                    </div>

                    {/* Quick Action Hint */}
                    <div className="pt-1 flex items-center justify-center md:justify-start gap-1 text-[11px] font-bold text-yellow-100 uppercase tracking-widest opacity-90 group-hover:text-white">
                      <span>{lang === 'en' ? 'Tap to view details & Lila' : 'सविस्तर माहिती पाहण्यासाठी टॅप करा'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}

        </section>


        {/* DETAILED PHILOSOPHY & LITERATURE SECTION */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
          
          {/* Sacred Symbol & Emblem Feature Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            {/* Logo Emblem on Left */}
            <div className="shrink-0 relative flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2.5 border-4 border-amber-500 shadow-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/kVHCQ0gz/Picsart-26-08-06-09-55-05-686.png" 
                  alt="Official Mahanubhav Pantha Logo Emblem" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-2 text-[11px] font-bold text-amber-900 bg-amber-200/80 px-3 py-0.5 rounded-full border border-amber-300">
                {lang === 'en' ? 'Sacred Insignia' : 'पंथाची अधिकृत मुद्रा'}
              </span>
            </div>

            {/* Emblem Description text on Right */}
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>{lang === 'en' ? 'Mahanubhav Emblem Significance' : 'महानुभाव पंथ मुद्रा व ध्वज महत्त्व'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-stone-900">
                {lang === 'en' ? 'The Symbol of Universal Peace & Divine Truth' : 'जय श्रीकृष्ण सर्वज्ञ • सार्वभौम शांती व सत्याचे प्रतीक'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {lang === 'en'
                  ? 'This sacred emblem represents the eternal grace of Supreme Parameshvara and the five incarnations (Panchavatara). It embodies the message of "Jai Krishni Sarvajnana", divine knowledge, Ahimsa, and supreme spiritual enlightenment for humanity.'
                  : 'हे पावन प्रतीक परमेश्वराच्या पंचावतार कृपेचे आणि "जय श्रीकृष्ण सर्वज्ञ" या मंत्राचे प्रतिनिधित्व करते. अखिल मानवजातीला अहिंसा, निरपेक्ष ज्ञान आणि मोक्षाचा दिव्य मार्ग दाखवणारी ही पंथाची पवित्र मुद्रा आहे.'}
              </p>
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">
              {lang === 'en' ? (
                <>
                  Core Teaching & <span className="font-serif italic text-amber-900 font-normal">Sacred Literature</span>
                </>
              ) : (
                <>
                  महानुभाव पंथाचे <span className="font-serif italic text-amber-900 font-normal">तत्वज्ञान व ग्रंथसंपदा</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-sans">
              {lang === 'en'
                ? 'The timeless spiritual philosophy propagated in the Marathi language during 13th century AD.'
                : '१३ व्या शतकात मराठी भाषेत रचलेले अद्वितीय विचार तत्वज्ञान आणि ग्रंथ परंपरा.'}
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                १
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {lang === 'en' ? 'Monotheism (ज्ञान)' : 'एकेश्वरवाद व ज्ञान'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Singular supreme devotion to Parameshvara as taught in the divine aphorisms of Sutrapath.'
                  : 'परमेश्वराचे एकमेव श्रेष्ठत्व आणि सूत्रपाठातील निरपेक्ष आत्मज्ञानाचा संदेश.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                २
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {lang === 'en' ? 'Ahimsa (अहिंसा)' : 'सर्वभूत अहिंसा'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Complete non-violence towards all living creatures, birds, animals, and nature.'
                  : 'प्राणिमात्र आणि सृष्टीवर निरपेक्ष प्रेम व पूर्ण अहिंसेचे आचरण.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                ३
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {lang === 'en' ? 'Marathi Bhasha (मराठी)' : 'मराठी भाषा समृद्धी'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Elevating the mother tongue Marathi to write classical prose biographies like Lilacharitra.'
                  : 'मराठीतील पहिला चरित्रग्रंथ लीळाचरित्र रचून ज्ञानभाषेला सर्वोच्च स्थान दिले.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                ४
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {lang === 'en' ? 'Social Equality' : 'समता व सामाजिक समभाव'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Equal spiritual authority for all human beings without distinction of caste, gender, or status.'
                  : 'स्त्री-पुरुष, वर्ण व जातीभेद विरहित सर्वांना भक्ती आणि मोक्षाचा समान अधिकार.'}
              </p>
            </div>

          </div>

          {/* Book Show Banner */}
          {onOpenBooking && (
            <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-stone-100 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl border border-amber-800/40">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-amber-200">
                {lang === 'en' ? 'Organize Mahanubhav Bhajan & Abhanga Sandhya' : 'महानुभाव भक्ती संगीत व अभंग संध्या आयोजन'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
                {lang === 'en'
                  ? 'Invite classical vocalist Vishal Jogdeo for authentic Mahanubhav devotional concerts, Dhavale renditions, and spiritual programs.'
                  : 'विशाल जोगदेव यांच्या सुमधुर आवाजात महानुभाव धवळे, पंचावतार अभंग व भक्ती संगीताचे कार्यक्रम आयोजित करा.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs uppercase tracking-widest shadow-lg transition-transform hover:scale-105"
                >
                  {lang === 'en' ? 'Book Devotional Concert' : 'कार्यक्रम बुक करा'}
                </button>
              </div>
            </div>
          )}

        </section>


        {/* DEITY DETAIL MODAL */}
        {activeModalDeity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#FDFCFB] border border-stone-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-stone-900 animate-in zoom-in-95">
              
              {/* Top Banner Image Header */}
              <div className={`p-6 ${activeModalDeity.colorBg} text-white relative`}>
                <button
                  onClick={() => setActiveModalDeity(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-2 border-white/80 overflow-hidden shrink-0 shadow-md">
                    <img src={activeModalDeity.image} alt={activeModalDeity.nameEn} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                      {lang === 'en' ? activeModalDeity.nameEn : activeModalDeity.nameMr}
                    </h3>
                    <p className="text-xs font-semibold text-yellow-200">
                      {lang === 'en' ? 'Panchavatara Deity' : 'पंचावतार परमेश्वर स्थान'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-sans text-xs sm:text-sm">
                
                {/* Info Block */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
                  <p className="text-stone-800 font-semibold leading-relaxed">
                    {lang === 'en' ? activeModalDeity.descriptionEn : activeModalDeity.descriptionMr}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {lang === 'en' ? 'Place of birth:' : 'जन्मस्थान:'}
                      </span>
                      <span className="text-stone-700">
                        {lang === 'en' ? `${activeModalDeity.placeOfBirthEn} ${activeModalDeity.placeOfBirthDetailEn}` : activeModalDeity.placeOfBirthMr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {lang === 'en' ? 'Time of birth:' : 'जन्मवेळ व तिथी:'}
                      </span>
                      <span className="text-stone-700">
                        {lang === 'en' ? `${activeModalDeity.timeOfBirthEn} ${activeModalDeity.timeOfBirthDetailEn}` : activeModalDeity.timeOfBirthMr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tirthakshetra Places */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200">
                  <span className="font-bold text-stone-900 block">
                    {lang === 'en' ? 'Sacred Tirthakshetra (तीर्थक्षेत्रे):' : 'प्रमुख तीर्थक्षेत्रे:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'en' ? activeModalDeity.tirthakshetraEn : activeModalDeity.tirthakshetraMr).map((place, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-xs font-medium">
                        📍 {place}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-between items-center">
                <span className="text-[11px] text-stone-500 font-semibold">
                  {lang === 'en' ? 'Jai Krishni Sarvajnana' : '॥ जय श्रीकृष्ण सर्वज्ञ ॥'}
                </span>
                <button
                  onClick={() => setActiveModalDeity(null)}
                  className="px-4 py-2 rounded-full bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors"
                >
                  {lang === 'en' ? 'Close' : 'बंद करा'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};
