import React, { useState } from 'react';
import GameField from './components/GameField';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [nickname, setNickname] = useState('');

  const handleLogin = (name) => {
    setNickname(name);
  };

  return (
    <div className="App">
      {!nickname ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <GameField nickname={nickname} />
      )}
    </div>
  );
}

export default App;
