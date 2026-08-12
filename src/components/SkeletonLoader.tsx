import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="bg-[#121218] border border-stone-800 rounded-3xl p-5 space-y-4 animate-pulse">
    <div className="w-full h-40 bg-stone-900 rounded-2xl"></div>
    <div className="space-y-2">
      <div className="h-4 bg-stone-800 rounded w-3/4"></div>
      <div className="h-3 bg-stone-900 rounded w-1/2"></div>
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-8 bg-stone-800 rounded-full w-24"></div>
      <div className="h-8 bg-stone-900 rounded-full w-20"></div>
    </div>
  </div>
);

export const LyricsSkeleton: React.FC = () => (
  <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 space-y-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-stone-900 rounded-2xl"></div>
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-stone-800 rounded w-1/3"></div>
        <div className="h-3 bg-stone-900 rounded w-1/4"></div>
      </div>
    </div>
    <div className="space-y-2 pt-2">
      <div className="h-3 bg-stone-900 rounded w-full"></div>
      <div className="h-3 bg-stone-900 rounded w-5/6"></div>
      <div className="h-3 bg-stone-900 rounded w-4/6"></div>
    </div>
  </div>
);

export const SliderSkeleton: React.FC = () => (
  <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#121218] border border-stone-800 rounded-2xl animate-pulse flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
);

export const SongRowSkeleton: React.FC = () => (
  <div className="bg-[#121218] border border-stone-800/80 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 animate-pulse">
    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-stone-900 shrink-0"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-stone-800 rounded w-2/3"></div>
      <div className="h-3 bg-stone-900 rounded w-1/3"></div>
      <div className="h-3 bg-stone-900 rounded w-1/4"></div>
    </div>
    <div className="w-16 h-8 bg-stone-900 rounded-xl shrink-0"></div>
  </div>
);
