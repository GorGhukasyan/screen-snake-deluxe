import React from 'react';

type Position = { x: number; y: number };

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
  const cellSize = 100 / gridSize;

  return (
    <div className="relative w-full aspect-square bg-grid-bg rounded-lg overflow-hidden border-2 border-border shadow-2xl">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}% ${cellSize}%`,
        }}
      />

      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={`snake-${index}`}
          className="absolute rounded-sm transition-all duration-75"
          style={{
            left: `${segment.x * cellSize}%`,
            top: `${segment.y * cellSize}%`,
            width: `${cellSize}%`,
            height: `${cellSize}%`,
            backgroundColor: `hsl(142 100% ${50 - index * 0.5}%)`,
            boxShadow: index === 0 
              ? '0 0 15px hsl(142 100% 50% / 0.8), inset 0 0 5px hsl(142 100% 70% / 0.5)' 
              : '0 0 8px hsl(142 100% 50% / 0.4)',
            transform: 'scale(0.9)',
          }}
        >
          {/* Snake head eyes */}
          {index === 0 && (
            <>
              <div 
                className="absolute w-1.5 h-1.5 bg-background rounded-full"
                style={{ top: '20%', left: '20%' }}
              />
              <div 
                className="absolute w-1.5 h-1.5 bg-background rounded-full"
                style={{ top: '20%', right: '20%' }}
              />
            </>
          )}
        </div>
      ))}

      {/* Food */}
      <div
        className="absolute rounded-full animate-food-pulse"
        style={{
          left: `${food.x * cellSize}%`,
          top: `${food.y * cellSize}%`,
          width: `${cellSize}%`,
          height: `${cellSize}%`,
          backgroundColor: 'hsl(var(--food))',
          boxShadow: '0 0 20px hsl(0 100% 60% / 0.8), 0 0 40px hsl(0 100% 60% / 0.4)',
          transform: 'scale(0.7)',
        }}
      />
    </div>
  );
};
