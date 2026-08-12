import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, Heart, Headphones, Search, X } from 'lucide-react';
import { Song } from '../types';
import { FEATURED_SONGS, SINGER_PROFILE } from '../data/mockData';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { SongRowSkeleton } from './SkeletonLoader';

interface FeaturedSongsProps {
  onPlaySong: (song: Song) => void;
  onSelectLyrics?: (lyricsId: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
  songs?: Song[];
}

export const FeaturedSongs: React.FC<FeaturedSongsProps> = ({
  onPlaySong,
  currentSongId,
  isPlaying,
  songs: propSongs
}) => {
  const { songs: firestoreSongs, loading } = useFirestoreData();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedSongIds, setLikedSongIds] = useState<Record<string, boolean>>({});

  // Use Firestore songs if available, else propSongs, else fallback mock songs
  const songsSource: Song[] = (firestoreSongs && firestoreSongs.length > 0)
    ? (firestoreSongs as Song[])
    : (propSongs && propSongs.length > 0 ? propSongs : FEATURED_SONGS);

  const toggleLike = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSongIds(prev => ({
      ...prev,
      [songId]: !prev[songId]
    }));
  };

  const formatPlays = (plays?: number) => {
    if (!plays || plays === 0) return '12+ Plays';
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M Plays`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}k Plays`;
    return `${plays} Plays`;
  };

  // Filter songs based on search query
  const filteredSongs = songsSource.filter(song => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      song.title?.toLowerCase().includes(q) ||
      song.singerName?.toLowerCase().includes(q)
    );
  });

  return (
    <section id="songs" className="py-4 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search song title or singer name..."
              className="w-full bg-[#121218] border border-stone-800 focus:border-amber-500/80 rounded-full py-2.5 pl-11 pr-10 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all shadow-md focus:ring-1 focus:ring-amber-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-white transition-colors"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Skeleton Loading State */}
        {loading && (!firestoreSongs || firestoreSongs.length === 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SongRowSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Search Results Empty State */}
            {filteredSongs.length === 0 && (
              <div className="text-center py-12 bg-[#121218] border border-stone-800/80 rounded-2xl max-w-md mx-auto p-6 space-y-2">
                <p className="text-stone-300 text-sm font-semibold">No songs found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-amber-400 hover:underline font-bold"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Songs List Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredSongs.map((song, idx) => {
                const isThisPlaying = currentSongId === song.id && isPlaying;
                const isLiked = likedSongIds[song.id];
                const coverArt = song.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200';

                return (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    onClick={() => onPlaySong(song)}
                    className={`bg-[#121218] border rounded-2xl p-3 sm:p-3.5 transition-all duration-300 flex items-center justify-between gap-3 group cursor-pointer shadow-lg hover:shadow-amber-500/10 ${
                      isThisPlaying 
                        ? 'border-amber-500/80 bg-amber-950/20 ring-1 ring-amber-500/30' 
                        : 'border-stone-800/80 hover:border-amber-500/40 hover:bg-[#161622]'
                    }`}
                  >
                    {/* Left: Small Square Image Thumbnail with Equalizer Wave Overlay */}
                    <div className="relative shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-md">
                      <img
                        src={coverArt}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        {isThisPlaying ? (
                          <div className="bg-black/70 p-2 rounded-full border border-amber-500/50 flex items-center justify-center">
                            <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
                              <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                              <span className="w-0.5 bg-amber-400 rounded-full animate-eq-2" />
                              <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                              <span className="w-0.5 bg-amber-400 rounded-full animate-eq-4" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 bg-black/60 text-amber-400 border border-amber-500/40">
                            <Play className="w-4 h-4 fill-amber-400 ml-0.5 text-amber-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center: Song Info & Equalizer Wave */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors truncate">
                          {song.title}
                        </h3>
                        {/* Live Animated Equalizer Wave next to title when playing */}
                        {isThisPlaying && (
                          <div className="hidden sm:flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 shrink-0">
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-2" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-4" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 font-semibold truncate">
                        Singer: <strong className="text-amber-300">{song.singerName || 'Vishal Jogdeo'}</strong>
                      </p>

                      <div className="flex items-center gap-1.5 pt-0.5 text-[11px] font-bold text-emerald-400">
                        <Headphones className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{formatPlays(song.plays)}</span>
                      </div>
                    </div>

                    {/* Right: Play Button & Like */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => toggleLike(song.id, e)}
                        className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-red-500 transition-colors"
                        title="Like Song"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySong(song);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                          isThisPlaying
                            ? 'bg-amber-400 text-black font-extrabold'
                            : 'bg-gold-gradient text-black hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isThisPlaying ? (
                          <Volume2 className="w-3.5 h-3.5 text-black animate-bounce" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-black" />
                        )}
                        <span className="hidden sm:inline">{isThisPlaying ? 'Playing' : 'Play'}</span>
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Streaming Callout */}
        <div className="py-6 px-6 text-center max-w-xl mx-auto space-y-3 bg-[#121218] border border-amber-500/20 rounded-3xl shadow-xl mt-8">
          <div className="w-10 h-10 mx-auto bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shadow-md">
            <Play className="w-5 h-5 text-amber-400 fill-amber-400 ml-0.5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-heading">Official Music Streaming Services</h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              Listen to complete devotional tracks performed by <strong>Vishal Jogdeo</strong> on Spotify and YouTube Music.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a 
              href={SINGER_PROFILE.contact.socials.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.26c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.24zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.18-1.2.78-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z"/>
              </svg>
              <span>Spotify</span>
            </a>
            <a 
              href={SINGER_PROFILE.contact.socials.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
