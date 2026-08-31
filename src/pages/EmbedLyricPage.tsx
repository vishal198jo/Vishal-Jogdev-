import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ExternalLink,
  Music,
  Share2,
  Check,
  Award,
  Type
} from 'lucide-react';
import { LATEST_LYRICS, FEATURED_SONGS } from '../data/mockData';
import { useFirestoreData } from '../hooks/useFirestoreData';

export const EmbedLyricPage: React.FC = () => {
  const { lyricId } = useParams<{ lyricId: string }>();
  const { lyrics: firestoreLyrics, loading } = useFirestoreData();

  // Reader States
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [copiedLink, setCopiedLink] = useState(false);

  // Anti-Copy & Anti-ContextMenu
  const handleSilentPrevent = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ((e.ctrlKey || e.metaKey) && ['c', 'C', 'a', 'A', 'u', 'U', 's', 'S', 'p', 'P'].includes(e.key)) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Find lyric in Firestore OR fallback to mock lyrics / songs
  const matchedFirestore = firestoreLyrics.find(l => l.id === lyricId);
  const matchedMockLyric = LATEST_LYRICS.find(l => l.id === lyricId || l.songId === lyricId);
  const matchedMockSong = FEATURED_SONGS.find(s => s.id === lyricId || s.lyricsId === lyricId);

  let lyric: {
    id: string;
    title: string;
    titleDevanagari: string;
    composer: string;
    devanagariText: string[];
    romanText: string[];
  } | null = null;

  if (matchedFirestore) {
    lyric = {
      id: matchedFirestore.id,
      title: matchedFirestore.title,
      titleDevanagari: matchedFirestore.titleDevanagari || matchedFirestore.title,
      composer: matchedFirestore.singerName || 'विशाल जोगदेव (Vishal Jogdeo)',
      devanagariText: typeof matchedFirestore.devanagariText === 'string' 
        ? matchedFirestore.devanagariText.split('\n') 
        : (Array.isArray(matchedFirestore.devanagariText) ? matchedFirestore.devanagariText : []),
      romanText: typeof matchedFirestore.romanText === 'string' 
        ? matchedFirestore.romanText.split('\n') 
        : (Array.isArray(matchedFirestore.romanText) ? matchedFirestore.romanText : []),
    };
  } else if (matchedMockLyric) {
    lyric = {
      id: matchedMockLyric.id,
      title: matchedMockLyric.title,
      titleDevanagari: matchedMockLyric.titleDevanagari || matchedMockLyric.title,
      composer: matchedMockLyric.composer || 'विशाल जोगदेव (Vishal Jogdeo)',
      devanagariText: Array.isArray(matchedMockLyric.devanagariText) ? matchedMockLyric.devanagariText : [matchedMockLyric.devanagariText],
      romanText: Array.isArray(matchedMockLyric.romanText) ? matchedMockLyric.romanText : (matchedMockLyric.romanText ? [matchedMockLyric.romanText] : []),
    };
  } else if (matchedMockSong) {
    lyric = {
      id: matchedMockSong.id,
      title: matchedMockSong.title,
      titleDevanagari: matchedMockSong.titleDevanagari || matchedMockSong.title,
      composer: matchedMockSong.composer || 'विशाल जोगदेव (Vishal Jogdeo)',
      devanagariText: [matchedMockSong.titleDevanagari],
      romanText: [matchedMockSong.title],
    };
  }

  const fontClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed font-medium',
    lg: 'text-lg sm:text-xl leading-loose font-bold'
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const handleShareClick = () => {
    const fullUrl = `${window.location.origin}/lyrics/${lyricId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] w-full bg-[#0d0c11] text-stone-100 flex flex-col items-center justify-center p-6 rounded-2xl border border-amber-500/20">
        <div className="w-10 h-10 rounded-full border-3 border-amber-500/20 border-t-amber-500 animate-spin mb-3" />
        <p className="text-xs font-bold text-amber-300 tracking-wider uppercase">Loading Lyrics Widget...</p>
      </div>
    );
  }

  if (!lyric) {
    return (
      <div className="min-h-[350px] w-full bg-[#0d0c11] text-stone-100 flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-amber-500/20">
        <Music className="w-10 h-10 text-amber-500/40 mb-2" />
        <h2 className="text-base font-bold text-white mb-1">Lyric Not Found</h2>
        <p className="text-xs text-stone-400 mb-4 max-w-xs">The requested devotional lyric could not be located in the library.</p>
        <a 
          href="/lyrics" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gold-gradient text-black font-bold text-xs rounded-xl inline-flex items-center gap-1.5 shadow-md hover:opacity-95"
        >
          <span>Explore All Lyrics</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  const originalUrl = `/lyrics/${lyric.id}`;

  return (
    <div className="w-full h-full min-h-screen bg-[#0b0b0e] text-stone-100 p-2.5 sm:p-4 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
      
      {/* PROFESSIONAL EMBED CARD CONTAINER */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#14131a] to-[#0c0b10] border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* TOP ACCENT BAR */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-80" />

        {/* 1. EMBED HEADER */}
        <header className="p-4 sm:p-5 border-b border-stone-800/80 bg-[#121118]/80 backdrop-blur-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Title & Artist Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 shrink-0">
                  <Music className="w-3.5 h-3.5" />
                </span>
                <h1 className="text-lg sm:text-2xl font-extrabold font-heading text-white tracking-wide leading-tight">
                  {lyric.titleDevanagari}
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-serif italic text-amber-300/90 font-medium">
                  {lyric.title}
                </span>
                <span className="text-stone-600">•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-stone-300">
                  <Award className="w-3 h-3 text-amber-400" />
                  गायक: <strong className="text-amber-400 font-bold">विशाल जोगदेव</strong>
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleShareClick}
                className="px-2.5 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-700/60 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                title="Copy Lyrics Link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gold-gradient text-black text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-95 transition-opacity shrink-0"
                title="Open full page on Vishal Jogdeo official portal"
              >
                <span>Full Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Reader Controls: Alignment & Font Size */}
          <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between gap-2 flex-wrap text-xs">
            {/* Text Alignment */}
            <div className="flex items-center gap-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800/80">
              <button
                type="button"
                onClick={() => setTextAlign('left')}
                className={`p-1.5 rounded-md transition-all ${
                  textAlign === 'left' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
                title="Left Align"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTextAlign('center')}
                className={`p-1.5 rounded-md transition-all ${
                  textAlign === 'center' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
                title="Center Align"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTextAlign('right')}
                className={`p-1.5 rounded-md transition-all ${
                  textAlign === 'right' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
                title="Right Align"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size Scaling */}
            <div className="flex items-center gap-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800/80 text-[11px]">
              <span className="px-1 text-stone-500 flex items-center gap-0.5 font-medium">
                <Type className="w-3 h-3" /> Size:
              </span>
              <button
                type="button"
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded font-bold ${
                  fontSize === 'sm' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('md')}
                className={`px-2 py-0.5 rounded font-bold ${
                  fontSize === 'md' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded font-bold ${
                  fontSize === 'lg' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-white'
                }`}
              >
                A+
              </button>
            </div>
          </div>
        </header>

        {/* 2. LYRICS TEXT DISPLAY BODY (WITH WATERMARK & ANTI-COPY) */}
        <div 
          onContextMenu={handleSilentPrevent}
          onCopy={handleSilentPrevent}
          onCut={handleSilentPrevent}
          onDragStart={handleSilentPrevent}
          className="strict-no-copy select-none relative flex-1 p-5 sm:p-8 overflow-y-auto min-h-[350px] flex flex-col justify-start"
        >
          {/* WATERMARK BACKGROUND */}
          <div 
            className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
            aria-hidden="true"
          >
            <img
              src="https://cnd.vishaljogdeo.com/IMG_4246.PNG"
              alt="Vishal Jogdeo Watermark"
              className="w-full h-full object-cover object-top opacity-90 filter contrast-105 select-none pointer-events-none"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = 'https://cdn.vishaljogdeo.com/IMG_4246.PNG';
                }
              }}
            />
            <div className="absolute inset-0 bg-[#0e0d14]/30 pointer-events-none" />
          </div>

          {/* LYRICS TEXT CONTENT */}
          <div className="relative z-10 space-y-6 strict-no-copy select-none max-w-2xl mx-auto w-full">
            
            {/* Devanagari text */}
            <div className={`font-heading text-white space-y-2 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
              {lyric.devanagariText.map((line, idx) => (
                line === "" ? (
                  <div key={idx} className="my-2 h-2" />
                ) : (
                  <p 
                    key={idx} 
                    className="py-0.5 text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors select-none"
                  >
                    {line}
                  </p>
                )
              ))}
            </div>

            {/* Roman text if present */}
            {lyric.romanText && lyric.romanText.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-amber-500/20">
                <div className={`font-sans text-stone-200 space-y-1.5 whitespace-pre-line tracking-wide transition-all ${fontClasses[fontSize]} ${alignClasses[textAlign]}`}>
                  {lyric.romanText.map((line, idx) => (
                    line === "" ? (
                      <div key={idx} className="my-1.5 h-2" />
                    ) : (
                      <p 
                        key={idx} 
                        className="py-0.5 italic text-stone-200 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] select-none"
                      >
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 3. VERIFIED FOOTER BRANDING */}
        <footer className="p-3 sm:px-5 bg-[#0a0a0d] border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Devotional Lyrics • <strong className="text-amber-400">Vishal Jogdeo</strong></span>
          </div>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline transition-colors"
          >
            <span>vishaljogdeo.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </footer>

      </div>

    </div>
  );
};
