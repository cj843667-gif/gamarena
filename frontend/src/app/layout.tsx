import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAMARENA | Play 1000+ Free Browser Games - No Login Required",
  description: "Browse and play premium HTML5 games for free on GAMARENA. Full-screen experience, zero downloads, and mobile friendly. The ultimate open-source games portal.",
  keywords: "gamarena, h5games, free browser games, open source games, play online, arcade games",
  verification: {
    google: "afA5vgMnXiKLp7GnKZ5C7jV4jy9kCcM_vZqvt0cCs6A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LQKDJXNYEE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LQKDJXNYEE');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8802060779563003"
          crossOrigin="anonymous"
        />
        <Script id="adsense-config" strategy="afterInteractive">
          {`
            window.adsbygoogle = window.adsbygoogle || [];
            window.adConfig = function(o) {adsbygoogle.push({google_ad_modality: 'interstitial', ...o});};
            window.adBreak = function(o) {adsbygoogle.push(o);};
          `}
        </Script>
      </body>
    </html>
  );
}
