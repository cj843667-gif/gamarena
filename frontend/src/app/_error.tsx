'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-4 tracking-tight">
        Something <span className="text-accent">Went Wrong</span>
      </h2>
      <p className="text-gray-400 font-bold max-w-md mb-10 text-lg">
        An unexpected error occurred in the arena. Our team has been notified.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-10 py-4 bg-white text-black font-black uppercase italic rounded-2xl hover:scale-105 transition-transform"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="px-10 py-4 bg-accent text-black font-black uppercase italic rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
