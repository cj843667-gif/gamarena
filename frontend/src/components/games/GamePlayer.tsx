"use client";

import { useState, useEffect } from "react";
import { Maximize2, Minimize2, RotateCcw, Monitor, RefreshCcw, Code2, Play, ExternalLink, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import FullscreenLeaderboard from "../ads/FullscreenLeaderboard";

interface GamePlayerProps {
  playUrl: string;
  githubUrl: string;
  title: string;
  standalone?: boolean;
}

export default function GamePlayer({ playUrl, githubUrl, title, standalone }: GamePlayerProps) {
  const [key, setKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reloadGame = () => {
    // H5 Games Ads — Show an ad on game restart (natural break point)
    if (typeof window !== 'undefined' && (window as any).adBreak) {
      (window as any).adBreak({
        type: 'next',
        name: 'game-restart',
        beforeAd: () => {
          console.log('🎬 Restart ad starting...');
        },
        afterAd: () => {
          console.log('✅ Restart ad finished, reloading game...');
        },
        adBreakDone: () => {
          setKey(prev => prev + 1);
        },
      });
    } else {
      setKey(prev => prev + 1);
    }
  };
  
  const handleLaunch = () => {
    window.open(playUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Listen for ESC key to exit custom fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scroll when in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  if (!playUrl) {
    return (
      <div className="aspect-[16/9] w-full bg-primary-lighter rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-white/5 shadow-2xl">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
          <Code2 size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-4 uppercase italic">No Live Demo Available</h3>
        <p className="text-gray-500 max-w-md mb-8 font-medium">
          This game doesn't have a live play URL. You can check the source code and run it locally from GitHub.
        </p>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" icon={Code2}>VIEW SOURCE ON GITHUB</Button>
        </a>
      </div>
    );
  }

  // Standalone Player (for sites that block iframes)
  if (standalone) {
    return (
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary via-primary-light to-primary-lighter rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
        {/* Animated Background Decor */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-accent/40 animate-pulse-slow">
            <Play className="fill-white text-white ml-2" size={48} />
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic tracking-tight">Game is Ready!</h3>
          <p className="text-gray-400 max-w-md mb-10 font-medium leading-relaxed">
            This high-performance game requires a dedicated window for the best experience. Click below to launch in the Vault Portal.
          </p>
          <Button 
            size="lg" 
            className="h-16 px-12 text-xl font-black italic shadow-xl shadow-accent/20" 
            icon={ExternalLink}
            onClick={handleLaunch}
          >
            LAUNCH VAULT PORTAL
          </Button>
          
          <div className="mt-8 flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Secure Connection</span>
            <span className="flex items-center gap-1.5"><Monitor size={14} className="text-accent" /> High Performance</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <div className={`aspect-[16/9] w-full bg-black overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[150] rounded-none !aspect-auto' : 'rounded-2xl'}`}>
          <iframe
            id="game-iframe"
            key={key}
            src={playUrl}
            title={title}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
            allow="fullscreen; autoplay; gamepad"
            loading="lazy"
          />

          {/* Controls Overlay (appears on hover) */}
          <div className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300 ${isFullscreen ? 'opacity-100 bottom-28' : 'opacity-0 group-hover:opacity-100'}`}>
            <button
              onClick={reloadGame}
              className="p-3 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-accent transition-colors shadow-lg"
              title="Reload Game"
            >
              <RefreshCcw size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-accent transition-colors shadow-lg"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>

          {/* ESC hint in fullscreen */}
          {isFullscreen && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Press ESC to exit
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Sticky Bottom Leaderboard Ad */}
      <FullscreenLeaderboard visible={isFullscreen} />

      {!isFullscreen && (
        <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-widest px-2">
          <div className="flex items-center gap-4">
            <button onClick={reloadGame} className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-accent focus:outline-none">
              <RefreshCcw size={14} /> RELOAD GAME
            </button>
          </div>
          <div className="hidden sm:block">
            Trouble playing? <a href={playUrl} target="_blank" className="text-accent hover:underline">Open in new tab</a>
          </div>
        </div>
      )}
    </div>
  );
}
