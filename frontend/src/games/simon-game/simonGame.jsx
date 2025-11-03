import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const colors = ['red', 'blue', 'green', 'yellow'];

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    addToSequence();
  };

  const addToSequence = () => {
    const newColor = colors[Math.floor(Math.random() * 4)];
    setSequence([...sequence, newColor]);
  };

  const handleClick = (color) => {
    if (gameOver) return;
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      axios.post('http://localhost:5000/api/games/simon', { username: username || 'Player', score })
        .then(() => navigate('/leaderboard'))
        .catch(err => console.log(err));
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      setPlayerSequence([]);
      setTimeout(addToSequence, 1000);
    }
  };

  return (
    <div>
      <h2>Simon Game</h2>
      {!username && !sequence.length && (
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <div>
        <p>Score: {score}</p>
        {gameOver && <p>Game Over! Final Score: {score}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 100px)' }}>
          {colors.map(color => (
            <button
              key={color}
              style={{ width: '100px', height: '100px', backgroundColor: color, margin: '5px' }}
              onClick={() => handleClick(color)}
            />
          ))}
        </div>
        {!sequence.length && !gameOver && <button onClick={startGame}>Start</button>}
        {gameOver && <button onClick={startGame}>Restart</button>}
      </div>
    </div>
  );
};

export default SimonGame;