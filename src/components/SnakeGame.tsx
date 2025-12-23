import React from 'react';
import { GameBoard } from './GameBoard';
import { Controls } from './Controls';
import { StatusPanel } from './StatusPanel';
import { useSnakeGame } from '../hooks/useSnakeGame';

export const SnakeGame: React.FC = () => {
  const {
    snake,
    food,
    status,
    score,
    snakeLength,
    changeDirection,
    restart,
    gridSize,
  } = useSnakeGame();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="font-arcade text-2xl md:text-4xl text-center mb-8 text-primary text-glow tracking-wider">
          SNAKE
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
          {/* Game Board */}
          <div className="w-full max-w-md lg:max-w-lg flex-shrink-0">
            <GameBoard snake={snake} food={food} gridSize={gridSize} />
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <StatusPanel
              status={status}
              snakeLength={snakeLength}
              score={score}
              onRestart={restart}
            />
            
            {/* Controls */}
            <div className="status-panel">
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 text-center">
                Controls
              </p>
              <Controls onDirectionChange={changeDirection} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-8">
          Eat the <span className="text-accent">red food</span> to grow • Avoid hitting walls and yourself
        </p>
      </div>
    </div>
  );
};
