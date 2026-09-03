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
          <span>Complete Biography & Musical Chronicle</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight">
          Vishal Jogdeo: Devotional Playback Singer, Classical Vocalist & Spiritual Icon
        </h2>

        <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
          An in-depth biography covering the 24-year artistic voyage of <strong>Vishal Jogdeo</strong>, his classical music roots, disciplined <em>Vishal Jogdeo lifestyle</em>, celebrated <em>Vishal Jogdeo ke Bhajan</em>, and his family life with wife Mayuri Jogdeo.
        </p>

        {/* Quick Highlights Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-amber-300/90 font-medium">
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Award className="w-3.5 h-3.5 text-amber-400" /> 24+ Years Experience
          </span>
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Music className="w-3.5 h-3.5 text-amber-400" /> 1,500+ Devotional Songs
          </span>
          <span className="inline-flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 500+ Mahanubhav Bhajans
          </span>
        </div>
      </header>

      {/* Main Prose Content */}
      <div className="max-w-4xl mx-auto pt-8 space-y-8 text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
        
        {/* Section 1: Who's Vishal Jogdeo */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Who's Vishal Jogdeo? The Divine Voice of Maharashtra
          </h3>
          <p>
            When music lovers ask <strong>"Who's Vishal Jogdeo?"</strong>, the answer connects them to one of India’s most gifted classical vocalists and devotional playback singers. Born and raised in Maharashtra, Vishal Jogdeo has dedicated his life to spiritual music, classical ragas, and the timeless poetry of the saints. His divine, resonant baritone has earned him an esteemed place among exponents of <em>Marathi Bhakti Sangeet</em>, <em>Abhanga Sandhya</em>, and <em>Mahanubhav Panth Bhajans</em>.
          </p>
          <p>
            Unlike purely commercial performers, Vishal Jogdeo treats music as a form of sacred worship (Nada Brahma). Over more than two decades on stage and in recording studios, he has breathed new life into sacred verses written by Sant Dnyaneshwar, Sant Tukaram, Sant Namdev, and the teachings of Sarvadnya Shri Chakradhar Swami. With over 1,500 recorded devotional tracks and 500+ specialized Mahanubhav bhajans, his works have garnered millions of streams across YouTube, Spotify, and Indian music broadcasts.
          </p>
        </section>

        {/* Section 2: Vishal Jogdeo Ke Bare Maine - Musical Roots */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Vishal Jogdeo Ke Bare Maine: Early Life & Classical Gharana
          </h3>
          <p>
            The story of <strong>Vishal Jogdeo Ke Bare Maine</strong> begins in an environment steeped in spiritual tradition, Vedic hymns, and melodic riyaz. From early childhood, Vishal showed an uncanny sensitivity to musical pitch (Sur) and rhythmic cadences (Taal). Recognizing this divine gift, his family and early mentors enrolled him in rigorous Indian Classical vocal training under the traditional Guru-Shishya parampara.
          </p>
          <p>
            His classical foundation incorporates stylistic nuances from the Kirana and Gwalior gharanas—known for their expansive vilambit elaborations, precise microtonal intonation (Shrutis), and emotive melodic ornamentation. Whether he performs in Raga Yaman, Raga Bhairav, Raga Malkauns, or Raga Bhupali, his voice creates an atmosphere of deep serenity that effortlessly transports listeners into a meditative state.
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
            Behind every celebrated artist stands a foundation of unwavering love and familial stability. For Vishal Jogdeo, that pillar of strength is his wife, <strong>Mayuri Jogdeo</strong>. Known for her graceful support and traditional values, Mayuri Jogdeo plays an indispensable role in managing the household and providing a peaceful sanctuary where artistic creativity can flourish.
          </p>
          <p>
            With an intense schedule of live concerts, studio recording deadlines, and inter-state travels, having a grounded family is vital. Vishal Jogdeo frequently attributes his mental calm and focus on stage to the constant encouragement of his wife Mayuri Jogdeo and his close-knit family. Despite his renown, Vishal remains an affectionate husband, devoted family man, and humble member of his local community.
          </p>
        </section>

        {/* Section 5: Vishal Jogdeo ke Bhajan & Repertoire */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Vishal Jogdeo ke Bhajan: The Grand Legacy of Marathi Bhakti Sangeet
          </h3>
          <p>
            The musical canon of <strong>Vishal Jogdeo ke Bhajan</strong> is vast, diverse, and deeply authentic. Rather than limiting himself to popular hits, Vishal Jogdeo has explored the deepest recesses of Marathi spiritual literature. His repertoire spans:
          </p>
          <ul className="space-y-2 list-disc list-inside text-stone-300">
            <li><strong>Pandharpur Varkari Abhangas:</strong> Soulful hymns dedicated to Lord Vitthal and Rukmini Devi, rendered with the traditional vigor of the Pakhawaj, Taal, and Ektari.</li>
            <li><strong>Mahanubhav Panth Devotional Padavali:</strong> Rare compositions celebrating the divine incarnations of Shri Chakradhar Swami, preserving ancient lilas with acoustic beauty.</li>
            <li><strong>Dnyaneshwari & Bhavarth Deepika Padas:</strong> Musical interpretations of the profound philosophical verses of Sant Dnyaneshwar Maharaj.</li>
            <li><strong>Morning Aartis & Stotras:</strong> Pristinely recorded daily prayer hymns that bring auspicious peace into millions of Hindu households each sunrise.</li>
          </ul>
          <p>
            To listen to these masterworks, explore the official <Link to="/songs" className="text-amber-400 underline font-bold hover:text-amber-300">Vishal Jogdeo Songs Collection</Link> or view accurate Devnagari lyrics in the <Link to="/lyrics" className="text-amber-400 underline font-bold hover:text-amber-300">Lyrics Library</Link>.
          </p>
        </section>

        {/* Section 6: Upcoming Shows & Concert Experiences */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-400 rounded-full inline-block" />
            Upcoming Shows, Abhanga Sandhya & Live Booking
          </h3>
          <p>
            The true magic of Vishal Jogdeo is best experienced live. Accompanied by a master orchestra featuring Harmonium, Tabla, Pakhawaj, Dholki, Bansuri, and Side Percussions, his signature <em>Abhanga Sandhya</em> concerts routinely pack auditoriums, temple festival grounds, and cultural arenas.
          </p>
          <p>
            Whether performing for spiritual organizations, temple trusts, community festivals, or private devotional celebrations, Vishal Jogdeo creates an inclusive space where listeners of all ages sing, clap, and dissolve into divine bliss. Organizers seeking to host him for live programs can check the <Link to="/shows" className="text-amber-400 underline font-bold hover:text-amber-300">Upcoming Live Shows Schedule</Link> or submit a direct inquiry on the <Link to="/contact" className="text-amber-400 underline font-bold hover:text-amber-300">Official Contact & Booking Page</Link>.
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
