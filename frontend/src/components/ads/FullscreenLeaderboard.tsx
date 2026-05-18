"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface FullscreenLeaderboardProps {
  visible: boolean;
}

export default function FullscreenLeaderboard({ visible }: FullscreenLeaderboardProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (visible && adRef.current && !pushed.current) {
      pushed.current = true;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense fullscreen leaderboard error:", e);
      }
    }
  }, [visible]);

  // Reset dismissed state when fullscreen toggled
  useEffect(() => {
    if (!visible) {
      setDismissed(false);
    }
  }, [visible]);

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] flex justify-center items-end pointer-events-none"
      style={{ padding: "0 0 8px 0" }}
    >
      <div className="relative pointer-events-auto bg-black/80 backdrop-blur-md rounded-t-xl border border-white/10 shadow-2xl p-2">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-8 right-1 bg-black/70 hover:bg-red-500/80 text-white rounded-full p-1 transition-colors z-10"
          title="Close ad"
        >
          <X size={14} />
        </button>

        {/* Ad label */}
        <div className="absolute -top-5 left-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          Advertisement
        </div>

        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: "728px",
            height: "90px",
          }}
          data-ad-client="ca-pub-8802060779563003"
          data-ad-slot="2035672408"
        ></ins>
      </div>
    </div>
  );
}
