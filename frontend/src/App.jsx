import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SimonGame from './games/simon-game/simonGame';
import TicTacToe from './games/tic-tac-toe/TicTacToe';
import TriviaQuiz from './games/trivia-quiz/triviaQuiz';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simon" element={<SimonGame />} />
          <Route path='/tictactoe' element={<TicTacToe/>}/>
          <Route path="/trivia" element={<TriviaQuiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
