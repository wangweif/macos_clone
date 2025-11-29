import React, { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon, RotateCcw, Zap } from 'lucide-react';

export const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Camera access denied or unavailable.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (flash) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Viewfinder */}
      <div className="flex-1 relative overflow-hidden rounded-3xl mt-12 mx-2 mb-24 bg-gray-900">
         {error ? (
           <div className="absolute inset-0 flex items-center justify-center text-white/50 p-6 text-center">
             {error}
           </div>
         ) : (
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             muted 
             className="w-full h-full object-cover"
           />
         )}
         {flash && <div className="absolute inset-0 bg-white z-20 animate-out fade-out duration-200" />}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-black/40 backdrop-blur-xl flex items-center justify-around px-8 pb-6">
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <Zap size={20} fill={flash ? "currentColor" : "none"} />
        </button>
        
        <button 
          onClick={handleCapture}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
        >
            <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition-transform duration-100" />
        </button>
        
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <RotateCcw size={20} />
        </button>
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10 flex justify-center pt-8">
        <span className="text-yellow-400 font-medium text-xs bg-black/30 px-2 py-1 rounded-full backdrop-blur-md">PHOTO</span>
      </div>
    </div>
  );
};