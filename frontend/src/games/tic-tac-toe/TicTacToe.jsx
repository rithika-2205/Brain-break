import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  // Bot makes a random move after player's turn
  useEffect(() => {
    if (!isXNext && !gameOver && !calculateWinner(board) && board.includes(null)) {
      const timer = setTimeout(() => {
        const availableMoves = board
          .map((cell, index) => (cell === null ? index : null))
          .filter(index => index !== null);
        if (availableMoves.length > 0) {
          const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          const newBoard = [...board];
          newBoard[randomMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);

          const winner = calculateWinner(newBoard);
          if (winner || !newBoard.includes(null)) {
            setGameOver(true);
            const result = {
              player1: player1 || 'Player',
              player2: 'Bot',
              winner: winner ? (winner === 'X' ? 'player1' : 'player2') : 'draw',
            };
            axios.post('http://localhost:5000/api/games/tictactoe', result)
              .then(() => navigate('/leaderboard'))
              .catch(err => console.log(err));
          }
        }
      }, 500); // Delay for bot move to feel natural
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameOver, player1, navigate]);

  const handleClick = (index) => {
    if (board[index] || gameOver || !isXNext || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const winner = calculateWinner(newBoard);
    if (winner || !newBoard.includes(null)) {
      setGameOver(true);
      const result = {
        player1: player1 || 'Player',
        player2: 'Bot',
        winner: winner ? (winner === 'X' ? 'player1' : 'player2') : 'draw',
      };
      axios.post('http://localhost:5000/api/games/tictactoe', result)
        .then(() => navigate('/leaderboard'))
        .catch(err => console.log(err));
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const status = gameOver
    ? calculateWinner(board)
      ? `Winner: ${calculateWinner(board) === 'X' ? player1 || 'Player' : 'Bot'}`
      : 'Draw'
    : `Your turn${player1 ? `, ${player1}` : ''} (X)`;

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {!player1 && !gameOver && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>
      )}
      <div>{status}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
        {board.map((square, index) => (
          <button
            key={index}
            style={{ width: '100px', height: '100px', fontSize: '24px', cursor: square || !isXNext || gameOver ? 'default' : 'pointer' }}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
          setGameOver(false);
        }}
        style={{ marginTop: '10px' }}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;