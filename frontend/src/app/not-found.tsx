import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-black text-white/10 italic uppercase tracking-tighter absolute -z-10 select-none">
        404
      </h1>
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-4 tracking-tight">
        Game <span className="text-accent">Over</span>
      </h2>
      <p className="text-gray-400 font-bold max-w-md mb-10 text-lg">
        The page you are looking for has been moved or doesn't exist in our arena.
      </p>
      <Link 
        href="/" 
        className="px-10 py-4 bg-accent text-black font-black uppercase italic rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.3)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
