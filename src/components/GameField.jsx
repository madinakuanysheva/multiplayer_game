import React from 'react';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { useRealtimePlayers } from '../hooks/useRealtimePlayers';
import './GameField.css';

const GameField = ({ nickname }) => {
  const {
    players,
    playerId,
    playerColor,
    updatePlayerPosition,
  } = useRealtimePlayers(nickname);

  const playerPosition = usePlayerMovement(playerId, updatePlayerPosition);

  return (
    <div className="game-container">
      <div className="game-board">
        {/* Render current player */}
        <div
          className="player current-player"
          style={{
            left: `${playerPosition.x}px`,
            top: `${playerPosition.y}px`,
            backgroundColor: playerColor,
          }}
        >
          <span className="player-nickname">{nickname}</span>
        </div>
        
        {/* Render other players */}
        {Object.entries(players).map(([id, player]) => {
          if (id === playerId) return null;
          return (
            <div
              key={id}
              className="player"
              style={{
                left: `${player.x}px`,
                top: `${player.y}px`,
                backgroundColor: player.color,
              }}
            >
              <span className="player-nickname">{player.nickname}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameField;
