import { useState, useCallback, useEffect, useRef } from 'react';
import { MOVEMENT_SPEED, BOARD_WIDTH, BOARD_HEIGHT } from '../services/firebase';

export const usePlayerMovement = (playerId, updatePosition) => {
  const [position, setPosition] = useState({
    x: BOARD_WIDTH / 2,
    y: BOARD_HEIGHT / 2,
  });

  const keysPressed = useRef(new Set());
  const lastUpdateTime = useRef(Date.now());

  const handleKeyDown = useCallback((e) => {
    if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      keysPressed.current.add(e.key.toLowerCase());
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    keysPressed.current.delete(e.key.toLowerCase());
  }, []);

  // Movement update loop
  useEffect(() => {
    const updateMovement = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateTime.current;
      lastUpdateTime.current = now;

      // Calculate movement based on pressed keys
      const newPosition = { ...position };
      let moved = false;

      // Calculate movement speed based on delta time for smooth movement
      const speed = MOVEMENT_SPEED * (deltaTime / 16); // 16ms is roughly 60fps

      if (keysPressed.current.has('w')) {
        newPosition.y = Math.max(0, newPosition.y - speed);
        moved = true;
      }
      if (keysPressed.current.has('s')) {
        newPosition.y = Math.min(BOARD_HEIGHT - 4, newPosition.y + speed);
        moved = true;
      }
      if (keysPressed.current.has('a')) {
        newPosition.x = Math.max(0, newPosition.x - speed);
        moved = true;
      }
      if (keysPressed.current.has('d')) {
        newPosition.x = Math.min(BOARD_WIDTH - 4, newPosition.x + speed);
        moved = true;
      }

      if (moved) {
        setPosition(newPosition);
        updatePosition(newPosition);
      }
    };

    const animationFrame = requestAnimationFrame(function gameLoop() {
      updateMovement();
      requestAnimationFrame(gameLoop);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position, updatePosition]);

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return position;
};
