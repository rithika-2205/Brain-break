import React from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🧩 BrainBreaks</h1>
      <p>Choose a game to test your brain!</p>
      <div className="game-grid">
        <button onClick={() => navigate("/simon")}>🎵 Simon Game</button>
        <button onClick={() => navigate("/tictactoe")}>❌ Tic Tac Toe</button>
        <button onClick={() => navigate("/trivia")}>🧠 Trivia Quiz</button>
      </div>
      <button onClick={() => navigate("/leaderboard")}>🏆 View Leaderboard</button>
    </div>
  );
}

export default Home;


