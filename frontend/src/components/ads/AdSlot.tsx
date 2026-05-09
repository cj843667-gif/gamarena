"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  position: "game_sidebar" | "game_bottom" | "skyscraper_left" | "skyscraper_right" | "rectangular";
  className?: string;
  sticky?: boolean;
}

const AD_CONFIG = {
  // Vertical placement (below game, banners)
  game_bottom: {
    slot: "7007913005",
    format: "autorelaxed",
    style: { display: "block" } as React.CSSProperties,
    containerClass: "w-full min-h-[90px] my-6",
  },
  // Rectangular (sidebar, in-content)
  game_sidebar: {
    slot: "8590861526",
    format: "autorelaxed",
    style: { display: "block" } as React.CSSProperties,
    containerClass: "w-full min-h-[250px]",
  },
  rectangular: {
    slot: "8590861526",
    format: "autorelaxed",
    style: { display: "block" } as React.CSSProperties,
    containerClass: "w-full min-h-[250px]",
  },
  // Skyscraper 1 (responsive)
  skyscraper_left: {
    slot: "9908646778",
    format: "auto",
    style: { display: "block" } as React.CSSProperties,
    containerClass: "w-full min-h-[250px]",
  },
  // Skyscraper 2 (responsive)
  skyscraper_right: {
    slot: "9908646778",
    format: "auto",
    style: { display: "block" } as React.CSSProperties,
    containerClass: "w-full min-h-[250px]",
  },
};

export default function AdSlot({ position, className = "", sticky }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);


  const config = AD_CONFIG[position];
  if (!config) return null;

  return (
    <div
      className={`relative overflow-hidden ${config.containerClass} ${className} ${sticky ? 'sticky top-24' : ''}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client="ca-pub-8802060779563003"
        data-ad-slot={config.slot}
        {...(config.format ? { "data-ad-format": config.format } : {})}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
