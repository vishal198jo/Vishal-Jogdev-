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
    <section id="songs" className="py-8 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#121218] border border-stone-800 rounded-full shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-black shadow-md scale-105'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
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
                className="bg-[#121218] border border-stone-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group shadow-xl"
              >
                {/* Banner & Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-stone-900 border-b border-stone-800">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      {song.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-stone-300 text-[10px] font-medium border border-stone-800">
                      {song.language}
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(song.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-stone-300 hover:text-red-500 transition-colors border border-stone-800"
                    aria-label="Like Song"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Big Play Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onPlaySong(song)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
                        isThisPlaying
                          ? 'bg-gold-gradient text-black ring-4 ring-amber-500/30'
                          : 'bg-gold-gradient text-black'
                      }`}
                      aria-label={`Play ${song.title}`}
                    >
                      {isThisPlaying ? (
                        <Volume2 className="w-5 h-5 text-black animate-bounce" />
                      ) : (
                        <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
                      )}
                    </button>
                  </div>

                  {/* Duration Chip */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-300 border border-amber-500/20">
                    {song.duration}
                  </span>
                </div>

                {/* Song Meta Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider mb-1">
                      {song.album} {song.raga ? `• Raga ${song.raga}` : ''}
                    </p>
                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-300 font-sans mt-0.5">
                      {song.titleDevanagari}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
                    <span>Singer: <strong className="text-stone-200 font-medium">Vishal Jogdeo</strong></span>
                    <span className="text-amber-400 font-semibold">{(song.plays / 1000000).toFixed(1)}M Plays</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onPlaySong(song)}
                      className="py-2.5 px-3 bg-gold-gradient text-black font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>{isThisPlaying ? 'Playing' : 'Play Song'}</span>
                    </button>

                    <button
                      onClick={() => song.lyricsId && onSelectLyrics(song.lyricsId)}
                      className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-xs rounded-full border border-stone-800 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
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

