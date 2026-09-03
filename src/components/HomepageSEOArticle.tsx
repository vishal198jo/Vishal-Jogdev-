import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Music, 
  Sparkles, 
  Calendar, 
  Award, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Share2,
  ExternalLink
} from 'lucide-react';

export const HomepageSEOArticle: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article 
      id="vishal-jogdeo-biography-deep-dive"
      className="py-12 border-t border-amber-500/20 bg-[#0f0f15]/80 rounded-3xl p-6 sm:p-10 border border-amber-500/25 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Gold Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Article Header */}
      <header className="space-y-4 text-center max-w-3xl mx-auto pb-8 border-b border-amber-500/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Biography, Songs & Bhajan Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight">
          Vishal Jogdeo: Popular Vishal Jogdeo Ke Bhajan, Vishal Jogdeo Songs & Lifestyle
        </h2>

        <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
          The complete guide to <strong>Vishal Jogdeo</strong>, featuring his 24-year musical journey, over 1,500 soulful <strong>Vishal Jogdeo Songs</strong>, world-renowned <strong>Vishal Jogdeo Ke Bhajan</strong>, authentic <em>Vishal Jogdeo Lifestyle</em>, and family support from wife Mayuri Jogdeo.
        </p>

        {/* Quick Highlights Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-amber-300/90 font-medium">
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Vishal Jogdeo: 24+ Years Career
          </span>
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Music className="w-3.5 h-3.5 text-amber-400" /> 1,500+ Vishal Jogdeo Songs
          </span>
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 500+ Vishal Jogdeo Ke Bhajan
          </span>
        </div>
      </header>

      {/* Main Prose Content */}
      <div className="max-w-4xl mx-auto pt-8 space-y-8 text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
        
        {/* Section 1: Who's Vishal Jogdeo */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Who is Vishal Jogdeo? Master of Devotional Music & Marathi Abhangas
          </h3>
          <p>
            When devotees and music lovers search for <strong>Vishal Jogdeo</strong>, they discover one of India’s most celebrated classical vocalists and devotional playback singers. Born and raised in Maharashtra, <strong>Vishal Jogdeo</strong> has dedicated his entire life to spiritual music, classical ragas, and the eternal poetry of saint-poets. Across Maharashtra and beyond, the name <strong>Vishal Jogdeo</strong> is synonymous with pure spiritual emotion, soul-stirring <strong>Vishal Jogdeo Ke Bhajan</strong>, and iconic <strong>Vishal Jogdeo Songs</strong> that have touched millions of hearts.
          </p>
          <p>
            Unlike commercial music, every performance of <strong>Vishal Jogdeo</strong> is an offering of sacred worship (Nada Brahma). Over his glorious 24-year musical career, <strong>Vishal Jogdeo</strong> has recorded and released more than 1,500 devotional compositions and over 500 authentic Mahanubhav Panth bhajans. Whether listening to his early morning aartis or attending a packed live concert, <strong>Vishal Jogdeo Songs</strong> transport listeners straight into deep peace and spiritual bliss.
          </p>
        </section>

        {/* Section 2: Vishal Jogdeo Ke Bare Maine - Musical Roots */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Vishal Jogdeo Ke Bare Maine: Early Life, Classical Training & Riyaz
          </h3>
          <p>
            If you want to know <strong>Vishal Jogdeo Ke Bare Maine</strong>, his roots lie in the fertile soil of Maharashtra’s rich cultural and devotional heritage. From an early age, <strong>Vishal Jogdeo</strong> showed an exceptional natural gift for musical pitch (Sur) and rhythm (Laya). Guided by dedicated classical gurus under the revered Guru-Shishya parampara, he immersed himself in rigorous voice training.
          </p>
          <p>
            The signature quality of <strong>Vishal Jogdeo Songs</strong> stems from his classical foundation in the Kirana and Gwalior gharanas. His mastery over swara microtones (Shrutis), meend, and taans gives <strong>Vishal Jogdeo Ke Bhajan</strong> an unmatched acoustic brilliance. When <strong>Vishal Jogdeo</strong> sings in classical ragas like Yaman, Bhairav, Malkauns, or Bhupali, his crystal-clear diction and resonant voice create an ambiance of pure divinity.
          </p>
        </section>

        {/* IMAGE 1: Vishal Jogdeo Lifestyle (User Provided) */}
        <figure className="my-8 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-[#14141c] p-3 sm:p-4 shadow-2xl group">
          <div className="w-full max-h-[500px] overflow-hidden rounded-2xl flex items-center justify-center bg-black/40">
            <img 
              src="https://cnd.vishaljogdeo.com/1788071932306_1788068980383_IMG-20260830-WA0013.jpg"
              alt="Vishal Jogdeo Lifestyle"
              className="w-full h-auto max-h-[480px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="pt-3 px-2 text-center sm:text-left">
            <span className="block text-xs sm:text-sm font-bold text-amber-300 font-sans">
              Vishal Jogdeo Lifestyle & Devotional Sadhana
            </span>
            <span className="block text-xs text-stone-400 font-sans mt-0.5">
              Vishal Jogdeo during his morning contemplation and classical riyaz, representing a lifestyle rooted in spiritual focus, humility, and musical discipline.
            </span>
          </figcaption>
        </figure>

        {/* Section 3: Vishal Jogdeo Lifestyle */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Vishal Jogdeo Lifestyle: Daily Riyaz, Mindful Living & Discipline
          </h3>
          <p>
            The term <strong>Vishal Jogdeo Lifestyle</strong> is synonymous with classical discipline, yogic focus, and spiritual simplicity. For Vishal Jogdeo, singing is not merely a stage performance; it is the culmination of hours of solitary voice culture practiced daily behind closed doors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/20 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Brahma-Muhurta Riyaz
              </h4>
              <p className="text-xs text-stone-300">
                Waking up at 4:30 AM every morning for Pranayama, Omkar chanting, and Kharaj sadhana (lower-octave voice exercises) to maintain vocal stamina.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/20 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Satvik & Mindful Nutrition
              </h4>
              <p className="text-xs text-stone-300">
                Adhering to a clean, pure vegetarian sattvic diet free from artificial irritants to preserve vocal health and emotional clarity across demanding tour schedules.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/20 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Study of Sant-Sahitya
              </h4>
              <p className="text-xs text-stone-300">
                Spending dedicated hours reading authentic philosophical texts, saint literature, and Lilacharitra manuscripts to grasp the spiritual essence of every line he sings.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/20 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Harmonium & Tanpura Tuning
              </h4>
              <p className="text-xs text-stone-300">
                Hand-tuning his acoustic Tanpuras and Sanvadini harmonium, ensuring that acoustic overtones resonate with pure mathematical harmony.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE 2: Vishal Jogdeo Wife (User Provided) */}
        <figure className="my-8 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-[#14141c] p-3 sm:p-4 shadow-2xl group">
          <div className="w-full max-h-[500px] overflow-hidden rounded-2xl flex items-center justify-center bg-black/40">
            <img 
              src="https://cnd.vishaljogdeo.com/1788071957747_1788071240647_VISHAL_JOGDEO_-_WIFE_MAYURI_JOGDEO_FAMELY_PICS__13_.jpeg"
              alt="Vishal Jogdeo Wife"
              className="w-full h-auto max-h-[480px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="pt-3 px-2 text-center sm:text-left">
            <span className="block text-xs sm:text-sm font-bold text-amber-300 font-sans">
              Vishal Jogdeo Wife: Mayuri Jogdeo & Family
            </span>
            <span className="block text-xs text-stone-400 font-sans mt-0.5">
              Vishal Jogdeo with his wife Mayuri Jogdeo and family, capturing a heartwarming bond of mutual support, cultural values, and marital companionship.
            </span>
          </figcaption>
        </figure>

        {/* Section 4: Family Life - Vishal Jogdeo Wife */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Family Life: Vishal Jogdeo Wife Mayuri Jogdeo & Strength at Home
          </h3>
          <p>
            Behind every celebrated artist stands a foundation of unwavering love and familial stability. For <strong>Vishal Jogdeo</strong>, that pillar of strength is his wife, <strong>Mayuri Jogdeo</strong>. Known for her graceful support and traditional values, Mayuri Jogdeo plays an indispensable role in managing the household and providing a peaceful sanctuary where artistic creativity can flourish.
          </p>
          <p>
            With an intense schedule of recording new <strong>Vishal Jogdeo Songs</strong>, live concerts, and spiritual tours, having a grounded family is vital. <strong>Vishal Jogdeo</strong> frequently attributes his mental calm and focus on stage to the constant encouragement of his wife Mayuri Jogdeo and his close-knit family. Despite his renown as an exponent of <strong>Vishal Jogdeo Ke Bhajan</strong>, he remains a humble family man deeply connected to his cultural roots.
          </p>
        </section>

        {/* Section 5: Vishal Jogdeo ke Bhajan & Repertoire */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Vishal Jogdeo Ke Bhajan: 1,500+ Devotional Songs & Sacred Heritage
          </h3>
          <p>
            The musical canon of <strong>Vishal Jogdeo Ke Bhajan</strong> is vast, diverse, and deeply authentic. Rather than limiting himself to commercial compositions, <strong>Vishal Jogdeo</strong> has explored the deepest treasures of Indian and Marathi devotional poetry. Today, millions of devotees tune in daily to listen to <strong>Vishal Jogdeo Songs</strong> spanning multiple sacred genres:
          </p>
          <ul className="space-y-2 list-disc list-inside text-stone-300">
            <li><strong>Pandharpur Varkari Abhangas:</strong> Soulful hymns dedicated to Lord Vitthal and Rukmini Devi, rendered in authentic <strong>Vishal Jogdeo Ke Bhajan</strong> style with traditional Pakhawaj and Taal.</li>
            <li><strong>Mahanubhav Panth Devotional Bhajans:</strong> Over 500 rare sacred tracks composed in praise of Sarvadnya Shri Chakradhar Swami, preserving ancient spiritual literature through melodious <strong>Vishal Jogdeo Songs</strong>.</li>
            <li><strong>Dnyaneshwari & Bhavarth Deepika Padas:</strong> Eloquent classical renderings of the philosophical verses of Sant Dnyaneshwar and Sant Tukaram.</li>
            <li><strong>Daily Morning Aartis & Stotras:</strong> Pristinely mastered devotional recordings bringing peace and auspicious energy to households worldwide.</li>
          </ul>
          <p>
            To listen to these masterworks, explore the official <Link to="/songs" className="text-amber-400 underline font-bold hover:text-amber-300">Vishal Jogdeo Songs Collection</Link> with free MP3 audio or view complete Devnagari lyrics in the <Link to="/lyrics" className="text-amber-400 underline font-bold hover:text-amber-300">Vishal Jogdeo Lyrics Library</Link>.
          </p>
        </section>

        {/* Section 6: Upcoming Shows & Concert Experiences */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Live Concerts & Booking: Experience Vishal Jogdeo Songs Live
          </h3>
          <p>
            The true magic of <strong>Vishal Jogdeo</strong> is best experienced live in person. Accompanied by a master orchestra featuring Harmonium (Sanvadini), Tabla, Pakhawaj, Dholki, Bansuri, and Taal, his signature <em>Abhanga Sandhya</em> concerts create an electrifying spiritual atmosphere. When <strong>Vishal Jogdeo</strong> performs his famous <strong>Vishal Jogdeo Ke Bhajan</strong> on stage, thousands of listeners sing along in divine ecstasy.
          </p>
          <p>
            Whether performing for spiritual organizations, temple trusts, community festivals, or family devotional events, <strong>Vishal Jogdeo</strong> delivers an unforgettable experience. Organizers seeking to host live concerts of <strong>Vishal Jogdeo Songs</strong> and bhajans can view the <Link to="/shows" className="text-amber-400 underline font-bold hover:text-amber-300">Upcoming Live Shows Schedule</Link> or connect directly via the <Link to="/contact" className="text-amber-400 underline font-bold hover:text-amber-300">Official Contact & Booking Portal</Link> (WhatsApp: <strong>+91 7038086864</strong>).
          </p>
        </section>

        {/* Contextual Internal Links Card */}
        <div className="p-6 rounded-2xl bg-[#161622] border border-amber-500/30 space-y-4 mt-8">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-amber-400" />
            Continue Exploring Vishal Jogdeo's Official Portal:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/songs"
              className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 text-xs font-semibold text-stone-200 hover:text-amber-300 transition-colors flex items-center justify-between"
            >
              <span>1,500+ MP3 Songs</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </Link>
            <Link
              to="/lyrics"
              className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 text-xs font-semibold text-stone-200 hover:text-amber-300 transition-colors flex items-center justify-between"
            >
              <span>Devnagari Lyrics</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </Link>
            <Link
              to="/shows"
              className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 text-xs font-semibold text-stone-200 hover:text-amber-300 transition-colors flex items-center justify-between"
            >
              <span>Upcoming Live Shows</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </Link>
            <Link
              to="/contact"
              className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 text-xs font-semibold text-stone-200 hover:text-amber-300 transition-colors flex items-center justify-between"
            >
              <span>Book A Concert</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>

    </article>
  );
};
