import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Headphones, Search, X, Music, Download, Check, Loader2 } from 'lucide-react';
import { doc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db, isFirestoreAvailable } from '../lib/firebase';
import { Song } from '../types';
import { FEATURED_SONGS } from '../data/mockData';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { SongRowSkeleton } from './SkeletonLoader';
import { downloadMediaFile, sanitizeDownloadFilename } from '../utils/downloadHelper';

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
  const [downloadingSongId, setDownloadingSongId] = useState<string | null>(null);
  const [downloadedSongId, setDownloadedSongId] = useState<string | null>(null);
  const [localDownloads, setLocalDownloads] = useState<Record<string, number>>({});

  // Use Firestore songs if available, else propSongs, else fallback mock songs
  const songsSource: Song[] = (firestoreSongs && firestoreSongs.length > 0)
    ? (firestoreSongs as Song[])
    : (propSongs && propSongs.length > 0 ? propSongs : FEATURED_SONGS);

  const handleDownload = async (song: Song, e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger song play
    if (!song.audioUrl) {
      return;
    }

    const baseTitle = song.title ? `${song.title} - ${song.singerName || 'Vishal Jogdeo'}` : 'Devotional Track - Vishal Jogdeo';
    const fileName = sanitizeDownloadFilename(baseTitle, 'Vishal_Jogdeo_Track', 'mp3');

    const trackDownloadCount = async () => {
      try {
        const storageKey = `vj_dl_${song.id}`;
        const hasCounted = sessionStorage.getItem(storageKey);
        if (!hasCounted && song.id) {
          sessionStorage.setItem(storageKey, 'true');
          
          // Optimistically bump UI counter without double counting
          const baseCount = song.downloads || 0;
          setLocalDownloads(prev => ({
            ...prev,
            [song.id]: Math.max(baseCount + 1, (prev[song.id] || 0) + 1)
          }));

          if (isFirestoreAvailable && db) {
            const songDocRef = doc(db, 'songs', song.id);
            try {
              await updateDoc(songDocRef, {
                downloads: increment(1)
              });
            } catch {
              // Fallback with merge if doc does not exist or requires setDoc
              await setDoc(songDocRef, {
                downloads: increment(1)
              }, { merge: true }).catch(() => {});
            }
          }
        }
      } catch (err) {
        console.warn('Download counter increment notice:', err);
      }
    };

    try {
      setDownloadingSongId(song.id);

      const downloaded = await downloadMediaFile(song.audioUrl, fileName, 'audio');
      
      if (downloaded) {
        // Increment download counter
        await trackDownloadCount();
        setDownloadedSongId(song.id);
        setTimeout(() => setDownloadedSongId(null), 2500);
      }
    } catch (err) {
      console.error('Song download failed:', err);
    } finally {
      setDownloadingSongId(null);
    }
  };

  const formatPlays = (plays?: number) => {
    const count = typeof plays === 'number' ? plays : 0;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1).replace(/\.0$/, '')}M Plays`;
    if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K Plays`;
    return `${count} ${count === 1 ? 'Play' : 'Plays'}`;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredSongs.map((song, idx) => {
                const isThisPlaying = currentSongId === song.id && isPlaying;
                const isDownloading = downloadingSongId === song.id;
                const isDownloaded = downloadedSongId === song.id;
                const hasCover = Boolean(song.coverImage && song.coverImage.trim() !== '');

                return (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
                    onClick={() => onPlaySong(song)}
                    className={`bg-[#121218] border rounded-2xl p-3 sm:p-3.5 transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer shadow-md select-none ${
                      isThisPlaying 
                        ? 'border-amber-500/80 bg-gradient-to-r from-amber-950/30 via-[#161622] to-amber-950/20 ring-1 ring-amber-500/40 shadow-amber-500/10 shadow-lg' 
                        : 'border-stone-800/80 hover:border-amber-500/40 hover:bg-[#161620]'
                    }`}
                  >
                    {/* Left: Artwork / Music Icon */}
                    <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gradient-to-br from-stone-900 via-[#161622] to-amber-950/40 border border-stone-800 group-hover:border-amber-500/40 shadow-md flex items-center justify-center">
                      {hasCover ? (
                        <img
                          src={song.coverImage}
                          alt={song.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/50 text-amber-400">
                          <Music className={`w-6 h-6 sm:w-7 sm:h-7 text-amber-400 drop-shadow transition-transform ${isThisPlaying ? 'scale-110' : 'group-hover:scale-105'}`} />
                        </div>
                      )}
                      
                      {/* Simple, clean playing state indicator */}
                      {isThisPlaying && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                          <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-2" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-4" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center: Song Info */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm sm:text-base font-extrabold font-heading truncate transition-colors ${
                          isThisPlaying ? 'text-amber-400' : 'text-white group-hover:text-amber-300'
                        }`}>
                          {song.title}
                        </h3>
                        {/* Clean Subtle "Playing" Pill */}
                        {isThisPlaying && (
                          <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full shrink-0 animate-pulse">
                            Playing
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 font-semibold truncate">
                        Singer: <strong className="text-amber-300/90">{song.singerName || 'Vishal Jogdeo'}</strong>
                      </p>

                      <div className="flex items-center gap-2 text-[11px] font-medium text-stone-400 pt-0.5">
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <Headphones className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{formatPlays(song.plays)}</span>
                        </span>
                        {song.duration && (
                          <>
                            <span>•</span>
                            <span className="text-stone-400">{song.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Direct Download Icon & Simple Real-time Number */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-9 sm:w-11 gap-0.5">
                      <button
                        onClick={(e) => handleDownload(song, e)}
                        disabled={isDownloading}
                        className={`p-1.5 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-90 ${
                          isDownloaded
                            ? 'text-emerald-400'
                            : isDownloading
                            ? 'text-amber-400 cursor-wait'
                            : 'text-amber-400 hover:text-amber-300 hover:scale-110'
                        }`}
                        title="Download MP3"
                        aria-label="Download Song"
                      >
                        {isDownloading ? (
                          <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                        ) : isDownloaded ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Download className="w-5 h-5 text-amber-400 hover:text-amber-300" />
                        )}
                      </button>
                      <span className="text-[11px] sm:text-xs font-bold text-stone-400 select-none leading-none">
                        {Math.max(song.downloads || 0, localDownloads[song.id] || 0)}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
};
