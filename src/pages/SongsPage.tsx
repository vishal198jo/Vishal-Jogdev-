import React from 'react';
import { FeaturedSongs } from '../components/FeaturedSongs';
import { Song } from '../types';
import { Music2 } from 'lucide-react';
import { SEO } from '../components/SEO';

interface SongsPageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onOpenLyrics?: (songId: string) => void;
}

export const SongsPage: React.FC<SongsPageProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onOpenLyrics
}) => {
  return (
    <>
      <SEO 
        title="Vishal Jogdeo Song Collection & Music Playlist | Official Audio Tracks" 
        description="Listen to all popular Vishal Jogdeo songs, devotional music, Marathi Abhangas, Mahanubhav Panth Bhajans, and audio tracks performed by Vishal Jogdeo (Vishal Jogdev)." 
        keywords="Vishal Jogdeo Song, Vishal Jogdeo music, Vishal Jogdeo Songs, Vishal Jogdeo Devotional Music, Vishal Jogdeo Audio Tracks, Vishal Jogdeo Spotify, Vishal Jogdeo MP3, Vishal Jogdeo Bhajan, Vishal Jogdev" 
      />
      <div className="pt-20 sm:pt-24 space-y-10 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-[#121218] border-b border-amber-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <Music2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Audio Player</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Devotional <span className="font-serif italic text-gold-gradient font-normal">Songs Catalog</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Listen to 120+ soul-stirring Abhangas, classical Bhajans, sacred Aartis, and Kirtans performed by Vishal Jogdeo.
          </p>
        </div>
      </div>

      <FeaturedSongs
        onPlaySong={onPlaySong}
        currentSongId={currentSong?.id}
        isPlaying={isPlaying}
        onSelectLyrics={(lyricsId) => onOpenLyrics?.(lyricsId)}
      />
    </div>
  </>
  );
};
