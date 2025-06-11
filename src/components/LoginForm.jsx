import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      onLogin(nickname.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Multiplayer Game</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your nickname"
            maxLength={15}
            required
          />
          <button type="submit">Join Game</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
