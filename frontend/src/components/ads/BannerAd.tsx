"use client";

import { useEffect } from "react";

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = "" }: BannerAdProps) {
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === "true";

  useEffect(() => {
    if (showAds) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense banner error:", e);
      }
    }
  }, [showAds]);

  if (!showAds) return null;

  return (
    <div className={`w-full my-4 flex justify-center ${className}`}>
      <ins
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
