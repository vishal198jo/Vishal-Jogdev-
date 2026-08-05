import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Music, Disc, Filter, Volume2, Share2, Heart } from 'lucide-react';
import { Song } from '../types';
import { FEATURED_SONGS } from '../data/mockData';

interface FeaturedSongsProps {
  onPlaySong: (song: Song) => void;
  onSelectLyrics: (lyricsId: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

export const FeaturedSongs: React.FC<FeaturedSongsProps> = ({
  onPlaySong,
  onSelectLyrics,
  currentSongId,
  isPlaying
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedSongIds, setLikedSongIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Bhajan', 'Aarti', 'Stotra', 'Kirtan'];

  const filteredSongs = selectedCategory === 'All' 
    ? FEATURED_SONGS 
    : FEATURED_SONGS.filter(s => s.category === selectedCategory);

  const toggleLike = (songId: string) => {
    setLikedSongIds(prev => ({
      ...prev,
      [songId]: !prev[songId]
    }));
  };

  return (
    <section id="songs" className="py-12 bg-[#FDFCFB] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-8 border-b border-stone-200 pb-4"
        >
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 border border-stone-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-stone-50 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song, idx) => {
            const isThisPlaying = currentSongId === song.id && isPlaying;
            const isLiked = likedSongIds[song.id];

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-stone-200 hover:border-amber-800 overflow-hidden transition-all duration-300 flex flex-col group"
              >
                {/* Banner & Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-stone-100 border-b border-stone-200">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-stone-900 border border-stone-200 text-[10px] font-bold">
                      {song.category}
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-stone-700 text-[10px] font-medium">
                      {song.language}
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(song.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-red-600 transition-colors"
                    aria-label="Like Song"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                  </button>

                  {/* Big Play Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onPlaySong(song)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 ${
                        isThisPlaying
                          ? 'bg-amber-900 text-stone-50 ring-4 ring-amber-900/20'
                          : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                      }`}
                      aria-label={`Play ${song.title}`}
                    >
                      {isThisPlaying ? (
                        <Volume2 className="w-5 h-5 text-stone-50 animate-bounce" />
                      ) : (
                        <Play className="w-5 h-5 fill-stone-50 ml-0.5 text-stone-50" />
                      )}
                    </button>
                  </div>

                  {/* Duration Chip */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-stone-900/80 text-[10px] font-mono text-stone-200">
                    {song.duration}
                  </span>
                </div>

                {/* Song Meta Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider mb-1">
                      {song.album} {song.raga ? `• Raga ${song.raga}` : ''}
                    </p>
                    <h3 className="text-lg font-bold text-stone-900 font-heading group-hover:text-amber-900 transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-900 font-sans mt-0.5">
                      {song.titleDevanagari}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
                    <span>Singer: <strong className="text-stone-800 font-medium">Vishal Jogdeo</strong></span>
                    <span>{(song.plays / 1000000).toFixed(1)}M Plays</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onPlaySong(song)}
                      className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-stone-50" />
                      <span>{isThisPlaying ? 'Playing' : 'Play Song'}</span>
                    </button>

                    <button
                      onClick={() => song.lyricsId && onSelectLyrics(song.lyricsId)}
                      className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>View Lyrics</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

