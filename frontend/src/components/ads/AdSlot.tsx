"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  position: "game_sidebar" | "game_bottom" | "skyscraper_left" | "skyscraper_right" | "rectangular";
  className?: string;
  sticky?: boolean;
}

const AD_CONFIG: Record<string, { slot: string; format: string; minHeight: string }> = {
  game_bottom: { slot: "7007913005", format: "autorelaxed", minHeight: "90px" },
  game_sidebar: { slot: "8590861526", format: "autorelaxed", minHeight: "250px" },
  rectangular: { slot: "8590861526", format: "autorelaxed", minHeight: "250px" },
  skyscraper_left: { slot: "9908646778", format: "auto", minHeight: "250px" },
  skyscraper_right: { slot: "9908646778", format: "auto", minHeight: "250px" },
};

export default function AdSlot({ position, className = "", sticky }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      pushed.current = true;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, []);

  const config = AD_CONFIG[position];
  if (!config) return null;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        minHeight: config.minHeight,
        overflow: "hidden",
        position: sticky ? "sticky" as const : "relative" as const,
        top: sticky ? "96px" : undefined,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-8802060779563003"
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
