import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, onDisconnect, remove } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCsAAsuyPLAtHo_Ydlvw86xpxEKP7KLkmE",
  authDomain: "multiplayer-game-55414.firebaseapp.com",
  databaseURL: "https://multiplayer-game-55414-default-rtdb.firebaseio.com",
  projectId: "multiplayer-game-55414",
  storageBucket: "multiplayer-game-55414.firebasestorage.app",
  messagingSenderId: "419177375082",
  appId: "1:419177375082:web:40c166b93850684f707113",
  measurementId: "G-TYTLV0ELZ8"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const analytics = getAnalytics(app);

export const MOVEMENT_SPEED = 4;
export const BOARD_WIDTH = 800;
export const BOARD_HEIGHT = 600;

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { ref, onValue, set, onDisconnect, remove };
