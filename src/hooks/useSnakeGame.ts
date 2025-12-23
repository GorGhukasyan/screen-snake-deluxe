import { useState, useCallback, useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameStatus = 'RUNNING' | 'GAME_OVER' | 'PAUSED';

const GRID_SIZE = 32;
const INITIAL_SPEED = 120;

const getRandomPosition = (snake: Position[]): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
};

const getInitialSnake = (): Position[] => {
  const centerX = Math.floor(GRID_SIZE / 2);
  const centerY = Math.floor(GRID_SIZE / 2);
  return [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
  ];
};

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(getInitialSnake);
  const [food, setFood] = useState<Position>(() => getRandomPosition(getInitialSnake()));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [status, setStatus] = useState<GameStatus>('RUNNING');
  const [score, setScore] = useState(0);
  
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef<Direction | null>(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const moveSnake = useCallback(() => {
    if (status !== 'RUNNING') return;

    setSnake(currentSnake => {
      const currentDirection = nextDirectionRef.current || directionRef.current;
      if (nextDirectionRef.current) {
        setDirection(nextDirectionRef.current);
        nextDirectionRef.current = null;
      }

      const head = currentSnake[0];
      let newHead: Position;

      switch (currentDirection) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setStatus('GAME_OVER');
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setStatus('GAME_OVER');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(getRandomPosition(newSnake));
        setScore(s => s + 1);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [status, food]);

  const changeDirection = useCallback((newDirection: Direction) => {
    const currentDir = nextDirectionRef.current || directionRef.current;
    
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[currentDir] !== newDirection) {
      nextDirectionRef.current = newDirection;
    }
  }, []);

  const restart = useCallback(() => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setFood(getRandomPosition(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = null;
    setStatus('RUNNING');
    setScore(0);
  }, []);

  // Game loop
  useEffect(() => {
    if (status !== 'RUNNING') return;

    const gameLoop = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameLoop);
  }, [status, moveSnake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection]);

  return {
    snake,
    food,
    status,
    score,
    snakeLength: snake.length,
    changeDirection,
    restart,
    gridSize: GRID_SIZE,
  };
};
