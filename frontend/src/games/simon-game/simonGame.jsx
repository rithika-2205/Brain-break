import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const colors = ["red", "blue", "green", "yellow"];

function SimonGame() {
  const [gamePattern, setGamePattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState("Enter your username and start the game!");
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // ✅ Function to play a sound based on color
  const playSound = (color) => {
    const audio = new Audio(`/sounds/${color}.mp3`);
    audio.play().catch(() => console.warn("Audio playback failed"));
  };

  // ✅ Animate a button flash
  const animateButton = (color) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 150);
    }
    playSound(color);
  };

  // ✅ Display the full color sequence
  const displaySequence = async (sequence) => {
    setIsAnimating(true);
    setMessage("Watch the pattern...");
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          animateButton(sequence[i]);
          resolve();
        }, 600);
      });
    }
    setIsAnimating(false);
    setMessage("Your turn!");
  };

  // ✅ Move to next level
  const nextSequence = () => {
    setUserPattern([]);
    const randomChosenColor = colors[Math.floor(Math.random() * 4)];
    const newPattern = [...gamePattern, randomChosenColor];
    setGamePattern(newPattern);
    setLevel((prev) => prev + 1);
    setMessage(`Level ${level + 1}`);
    setTimeout(() => displaySequence(newPattern), 500);
  };

  // ✅ Handle button clicks
  const handleClick = (color) => {
    if (level === 0 || isAnimating || gameOver) return;
    animateButton(color);
    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);
    checkAnswer(newUserPattern.length - 1, newUserPattern);
  };

  // ✅ Check the player’s answer
  const checkAnswer = (currentIndex, newUserPattern) => {
    if (gamePattern[currentIndex] === newUserPattern[currentIndex]) {
      if (newUserPattern.length === gamePattern.length) {
        setTimeout(() => nextSequence(), 1000);
      }
    } else {
      const audio = new Audio("/sounds/wrong.mp3");
      audio.play();
      document.body.classList.add("wrong-class");
      setMessage("Wrong! Game Over.");
      setTimeout(() => {
        document.body.classList.remove("wrong-class");
      }, 800);
      setGameOver(true);
      postScore();
    }
  };

  // ✅ Post score to backend
  const postScore = () => {
    const score = level-1;
    axios
      .post("http://localhost:5000/api/games/simon", {
        username: username || "Player",
        score,
      })
      .then(() => console.log("Score saved"))
      .catch((err) => console.error("Error saving score:", err));
  };

  // ✅ Start button
  const startGame = () => {
    if (!username.trim()) {
      setMessage("⚠️ Please enter your username first!");
      return;
    }
    setLevel(0);
    setGamePattern([]);
    setUserPattern([]);
    setGameOver(false);
    setMessage("Level 1");
    setTimeout(() => nextSequence(), 500);
  };

  const handleRestart = () => {
    setLevel(0);
    setGamePattern([]);
    setUserPattern([]);
    setGameOver(false);
    setMessage("Press Start to play again!");
  };

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="simon-container">
      <h1>{message}</h1>
      <h2>Level: {level}</h2>

      {/* ✅ Username input */}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </label>

      {/* ✅ Buttons grid */}
      <div className="button-grid">
        {colors.map((color) => (
          <button
            key={color}
            id={color}
            className={`color-button ${color}`}
            style={{height: '200px'}}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>

      {/* ✅ Game options */}
      {!level && !gameOver && (
        <button onClick={startGame} className="option-button start-btn">
          Start Game
        </button>
      )}

      {gameOver && (
        <div className="game-options">
          <button onClick={handleRestart} className="option-button">
            Play Again
          </button>
          <button onClick={handleViewLeaderboard} className="option-button">
            View Leaderboard
          </button>
        </div>
      )}
    </div>
  );
}

export default SimonGame;
