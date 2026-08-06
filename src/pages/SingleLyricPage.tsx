import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Disc,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { LATEST_LYRICS, SINGER_PROFILE } from '../data/mockData';
import { SEO } from '../components/SEO';

export const SingleLyricPage: React.FC = () => {
  const { lyricId } = useParams<{ lyricId: string }>();
  const navigate = useNavigate();

  // Find lyric by id or songId
  const lyric = LATEST_LYRICS.find(l => l.id === lyricId || l.songId === lyricId) || LATEST_LYRICS[0];



  // Reader States
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [shareSuccess, setShareSuccess] = useState(false);

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

  // Related lyrics
  const relatedLyrics = LATEST_LYRICS.filter(l => l.id !== lyric.id).slice(0, 3);

  return (
    <>
  {/* Dynamic SEO setup for this specific song lyric */}
  <SEO
      title={`${lyric.titleDevanagari} (${lyric.title}) - Full Lyrics | Vishal Jogdeo`}
      description={`Read complete lyrics for "${lyric.titleDevanagari}". Album: ${lyric.album}. Sung by Vishal Jogdeo.`}
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

        {/* 1. DIRECT TITLE HEADER WITH CLEAN BORDER LINE */}
        <div className="pb-4 border-b border-stone-800 space-y-2">
          <div className="flex items-center gap-4">
            <img
              src={lyric.coverImage}
              alt={lyric.title}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-amber-500/30 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                  {lyric.category}
                </span>
                <span className="text-stone-400 text-xs font-semibold flex items-center gap-1">
                  <Disc className="w-3.5 h-3.5 text-amber-400" />
                  <span>Album: {lyric.album}</span>
                </span>
              </div>

              {/* Primary Devanagari Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-white leading-tight">
                {lyric.titleDevanagari}
              </h1>

              {/* English Transliteration */}
              <p className="text-xs sm:text-sm font-bold text-amber-300 font-serif italic">
                {lyric.title}
              </p>
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

        {/* 3. MAIN LYRICS CONTENT DIRECTLY ON PAGE WITH WATERMARK */}
        <div className="py-4 relative">
          
          {/* WATERMARK BACKGROUND IMAGE - VISHAL JOGDEV */}
          <div 
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden opacity-10 sm:opacity-20 z-0"
            aria-hidden="true"
          >
            <div className="relative w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden filter grayscale contrast-125 border-2 border-amber-500/30">
              <img
                src={SINGER_PROFILE.watermarkImage}
                alt="Vishal Jogdeo Watermark"
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* LYRICS CONTENT */}
          <div className="relative z-10 space-y-6">
            
            {/* Devanagari Lyrics */}
            <div className="space-y-3">
              <div className={`font-heading text-white space-y-2.5 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
                {lyric.devanagariText.map((line, idx) => (
                  <p 
                    key={idx} 
                    className={line === "" ? "h-3" : "py-0.5 text-white font-bold hover:text-amber-300 transition-colors"}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Roman / English Lyrics (If available) */}
            {lyric.romanText && lyric.romanText.length > 0 && (
              <div className="space-y-3 pt-5 border-t border-stone-800">
                <div className={`font-sans text-stone-300 space-y-2.5 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
                  {lyric.romanText.map((line, idx) => (
                    <p 
                      key={idx} 
                      className={line === "" ? "h-3" : "py-0.5 italic text-stone-300 font-medium hover:text-amber-300 transition-colors"}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 4. MORE DEVOTIONAL LYRICS WITH CLEAN BORDER */}
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
                className="p-3 rounded-2xl bg-[#121218] hover:bg-stone-900 border border-stone-800 cursor-pointer transition-all group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-amber-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-amber-300 uppercase block">{item.category}</span>
                    <h4 className="text-xs font-bold text-white font-heading truncate group-hover:text-amber-300 transition-colors">
                      {item.titleDevanagari}
                    </h4>
                    <p className="text-[11px] text-stone-400 italic truncate">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </>
  );
};
