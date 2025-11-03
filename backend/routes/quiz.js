const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Score = require('../models/Score');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get questions by category
router.get('/questions/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new score
router.post('/scores', async (req, res) => {
  const score = new Score({
    username: req.body.username,
    score: req.body.score,
    category: req.body.category,
  });
  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get leaderboard (top 10 scores overall)
router.get('/leaderboard', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;