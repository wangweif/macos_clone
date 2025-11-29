import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const DynamicIsland = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div 
      className={`absolute top-2 left-1/2 -translate-x-1/2 bg-black rounded-[2rem] transition-all duration-500 ease-spring z-50 flex items-center justify-between px-3
      ${isExpanded ? 'w-[200px] h-[35px]' : 'w-[120px] h-[35px]'}`}
    >
      <div className="w-1/3 h-full flex items-center justify-start overflow-hidden">
          {isExpanded && <div className="w-1 h-4 bg-white/20 rounded-full animate-pulse ml-2" />}
      </div>
      <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-4 bg-black rounded-full" /> {/* Camera cutout simulation */}
      </div>
      <div className="w-1/3 h-full flex items-center justify-end overflow-hidden">
          {isExpanded && <div className="w-4 h-4 rounded-full border-2 border-green-500/50 animate-pulse mr-1" />}
      </div>
    </div>
  );
};

export const StatusBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute top-0 left-0 right-0 h-12 flex justify-between items-center px-6 z-40 text-white text-sm font-semibold pointer-events-none mix-blend-difference">
            <div className="w-20 pl-2">
                {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s[AP]M/, '')}
            </div>
            <div className="flex items-center space-x-2 w-20 justify-end pr-2">
                <Signal size={14} />
                <Wifi size={14} />
                <div className="relative">
                    <Battery size={20} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[6px] bg-white rounded-[1px]" />
                </div>
            </div>
        </div>
    );
};

export const AppIcon = ({ icon, label, onClick, color }: any) => {
    return (
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={onClick}>
            <div 
              className={`w-[64px] h-[64px] rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-active:scale-90 ${color}`}
            >
                {icon}
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">{label}</span>
        </div>
    );
};

export const HomeBar = ({ onClick }: { onClick: () => void }) => (
    <div 
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-48 h-10 z-[100] flex items-end justify-center cursor-pointer pb-2 group"
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        {/* Uses mix-blend-difference to be visible on both white (Photos/Safari) and black (Settings) backgrounds */}
        <div className="w-32 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] mix-blend-difference opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
);