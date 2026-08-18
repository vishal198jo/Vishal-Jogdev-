import React from 'react';
import { motion } from 'motion/react';
import { Music2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0b0e] text-white select-none">
      {/* Golden Devotional Glowing Lights in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative flex flex-col items-center space-y-6 max-w-xs text-center z-10">
        {/* Animated Rotating Mandala / Aura effect */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
            className="absolute w-16 h-16 rounded-full border border-amber-500/40 border-t-amber-400"
          />
          <div className="relative w-10 h-10 rounded-full bg-stone-900 border border-amber-500/50 flex items-center justify-center shadow-lg">
            <Music2 className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Text Greeting & Status */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold font-heading tracking-wide text-white">
            विशाल जोगदेव
          </h2>
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-extrabold">
            स्वर साधना (Vocal Devotion)
          </p>
          <div className="pt-2 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
