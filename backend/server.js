require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quiz');
const gameRoutes = require('./routes/games');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/quiz', quizRoutes);
app.use('/api/games', gameRoutes); // New routes for Tic Tac Toe and Simon

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));