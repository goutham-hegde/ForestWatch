'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200); // 1.2s for slight extra polish
  };

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans tracking-tight select-none">
      {/* 3D Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Drone (Background) */}
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-200 ease-out scale-110"
          style={{ 
            backgroundImage: 'url("/images/drone.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
            filter: 'blur(10px)',
          }}
        />
        
        {/* Layer 2: Satellite (Prominent Middle) */}
        <div 
          className="absolute inset-0 opacity-70 transition-transform duration-300 ease-out scale-100"
          style={{ 
            backgroundImage: 'url("/images/satellite.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
            filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.8))',
          }}
        />

        {/* Layer 3: IoT Sensor (Foreground) */}
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-90 transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: 'url("/images/iot.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)`,
          }}
        />
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505]/40 z-10" />

      {/* Content */}
      <div className={`relative z-20 text-center px-6 max-w-4xl transition-all duration-700 ${isLaunching ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="p-3 bg-slate-800 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-slate-700">
            <Activity size={40} className="text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-white tracking-widest uppercase opacity-80">ForestWatch</span>
        </div>

        <h1 className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter">
          404<span className="text-emerald-500 tracking-normal">MANOVA</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          Autonomous forest fire surveillance system.
          <br />High-fidelity data fusion from Space, Air, and Soil.
        </p>

        <button 
          onClick={handleLaunch}
          disabled={isLaunching}
          className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black text-xl font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] cursor-pointer"
        >
          <span className="relative z-10">Launch Command Center</span>
          <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-2" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Team Credits */}
        <div className="mt-24 flex items-center justify-center gap-8 opacity-40">
          <div className="h-px w-12 bg-white" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-white">404MANOVA Technical Division</span>
          <div className="h-px w-12 bg-white" />
        </div>
      </div>

      {/* Initialization Sequence Overlay */}
      {isLaunching && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center animate-initialization">
          <div 
            className="absolute inset-0 opacity-60 scale-animation"
            style={{ 
              backgroundImage: 'url("/images/satellite.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl font-black text-white tracking-[0.2em] uppercase">Initializing</h2>
              <p className="text-emerald-500/80 font-mono text-sm tracking-widest animate-pulse">Syncing Satellite Assets...</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-progress" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes initialization {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes scale-up {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-initialization {
          animation: initialization 0.5s ease-out forwards;
        }
        .animate-progress {
          animation: progress 1.2s linear forwards;
        }
        .scale-animation {
          animation: scale-up 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

