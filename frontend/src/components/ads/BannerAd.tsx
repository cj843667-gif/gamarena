"use client";

import { useEffect, useRef } from "react";

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = "" }: BannerAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error("AdSense banner error:", e);
      }
    }
  }, []);

  return (
    <div className={`w-full my-4 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "90px" }}
        data-ad-client="ca-pub-8802060779563003"
        data-ad-slot="6184190034"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
