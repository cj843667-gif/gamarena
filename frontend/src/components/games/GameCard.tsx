import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const stars = game.stars > 1000 ? `${(game.stars / 1000).toFixed(1)}k` : game.stars;

  return (
    <Link href={`/game/${game.slug}`} className="game-card block gpu">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-card)]">
        <Image
          src={game.thumbnail && (game.thumbnail.startsWith('http') || game.thumbnail.startsWith('/')) ? game.thumbnail : '/placeholder-game.svg'}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />

        {/* Play overlay — pure CSS */}
        <div className="play-overlay">
          <div className="play-btn" />
        </div>

        {/* Stars badge — no icon import */}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-bold text-yellow-400">
          ⭐ {stars}
        </div>

        {/* Verified badge */}
        {game.verified && (
          <div className="absolute top-2 left-2 bg-green-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            ✓
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-bold text-sm text-[var(--text-primary)] leading-tight line-clamp-1">
          {game.title}
        </h3>
        <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide mt-1 block">
          {game.category}
        </span>
      </div>
    </Link>
  );
}
