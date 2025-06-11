import { useState, useEffect, useCallback } from 'react';
import { database, ref, onValue, set, onDisconnect, remove } from '../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomColor } from '../services/firebase';

export const useRealtimePlayers = (nickname) => {
  const [players, setPlayers] = useState({});
  const [playerId] = useState(() => uuidv4());
  const [playerColor] = useState(generateRandomColor);
  const [error, setError] = useState(null);

  // Update player position in Firebase
  const updatePlayerPosition = useCallback(async (position) => {
    try {
      const playerRef = ref(database, `players/${playerId}`);
      await set(playerRef, {
        x: position.x,
        y: position.y,
        color: playerColor,
        nickname,
        lastSeen: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error updating player position:', err);
      setError('Failed to update position');
    }
  }, [playerId, playerColor, nickname]);

  useEffect(() => {
    if (!nickname) return;

    let unsubscribe = null;
    const playerRef = ref(database, `players/${playerId}`);

    const setupPlayer = async () => {
      try {
        // Initial player setup
        await set(playerRef, {
          x: 400, // Center of the board
          y: 300,
          color: playerColor,
          nickname,
          lastSeen: new Date().toISOString(),
        });

        // Set up disconnect handler
        onDisconnect(playerRef).remove();

        // Set up real-time subscription
        const playersRef = ref(database, 'players');
        unsubscribe = onValue(playersRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Filter out players that haven't updated in the last 5 seconds
            const now = new Date().getTime();
            const activePlayers = Object.entries(data).reduce((acc, [id, player]) => {
              const lastSeen = new Date(player.lastSeen).getTime();
              if (now - lastSeen < 5000) { // 5 seconds threshold
                acc[id] = player;
              }
              return acc;
            }, {});
            setPlayers(activePlayers);
          }
        }, (error) => {
          console.error('Error in real-time subscription:', error);
          setError('Failed to sync with other players');
        });
      } catch (err) {
        console.error('Error setting up player:', err);
        setError('Failed to join the game');
      }
    };

    setupPlayer();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      remove(playerRef).catch(console.error);
    };
  }, [playerId, playerColor, nickname]);

  return {
    players,
    playerId,
    playerColor,
    updatePlayerPosition,
    error,
  };
};
