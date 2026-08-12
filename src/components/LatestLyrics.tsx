import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { Lyric } from '../types';
import { LATEST_LYRICS } from '../data/mockData';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { LyricsSkeleton } from './SkeletonLoader';

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
  const navigate = useNavigate();
  const { lyrics: firestoreLyrics, loading } = useFirestoreData();

  // Map Firestore lyrics or fallback to empty if Firestore is empty
  const rawLyricsList = firestoreLyrics;

  const activeLyrics = rawLyricsList.map(fl => ({
    id: fl.id,
    title: fl.title,
    titleDevanagari: fl.titleDevanagari || fl.title,
    composer: fl.singerName || 'Vishal Jogdeo',
    category: fl.category || 'Abhanga',
    language: fl.language || 'Marathi',
    publishedDate: fl.publishedDate || '',
    coverImage: fl.coverImage || 'https://images.unsplash.com/photo-1609102026400-3d082725832a?q=80&w=800&auto=format&fit=crop',
    meaningSummary: fl.meaningSummary || fl.metaDescription || '',
    devanagariText: typeof fl.devanagariText === 'string' ? fl.devanagariText.split('\n') : (Array.isArray(fl.devanagariText) ? fl.devanagariText : []),
    romanText: typeof fl.romanText === 'string' ? fl.romanText.split('\n') : (Array.isArray(fl.romanText) ? fl.romanText : []),
    views: typeof fl.views === 'number' ? fl.views : 0,
  }));

  const filteredLyrics = activeLyrics.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleDevanagari.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            <p className="text-xs sm:text-sm text-amber-200/80 font-sans">
              महानुभाव पंथ भजनसम्राट व सुप्रसिद्ध भक्तीगीत गायक विशाल जोगदेव यांच्या लोकप्रिय अभंग, भजने आणि भावगीतांचे अधिकृत शब्दसंग्रह.
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

        {/* 4. Lyrics Content Cards Grid */}
        <div className="pt-2">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <LyricsSkeleton />
              <LyricsSkeleton />
              <LyricsSkeleton />
            </div>
          ) : filteredLyrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLyrics.map((lyric) => (
                <div
                  key={lyric.id}
                  onClick={() => navigate(`/lyrics/${lyric.id}`)}
                  className="p-5 rounded-3xl bg-[#121218] border border-stone-800 shadow-xl hover:border-amber-500/60 cursor-pointer transition-all flex items-center justify-between group hover:bg-[#161620]"
                >
                  <div className="space-y-2 min-w-0 flex-1 pr-3">
                    <div className="space-y-0.5">
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-amber-300 transition-colors truncate">
                        {lyric.titleDevanagari}
                      </h3>
                      <p className="text-xs text-stone-400 font-serif italic truncate">
                        {lyric.title}
                      </p>
                    </div>

                    <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold">
                      <div className="text-amber-400 flex items-center gap-1.5">
                        <span>गायक:</span>
                        <span className="text-stone-200">विशाल जोगदेव</span>
                      </div>
                      {typeof lyric.views === 'number' && lyric.views > 0 && (
                        <div className="text-stone-400 flex items-center gap-1">
                          <span>{lyric.views} Reads</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-stone-900 group-hover:bg-amber-400 flex items-center justify-center shrink-0 transition-colors border border-stone-800 shadow-md">
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs sm:text-sm text-stone-400 font-sans bg-[#121218] rounded-3xl border border-stone-800 shadow-xl">
              No song lyrics match your search.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
