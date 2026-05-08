import { Game } from "@/types";
import GameCard from "./GameCard";
import AdSlot from "../ads/AdSlot";

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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-render">
      {games.map((game, index) => (
        <div key={game._id} className="contents">
          {/* Insert ad every 12 games */}
          {index > 0 && index % 12 === 0 && (
            <div className="card-animate col-span-1">
              <AdSlot position="native" className="h-full" />
            </div>
          )}
          
          <div className="card-animate">
            <GameCard game={game} />
          </div>
        </div>
      ))}
    </div>
  );
}
