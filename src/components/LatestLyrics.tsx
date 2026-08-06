import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  BookOpen,
  Disc
} from 'lucide-react';
import { Lyric } from '../types';
import { LATEST_LYRICS } from '../data/mockData';

interface LatestLyricsProps {
  onSelectLyric?: (lyric: Lyric) => void;
  onPlaySong?: (songId: string) => void;
  selectedLyricIdFromParent?: string | null;
  hideHeader?: boolean;
}

export const LatestLyrics: React.FC<LatestLyricsProps> = ({ 
  hideHeader = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigate = useNavigate();

  const categories = ['All', 'Bhajan', 'Aarti', 'Stotra', 'Kirtan'];

  const filteredLyrics = LATEST_LYRICS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleDevanagari.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.album.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="lyrics" className="py-10 sm:py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. Header: Devotional Lyrics Library */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Devotional Lyrics Library <span className="font-serif italic text-gold-gradient font-normal">By Vishal Jogdeo</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Complete Marathi Devanagari transliterations with font zooming and audio previews.
            </p>
          </div>
        )}

        {/* 2. Border Line */}
        <div className="border-b border-stone-800 w-full" />

        {/* 3. Search Bar */}
        <div className="max-w-xl mx-auto w-full">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search song title or Marathi lyrics..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#121218] border border-stone-800 text-stone-100 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors shadow-lg"
            />
          </div>
        </div>

        {/* 4. Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-black shadow-md scale-105'
                  : 'bg-[#121218] text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 5. Lyrics Content Cards Grid */}
        <div className="pt-2">
          {filteredLyrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLyrics.map((lyric) => (
                <div
                  key={lyric.id}
                  onClick={() => navigate(`/lyrics/${lyric.id}`)}
                  className="p-4 rounded-3xl bg-[#121218] border border-stone-800 shadow-xl hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                    <img
                      src={lyric.coverImage}
                      alt={lyric.title}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-amber-500/30 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30">
                          {lyric.category}
                        </span>
                        <span className="text-[11px] text-stone-400 truncate flex items-center gap-1">
                          <Disc className="w-3 h-3 text-amber-400" />
                          <span>{lyric.album}</span>
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold font-heading text-white group-hover:text-amber-300 transition-colors truncate">
                        {lyric.titleDevanagari}
                      </h3>
                      <p className="text-xs text-stone-400 font-serif italic truncate">
                        {lyric.title}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-stone-900 group-hover:bg-amber-400 flex items-center justify-center shrink-0 transition-colors border border-stone-800">
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs sm:text-sm text-stone-400 font-sans bg-[#121218] rounded-3xl border border-stone-800 shadow-xl">
              No song lyrics match your search or category filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
