import { Game } from "@/types";
import GameCard from "./GameCard";
import BannerAd from "../ads/BannerAd";

interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
}

export default function GameGrid({ games, isLoading }: GameGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="skeleton aspect-[4/3] rounded-xl" />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl border border-[var(--border)]" style={{ background: 'var(--bg-card)' }}>
        <h3 className="text-xl font-bold" style={{ color: 'var(--text-secondary)' }}>No games found</h3>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  // Split games into chunks of 8 (2 rows of 4) for banner ad insertion
  const rowSize = 8;
  const chunks: Game[][] = [];
  for (let i = 0; i < games.length; i += rowSize) {
    chunks.push(games.slice(i, i + rowSize));
  }

  return (
    <div>
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
          {/* Game cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-render">
            {chunk.map((game) => (
              <div key={game._id} className="card-animate">
                <GameCard game={game} />
              </div>
            ))}
          </div>

          {/* Banner ad after every 2 rows (8 games), except after the last chunk */}
          {chunkIndex < chunks.length - 1 && (
            <BannerAd />
          )}
        </div>
      ))}
    </div>
  );
}
