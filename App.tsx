import React, { useState, useEffect } from 'react';
import { Camera, Music, Settings, Mic, Lock, Unlock, Chrome, Image } from 'lucide-react';
import { StatusBar, DynamicIsland, AppIcon, HomeBar } from './components/SystemComponents';
import { Siri } from './components/apps/Siri';
import { CameraApp } from './components/apps/Camera';
import { MusicApp } from './components/apps/Music';
import { SettingsApp } from './components/apps/Settings';
import { AppDefinition } from './types';

// Mock Apps Configuration
const APPS: AppDefinition[] = [
    { id: 'settings', name: 'Settings', icon: <Settings size={32} />, component: <SettingsApp />, color: 'bg-gray-500' },
    { id: 'music', name: 'Music', icon: <Music size={32} />, component: <MusicApp />, color: 'bg-red-500' },
    { id: 'camera', name: 'Camera', icon: <Camera size={32} />, component: <CameraApp />, color: 'bg-zinc-800' },
    { id: 'siri', name: 'Siri', icon: <Mic size={32} />, component: null, color: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 'photos', name: 'Photos', icon: <Image size={32} />, component: <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Photos Gallery</div>, color: 'bg-white text-blue-500' },
    { id: 'safari', name: 'Safari', icon: <Chrome size={32} />, component: <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Safari Browser</div>, color: 'bg-blue-400' },
];

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isSiriOpen, setIsSiriOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appId: string) => {
    if (appId === 'siri') {
      setIsSiriOpen(true);
    } else {
      setActiveAppId(appId);
    }
  };

  const closeApp = () => {
    setActiveAppId(null);
    setIsSiriOpen(false);
  };

  const activeApp = APPS.find(app => app.id === activeAppId);

  return (
    <div className="min-h-screen w-full bg-[#111] flex items-center justify-center p-4 md:p-8">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[400px] aspect-[9/19.5] bg-black rounded-[3.5rem] shadow-2xl border-[8px] border-[#222] ring-1 ring-white/20 overflow-hidden select-none">
        
        {/* Wallpaper */}
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
            style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
                transform: activeAppId ? 'scale(0.95)' : 'scale(1)' 
            }}
        >
            <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* System UI */}
        <StatusBar />
        <DynamicIsland isExpanded={Boolean(activeAppId) || isSiriOpen} />

        {/* Lock Screen */}
        <div 
          className={`absolute inset-0 z-30 flex flex-col items-center pt-24 text-white backdrop-blur-sm transition-transform duration-700 ease-in-out ${
            isLocked ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={() => setIsLocked(false)}
        >
            <Lock size={32} className="mb-4 text-white/70" />
            <div className="text-7xl font-thin tracking-tight mb-2">
                {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}
            </div>
            <div className="text-xl font-medium text-white/80 mb-8">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            
            <div className="mt-auto mb-10 animate-pulse flex flex-col items-center text-white/50 text-sm">
                <span className="mb-2">Click to Unlock</span>
                <div className="w-1 h-20 bg-white/20 rounded-full" />
            </div>
            
            {/* Quick Actions */}
            <div className="absolute bottom-12 w-full px-12 flex justify-between">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                    <div className="w-6 h-6 bg-white rounded-full opacity-80" /> {/* Flashlight */}
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Camera size={20} />
                </div>
            </div>
        </div>

        {/* Home Screen */}
        <div className={`absolute inset-0 z-10 pt-20 px-6 transition-all duration-500 ${isLocked ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="grid grid-cols-4 gap-x-4 gap-y-8">
                {APPS.map(app => (
                    <AppIcon 
                        key={app.id} 
                        icon={app.icon} 
                        label={app.name} 
                        color={app.color} 
                        onClick={() => handleAppClick(app.id)} 
                    />
                ))}
            </div>

            {/* Dock */}
            <div className="absolute bottom-6 left-4 right-4 h-24 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-around px-4">
                {APPS.slice(0, 4).map(app => (
                    <AppIcon 
                        key={`dock-${app.id}`} 
                        icon={app.icon} 
                        label="" 
                        color={app.color} 
                        onClick={() => handleAppClick(app.id)} 
                    />
                ))}
            </div>
        </div>

        {/* Active App Window */}
        <div 
          className={`absolute inset-0 z-20 bg-black transition-all duration-500 ease-out ${
            activeAppId ? 'translate-y-0 rounded-none' : 'translate-y-full rounded-[3rem] scale-95'
          }`}
        >
             {activeApp && activeApp.component}
        </div>

        {/* Siri Overlay */}
        <Siri isOpen={isSiriOpen} onClose={() => setIsSiriOpen(false)} />

        {/* Home Bar (Navigation) */}
        {!isLocked && <HomeBar onClick={closeApp} />}

      </div>
    </div>
  );
}