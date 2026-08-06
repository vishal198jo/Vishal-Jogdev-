import React from 'react';
import { LatestLyrics } from '../components/LatestLyrics';
import { SEO } from '../components/SEO';

interface LyricsPageProps {
  onPlaySong?: (songId: string) => void;
  selectedLyricId?: string | null;
}

export const LyricsPage: React.FC<LyricsPageProps> = ({
  onPlaySong,
  selectedLyricId
}) => {
  return (
    <>
      <SEO title="Devotional Song Lyrics Library | Marathi Devanagari & English" description="Explore authentic Marathi Devanagari and English transliterated lyrics of Sant Tukaram, Dnyaneshwar, and Namdev Abhangas sung by Vishal Jogdeo." keywords="Devotional Lyrics, Marathi Abhanga Lyrics, Devanagari Lyrics, Sant Sahitya, Vishal Jogdeo Lyrics" />
      <div className="pt-20 pb-12 bg-[#0b0b0e] text-stone-100 min-h-screen">
      <LatestLyrics
        selectedLyricIdFromParent={selectedLyricId}
        onPlaySong={onPlaySong}
        hideHeader={false}
      />
    </div>
  </>
  );
};
