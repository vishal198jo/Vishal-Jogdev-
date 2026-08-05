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
    <section id="lyrics" className="py-10 sm:py-12 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* 1. Header: Devotional Lyrics Library */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-stone-900">
              Devotional Lyrics Library <span className="font-serif italic font-normal text-amber-900">By Vishal Jogdeo</span>
            </h2>
          </div>
        )}

        {/* 2. Border Line */}
        <div className="border-b border-stone-200 w-full" />

        {/* 3. Search Bar */}
        <div className="max-w-xl mx-auto w-full">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search song title or Marathi lyrics..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-800 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* 4. Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
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
                  className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-700/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                    <img
                      src={lyric.coverImage}
                      alt={lyric.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/60">
                          {lyric.category}
                        </span>
                        <span className="text-[11px] text-stone-400 truncate flex items-center gap-1">
                          <Disc className="w-3 h-3 text-stone-300" />
                          <span>{lyric.album}</span>
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold font-heading text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {lyric.titleDevanagari}
                      </h3>
                      <p className="text-xs text-stone-500 font-serif italic truncate">
                        {lyric.title}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-amber-100/80 flex items-center justify-center shrink-0 transition-colors">
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs sm:text-sm text-stone-500 font-sans bg-white rounded-2xl border border-stone-200">
              No song lyrics match your search or category filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
