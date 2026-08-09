import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye
} from 'lucide-react';
import { LATEST_LYRICS, SINGER_PROFILE } from '../data/mockData';
import { SEO } from '../components/SEO';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { db } from '../lib/firebase';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';

export const SingleLyricPage: React.FC = () => {
  const { lyricId } = useParams<{ lyricId: string }>();
  const navigate = useNavigate();
  const { lyrics: firestoreLyrics, loading } = useFirestoreData();

  // Increment view/reading counter once per user session
  useEffect(() => {
    if (!lyricId) return;
    
    const sessionKey = `viewed_lyric_${lyricId}`;
    if (!sessionStorage.getItem(sessionKey)) {
      const incrementReading = async () => {
        try {
          sessionStorage.setItem(sessionKey, 'true');
          
          // Increment lyric-specific reads
          await updateDoc(doc(db, 'lyrics', lyricId), {
            views: increment(1)
          });
          
          // Increment global read stats
          await setDoc(doc(db, 'stats', 'global'), {
            totalLyricsRead: increment(1)
          }, { merge: true });
        } catch (e) {
          console.warn("Failed to increment lyric reads:", e);
        }
      };
      incrementReading();
    }
  }, [lyricId]);

  // Find lyric in Firestore
  const matchedFirestore = firestoreLyrics.find(l => l.id === lyricId);
  
  const lyric = matchedFirestore ? {
    id: matchedFirestore.id,
    title: matchedFirestore.title,
    titleDevanagari: matchedFirestore.titleDevanagari || matchedFirestore.title,
    composer: matchedFirestore.singerName || 'Vishal Jogdeo',
    devanagariText: typeof matchedFirestore.devanagariText === 'string' ? matchedFirestore.devanagariText.split('\n') : (Array.isArray(matchedFirestore.devanagariText) ? matchedFirestore.devanagariText : []),
    romanText: typeof matchedFirestore.romanText === 'string' ? matchedFirestore.romanText.split('\n') : (Array.isArray(matchedFirestore.romanText) ? matchedFirestore.romanText : []),
    metaTitle: matchedFirestore.metaTitle,
    metaDescription: matchedFirestore.metaDescription
  } : null;

  // Reader States
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('sm');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [shareSuccess, setShareSuccess] = useState(false);

  if (loading) {
    return (
      <div className="pt-28 pb-16 min-h-screen bg-[#0b0b0e] text-stone-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative flex items-center justify-center">
            {/* outer rotating ring */}
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin"></div>
            {/* inner icon (traditional oil lamp) */}
            <div className="absolute text-amber-400 text-xl animate-pulse">
              🪔
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-wide font-heading">Loading Devotional Lyrics...</h3>
            <p className="text-xs text-stone-400">Please wait while we fetch the official abhanga text</p>
          </div>
          {/* Simulated skeleton preview */}
          <div className="bg-[#121218]/40 border border-stone-800/60 p-6 rounded-3xl space-y-3.5 max-w-sm mx-auto animate-pulse">
            <div className="h-4 bg-stone-800/80 rounded w-2/3 mx-auto"></div>
            <div className="h-3 bg-stone-900/60 rounded w-1/2 mx-auto"></div>
            <div className="pt-4 space-y-2.5">
              <div className="h-3 bg-stone-900/40 rounded w-full"></div>
              <div className="h-3 bg-stone-900/40 rounded w-5/6 mx-auto"></div>
              <div className="h-3 bg-[#121218] rounded w-4/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!lyric) {
    return (
      <div className="pt-28 pb-16 min-h-screen bg-[#0b0b0e] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold font-heading mb-2">Lyric Not Found</h2>
        <p className="text-stone-400 text-sm mb-6">The requested lyric could not be found or has been removed.</p>
        <button
          onClick={() => navigate('/lyrics')}
          className="px-5 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full"
        >
          Browse Lyrics Library
        </button>
      </div>
    );
  }

  // Share helper
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${lyric.titleDevanagari} Lyrics - Vishal Jogdeo`,
        text: `Read official lyrics for ${lyric.titleDevanagari} on Vishal Jogdeo Portal`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const fontClasses = {
    sm: 'text-base sm:text-lg leading-relaxed',
    md: 'text-lg sm:text-xl leading-loose font-medium',
    lg: 'text-xl sm:text-2xl leading-loose font-bold'
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  // Related lyrics from Firestore
  const rawRelatedList = firestoreLyrics;

  const relatedLyrics = rawRelatedList
    .filter(l => l.id !== lyric.id)
    .map(fl => ({
      id: fl.id,
      title: fl.title,
      titleDevanagari: fl.titleDevanagari || fl.title
    }))
    .slice(0, 3);

  return (
    <>
  {/* Dynamic SEO setup for this specific song lyric */}
  <SEO
      title={lyric.metaTitle || `${lyric.titleDevanagari} (${lyric.title}) - Full Lyrics | Vishal Jogdeo`}
      description={lyric.metaDescription || `Read complete lyrics for "${lyric.titleDevanagari}". Sung by Vishal Jogdeo.`}
      keywords={`${lyric.title}, ${lyric.titleDevanagari}, Abhanga Lyrics, Marathi Bhajan Lyrics, Vishal Jogdeo`}
    />
    <div className="pt-20 pb-10 bg-[#0b0b0e] text-stone-100 min-h-screen">
      
      {/* Sleek Top Navigation Bar */}
      <div className="border-b border-amber-500/20 py-2.5 mb-4 sticky top-16 z-30 bg-[#0b0b0e]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <button
            onClick={() => navigate('/lyrics')}
            className="inline-flex items-center gap-2 text-stone-300 hover:text-amber-300 font-bold text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Lyrics Library</span>
          </button>

          <div className="flex items-center gap-2">
            {shareSuccess && (
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                Link Copied!
              </span>
            )}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-amber-500/30 bg-[#121218] text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
              title="Share Lyrics"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Share</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. DIRECT TITLE & SINGER HEADER (NO IMAGE, NO CATEGORY/ALBUM BADGES) */}
        <div className="pb-5 border-b border-stone-800 space-y-3">
          <div className="space-y-2">
            {/* Primary Devanagari Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight">
              {lyric.titleDevanagari}
            </h1>

            {/* English Title & Singer Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-stone-800/60">
              <p className="text-xs sm:text-sm font-bold text-amber-300 font-serif italic">
                {lyric.title}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <p className="text-xs font-bold text-amber-400">
                  गायक: <span className="text-white">विशाल जोगदेव (Vishal Jogdeo)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ALIGNMENT & FONT ZOOM CONTROLS */}
        <div className="py-2 border-b border-stone-800 flex items-center justify-between gap-3">
          
          {/* Alignment Controls */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-stone-400 mr-1 hidden sm:inline">Align:</span>
            <button
              onClick={() => setTextAlign('left')}
              className={`p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${textAlign === 'left' ? 'bg-gold-gradient text-black shadow-md' : 'text-stone-400 hover:text-white'}`}
              title="Left Align"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Left</span>
            </button>

            <button
              onClick={() => setTextAlign('center')}
              className={`p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${textAlign === 'center' ? 'bg-gold-gradient text-black shadow-md' : 'text-stone-400 hover:text-white'}`}
              title="Center Align"
            >
              <AlignCenter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Center</span>
            </button>

            <button
              onClick={() => setTextAlign('right')}
              className={`p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${textAlign === 'right' ? 'bg-gold-gradient text-black shadow-md' : 'text-stone-400 hover:text-white'}`}
              title="Right Align"
            >
              <AlignRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Right</span>
            </button>
          </div>

          {/* Font Size Zoom Controls (A-, A, A+) */}
          <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button 
              onClick={() => setFontSize('sm')} 
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${fontSize === 'sm' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'}`}
              title="Zoom Out (A-)"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize('md')} 
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${fontSize === 'md' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'}`}
              title="Default Font Size (A)"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('lg')} 
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${fontSize === 'lg' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'}`}
              title="Zoom In (A+)"
            >
              A+
            </button>
          </div>

        </div>

        {/* 3. MAIN LYRICS CONTENT - CLEAN PROFESSIONAL CONTAINER WITH Subtle WATERMARK */}
        <div className="relative my-6 rounded-2xl bg-[#121110] border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Subtle WATERMARK BACKGROUND IMAGE */}
          <div 
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-0"
            aria-hidden="true"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden opacity-15 filter contrast-125 brightness-110">
              <img
                src={SINGER_PROFILE.watermarkImage}
                alt="Vishal Jogdeo Watermark"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* LYRICS CONTENT (HIGH CONTRAST & CLEAN READABILITY) */}
          <div className="relative z-10 space-y-6">
            
            {/* Devanagari Lyrics */}
            <div className="space-y-3">
              <div className={`font-heading text-stone-100 space-y-2.5 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
                {lyric.devanagariText.map((line, idx) => (
                  line === "" ? (
                    <div key={idx} className="my-3 h-2" />
                  ) : (
                    <p 
                      key={idx} 
                      className="py-0.5 text-stone-100 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:text-amber-300 transition-colors"
                    >
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Roman / English Lyrics (If available) */}
            {lyric.romanText && lyric.romanText.length > 0 && (
              <div className="space-y-3 pt-5 border-t border-stone-800/80">
                <div className={`font-sans text-stone-300 space-y-2.5 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
                  {lyric.romanText.map((line, idx) => (
                    line === "" ? (
                      <div key={idx} className="my-2 h-2" />
                    ) : (
                      <p 
                        key={idx} 
                        className="py-0.5 italic text-stone-300 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] hover:text-amber-300 transition-colors"
                      >
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* SIMPLE PROFESSIONAL FOOTER */}
          <div className="relative z-10 pt-5 mt-6 border-t border-stone-800/80 flex items-center justify-between text-xs font-semibold text-stone-400">
            <span className="flex items-center gap-1.5 text-amber-400">
              <i className="fa-solid fa-microphone text-amber-400 text-xs"></i>
              <span>Singer: {lyric.composer || "Vishal Jogdeo"}</span>
            </span>
          </div>

        </div>

        {/* 4. MORE DEVOTIONAL LYRICS WITH CLEAN BORDER */}
        {relatedLyrics.length > 0 && (
          <div className="pt-6 border-t border-stone-800 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-base font-bold font-heading text-white">
                More <span className="font-serif italic text-gold-gradient">Devotional Lyrics</span>
              </h3>
              <button 
                onClick={() => navigate('/lyrics')} 
                className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
              >
                <span>View Full Library →</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedLyrics.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/lyrics/${item.id}`)}
                  className="p-3.5 rounded-2xl bg-[#121218] hover:bg-stone-900 border border-stone-800 cursor-pointer transition-all group shadow-md space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400">गायक: विशाल जोगदेव</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-heading truncate group-hover:text-amber-300 transition-colors">
                    {item.titleDevanagari}
                  </h4>
                  <p className="text-[11px] text-stone-400 italic truncate">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
};
