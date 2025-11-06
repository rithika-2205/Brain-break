import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("Enter your username and press Start");
  const navigate = useNavigate();

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // ✅ Check for a winner or draw
  const checkWinner = (board) => {
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : "Draw";
  };

  // ✅ Simple bot move
  const botMove = (newBoard) => {
    const emptyIndices = newBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = "O";
    setBoard([...newBoard]);
    setIsPlayerTurn(true);
  };

  // ✅ Handle player click
  const handleClick = (index) => {
    if (!gameStarted || board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // ✅ Game logic with winner posting
  useEffect(() => {
    if (!gameStarted) return;

    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setMessage(result === "Draw" ? "It's a Draw!" : `${result} Wins!`);

      const gameResult = {
        player1: username || "Player",
        player2: "Bot",
        winner:
          result === "Draw"
            ? "draw"
            : result === "X"
            ? "player1"
            : "player2",
      };

      axios
        .post("http://localhost:5000/api/games/tictactoe", gameResult)
        .then(() => navigate("/leaderboard"))
        .catch((err) => console.error("Error posting result:", err));

      setGameStarted(false);
    } else if (!isPlayerTurn) {
      setTimeout(() => botMove([...board]), 500);
    }
  }, [board, isPlayerTurn]);

  // ✅ Start Game
  const startGame = () => {
    if (!username.trim()) {
      setMessage("⚠️ Please enter a username first!");
      return;
    }
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
    setGameStarted(true);
    setMessage("Your turn!");
  };

  // ✅ Reset Game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
    setGameStarted(false);
    setMessage("Enter your username and press Start");
  };

  return (
    <div className="ttt-container">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter name"
          disabled={gameStarted}
        />
      </label>
      <br />
      {!gameStarted && !winner && (
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      )}

      <div className="board">
        {board.map((cell, idx) => (
          <div key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="game-end">
          <h3>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}</h3>
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="leaderboard-button"
          >
            View Leaderboard
          </button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
