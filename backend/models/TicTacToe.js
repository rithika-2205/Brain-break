const mongoose = require('mongoose');

const ticTacToeResultSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, default: 'bot' },
  winner: { type: String, enum: ['player1', 'player2', 'draw', null] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TicTacToeResult', ticTacToeResultSchema);