const express = require('express');
const router = express.Router();
const TicTacToeResult = require('../models/TicTacToe');
const SimonScore = require('../models/SimonScore');

// Post Tic Tac Toe result
router.post('/tictactoe', async (req, res) => {
  const result = new TicTacToeResult({
    player1: req.body.player1,
    player2: req.body.player2 || 'AI',
    winner: req.body.winner,
  });
  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Tic Tac Toe leaderboard (e.g., top 10 recent games)
router.get('/tictactoe', async (req, res) => {
  try {
    const results = await TicTacToeResult.find().sort({ date: -1 }).limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post Simon Game score
router.post('/simon', async (req, res) => {
  const score = new SimonScore({
    username: req.body.username,
    score: req.body.score,
  });
  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Simon Game leaderboard (top 10 scores)
router.get('/simon', async (req, res) => {
  try {
    const scores = await SimonScore.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;