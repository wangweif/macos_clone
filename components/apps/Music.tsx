import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic, MoreHorizontal } from 'lucide-react';

export const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  return (
    <div className="h-full w-full bg-neutral-900 text-white flex flex-col relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/400/400?random=1" 
            className="w-full h-full object-cover opacity-60 blur-3xl scale-150" 
            alt="bg"
          />
          <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col h-full pt-14 px-6 pb-20">
        {/* Header */}
        <div className="flex justify-center mb-6">
           <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Album Art */}
        <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-2xl mb-8 transform transition-transform duration-500 hover:scale-[1.02] shadow-black/50 border border-white/10">
            <img src="https://picsum.photos/400/400?random=1" alt="Album Art" className="w-full h-full object-cover" />
        </div>

        {/* Track Info */}
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold mb-1">Midnight City</h2>
                <p className="text-white/60 text-lg">M83 • Hurry Up, We're Dreaming</p>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Scrubber */}
        <div className="mb-8">
            <div className="h-1.5 bg-white/20 rounded-full w-full mb-2 overflow-hidden cursor-pointer group">
                <div 
                  className="h-full bg-white rounded-full relative" 
                  style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-white/50 font-medium">
                <span>1:24</span>
                <span>4:03</span>
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 px-4">
            <button className="text-white/70 hover:text-white transition-colors">
                <SkipBack size={36} fill="currentColor" />
            </button>
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
                <SkipForward size={36} fill="currentColor" />
            </button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-4 mt-auto">
            <Volume2 size={16} className="text-white/50" />
            <div className="h-1.5 bg-white/20 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-white w-3/4 rounded-full" />
            </div>
            <Volume2 size={24} className="text-white/50" />
        </div>
        
        {/* Bottom Actions */}
        <div className="flex justify-center mt-6 text-red-500">
           <ListMusic size={24} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  );
};