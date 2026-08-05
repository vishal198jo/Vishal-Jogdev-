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
      <SEO title="Devotional Songs Audio Catalog" description="Listen to 120+ authentic Marathi Abhangas, classical Bhajans, sacred Aartis, and Kirtans sung by Vishal Jogdeo." keywords="Devotional Songs, Abhanga Audio, Marathi Bhajan Player, Vishal Jogdeo Songs, Vitthal Songs" />
      <div className="pt-28 sm:pt-32 space-y-10 pb-16">
      {/* Page Header */}
      <div className="bg-[#FDFCFB] border-b border-stone-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-widest">
            <Music2 className="w-3.5 h-3.5" />
            <span>Official Audio Player</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-stone-900">
            Devotional <span className="font-serif italic text-amber-900 font-normal">Songs Catalog</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Listen to 120+ soul-stirring Abhangas, classical Bhajans, sacred Aartis, and Kirtans performed by Vishal Jogdeo.
          </p>
        </div>
      </div>

      <FeaturedSongs
        onPlaySong={onPlaySong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onOpenLyrics={onOpenLyrics}
      />
    </div>
  </>
  );
};
