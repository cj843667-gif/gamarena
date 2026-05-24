"use client";

import { useEffect, useRef } from "react";

interface SidebarAdProps {
  variant: "rectangle" | "halfpage";
  className?: string;
  sticky?: boolean;
}

const SIDEBAR_ADS = {
  rectangle: {
    slot: "8887031538",
    width: 300,
    height: 250,
    label: "gamarena-sidebar-rectangle",
  },
  halfpage: {
    slot: "6923213176",
    width: 300,
    height: 600,
    label: "gamarena-sidebar-halfpage",
  },
};

export default function SidebarAd({ variant, className = "", sticky }: SidebarAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      pushed.current = true;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error(`AdSense ${variant} error:`, e);
      }
    }
  }, [variant]);

  const config = SIDEBAR_ADS[variant];

  return (
    <div
      className={`flex justify-center ${className}`}
      style={{
        width: "100%",
        minHeight: `${config.height}px`,
        overflow: "hidden",
        position: sticky ? "sticky" : "relative",
        top: sticky ? "96px" : undefined,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={
          variant === "rectangle"
            ? { display: "block" }
            : {
                display: "inline-block",
                width: `${config.width}px`,
                height: `${config.height}px`,
              }
        }
        data-ad-client="ca-pub-8802060779563003"
        data-ad-slot={config.slot}
        data-ad-format={variant === "rectangle" ? "auto" : undefined}
      ></ins>
    </div>
  );
}
