import React from 'react';
import { RotateCcw } from 'lucide-react';

type GameStatus = 'RUNNING' | 'GAME_OVER' | 'PAUSED';

interface StatusPanelProps {
  status: GameStatus;
  snakeLength: number;
  score: number;
  onRestart: () => void;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  status,
  snakeLength,
  score,
  onRestart,
}) => {
  return (
    <div className="status-panel space-y-6">
      {/* Game Status */}
      <div className="text-center">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Status</p>
        <div className={`
          font-arcade text-sm px-4 py-2 rounded-lg inline-block
          ${status === 'RUNNING' 
            ? 'bg-primary/20 text-primary glow-snake' 
            : 'bg-accent/20 text-accent glow-food animate-pulse-slow'
          }
        `}>
          {status === 'RUNNING' ? 'RUNNING' : 'GAME OVER'}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Length</p>
          <p className="font-arcade text-2xl text-primary text-glow">{snakeLength}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Score</p>
          <p className="font-arcade text-2xl text-secondary text-glow">{score}</p>
        </div>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="game-button w-full flex items-center justify-center gap-2 glow-button"
      >
        <RotateCcw className="w-4 h-4" />
        RESTART
      </button>

      {/* Instructions */}
      <div className="text-center text-muted-foreground text-xs">
        <p className="mb-1">Use arrow keys or</p>
        <p>on-screen buttons to play</p>
      </div>
    </div>
  );
};
