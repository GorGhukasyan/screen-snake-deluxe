import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface ControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

export const Controls: React.FC<ControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => onDirectionChange('UP')}
        className="control-button"
        aria-label="Move up"
      >
        <ChevronUp className="w-8 h-8" />
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onDirectionChange('LEFT')}
          className="control-button"
          aria-label="Move left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() => onDirectionChange('DOWN')}
          className="control-button"
          aria-label="Move down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
        <button
          onClick={() => onDirectionChange('RIGHT')}
          className="control-button"
          aria-label="Move right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
