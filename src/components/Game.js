import React, { useState, useEffect, useCallback } from 'react';
import { database, MOVEMENT_SPEED, BOARD_WIDTH, BOARD_HEIGHT, generateRandomColor } from '../services/firebase';
import { ref, set, onValue, remove, onDisconnect, off } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import './Game.css';

const Game = () => {
  const [players, setPlayers] = useState({});
  const [playerId] = useState(() => uuidv4());
  const [playerColor] = useState(generateRandomColor());
  const [playerPosition, setPlayerPosition] = useState({
    x: BOARD_WIDTH / 2,
    y: BOARD_HEIGHT / 2,
  });

  const updatePlayerPosition = useCallback(async (position) => {
    const playerRef = ref(database, `players/${playerId}`);
    await set(playerRef, {
      x: position.x,
      y: position.y,
      color: playerColor,
      lastSeen: new Date().toISOString(),
    });
  }, [playerId, playerColor]);

  const handleKeyDown = useCallback((e) => {
    setPlayerPosition((prevPos) => {
      let newX = prevPos.x;
      let newY = prevPos.y;

      switch (e.key.toLowerCase()) {
        case 'w':
          newY = Math.max(0, prevPos.y - MOVEMENT_SPEED);
          break;
        case 's':
          newY = Math.min(BOARD_HEIGHT - 4, prevPos.y + MOVEMENT_SPEED);
          break;
        case 'a':
          newX = Math.max(0, prevPos.x - MOVEMENT_SPEED);
          break;
        case 'd':
          newX = Math.min(BOARD_WIDTH - 4, prevPos.x + MOVEMENT_SPEED);
          break;
        default:
          return prevPos;
      }

      updatePlayerPosition({ x: newX, y: newY });
      return { x: newX, y: newY };
    });
  }, [updatePlayerPosition]);

  useEffect(() => {
    const playerRef = ref(database, `players/${playerId}`);

    set(playerRef, {
      x: playerPosition.x,
      y: playerPosition.y,
      color: playerColor,
      lastSeen: new Date().toISOString(),
    });

    onDisconnect(playerRef).remove();

    const playersRef = ref(database, 'players');
    const handleValue = (snapshot) => {
      const data = snapshot.val();
      setPlayers(data || {});
    };

    onValue(playersRef, handleValue);

    return () => {
      off(playersRef, 'value', handleValue);
      remove(playerRef);
    };
  }, [playerId, playerColor]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="game-container">
      <div className="game-board">
        {/* Render other players */}
        {Object.entries(players).map(([id, player]) => {
          return (
            <div
              key={id}
              className={`player${id === playerId ? ' current-player' : ''}`}
              style={{
                left: `${player.x}px`,
                top: `${player.y}px`,
                backgroundColor: player.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
