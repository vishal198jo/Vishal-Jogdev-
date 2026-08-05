import React from 'react';
import { LatestLyrics } from '../components/LatestLyrics';
import { useSEO } from '../hooks/useSEO';

interface LyricsPageProps {
  onPlaySong?: (songId: string) => void;
  selectedLyricId?: string | null;
}

export const LyricsPage: React.FC<LyricsPageProps> = ({
  onPlaySong,
  selectedLyricId
}) => {
  useSEO({
    title: "Devotional Song Lyrics Library | Marathi Devanagari & English",
    description: "Explore authentic Marathi Devanagari and English transliterated lyrics of Sant Tukaram, Dnyaneshwar, and Namdev Abhangas sung by Vishal Jogdeo.",
    keywords: "Devotional Lyrics, Marathi Abhanga Lyrics, Devanagari Lyrics, Sant Sahitya, Vishal Jogdeo Lyrics"
  });

  return (
    <div className="pt-20 pb-12 bg-[#FDFCFB]">
      <LatestLyrics
        selectedLyricIdFromParent={selectedLyricId}
        onPlaySong={onPlaySong}
        hideHeader={false}
      />
    </div>
  );
};
