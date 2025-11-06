import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const TriviaQuiz = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/quiz/categories')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Fetch questions when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/quiz/questions/${selectedCategory}`)
        .then(res => {
          setQuestions(res.data);
          setCurrentQuestion(0);
          setScore(0);
          setShowScore(false);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const submitScore = () => {
    axios.post('http://localhost:5000/api/quiz/scores', { username, score, category: selectedCategory })
      .then(() => navigate('/leaderboard'))
      .catch(err => console.log(err));
  };

  const resetQuiz = () => {
    setSelectedCategory('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUsername('');
  };

  return (
    <div>
      <h2>Trivia Quiz</h2>
      {loading && <p>Loading...</p>}
      {!selectedCategory && !loading && (
        <div>
          <h3>Select a Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}
      {selectedCategory && questions.length > 0 && !showScore && (
        <div>
          <h3>{selectedCategory} Quiz</h3>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
          <p>{questions[currentQuestion].question}</p>
          <div className='options'>
          {questions[currentQuestion].options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className='options-button'
              style={{ display: 'block', margin: '10px' }}
            >
              {opt}
            </button>
          ))}
          </div>
        </div>
      )}
      {showScore && (
        <div>
          <h3>Your Score: {score} / {questions.length}</h3>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={submitScore}>Submit Score</button>
          <button onClick={resetQuiz} style={{ marginLeft: '10px' }}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default TriviaQuiz;