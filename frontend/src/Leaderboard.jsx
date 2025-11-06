import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './leaderboard.css'

const Leaderboard = () => {
  const [triviaScores, setTriviaScores] = useState([]);
  const [ticTacToeResults, setTicTacToeResults] = useState([]);
  const [simonScores, setSimonScores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz/leaderboard')
      .then(res => setTriviaScores(res.data))
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/api/games/tictactoe')
      .then(res => setTicTacToeResults(res.data))
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/api/games/simon')
      .then(res => setSimonScores(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>

      <h3>Trivia Quiz</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {triviaScores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
              <td>{score.category}</td>
              <td>{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Tic Tac Toe (vs. Bot)</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Opponent</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ticTacToeResults.map(result => (
            <tr key={result._id}>
              <td>{result.player1}</td>
              <td>{result.player2}</td>
              <td>
                {result.winner === 'player1' ? `${result.player1} Wins` : 
                 result.winner === 'player2' ? 'Bot Wins' : 'Draw'}
              </td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Simon Game</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {simonScores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
              <td>{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;