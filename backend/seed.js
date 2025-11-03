const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for seeding');
    await Question.deleteMany({}); // Clear existing questions

    const questions = [
      // General Knowledge (5 sample questions with options)
      { category: 'General Knowledge', question: 'What does a funambulist walk on?', options: ['A Tight Rope', 'A Wire', 'A Plank', 'A Ladder'], answer: 'A Tight Rope' },
      { category: 'General Knowledge', question: 'Area 51 is located in which US state?', options: ['Nevada', 'California', 'Arizona', 'New Mexico'], answer: 'Nevada' },
      { category: 'General Knowledge', question: 'On a dartboard, what number is directly opposite No. 1?', options: ['19', '20', '18', '17'], answer: '19' },
      { category: 'General Knowledge', question: 'Which American president appears on a one-dollar bill?', options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'Andrew Jackson'], answer: 'George Washington' },
      { category: 'General Knowledge', question: 'What geometric shape is generally used for stop signs?', options: ['Octagon', 'Hexagon', 'Circle', 'Square'], answer: 'Octagon' },

      // History (5 sample questions)
      { category: 'History', question: 'In the harbour of which city was the Greenpeace flagship Rainbow Warrior sunk in 1985?', options: ['Auckland', 'Sydney', 'Vancouver', 'San Francisco'], answer: 'Auckland' },
      { category: 'History', question: 'Which country was split into two zones by the Yalta agreement?', options: ['Germany', 'Korea', 'Vietnam', 'Poland'], answer: 'Germany' },
      { category: 'History', question: 'Who Commanded The Confederate Armies During The American Civil War?', options: ['Robert E. Lee', 'Ulysses S. Grant', 'Stonewall Jackson', 'Jefferson Davis'], answer: 'Robert E. Lee' },
      { category: 'History', question: 'In 1962, for what reason did Britain and France sign an agreement to build together?', options: ['Concorde', 'Channel Tunnel', 'Eurostar', 'Nuclear Plant'], answer: 'Concorde' },
      { category: 'History', question: 'During Which King\'s Reign Did The Great Fire Of London Occur?', options: ['Charles II', 'James I', 'Henry VIII', 'George III'], answer: 'Charles II' },

      // Movies (5 sample questions)
      { category: 'Movies', question: 'In the movie "Finding Nemo", who was Marlin’s wife?', options: ['Coral', 'Dory', 'Pearl', 'Shelly'], answer: 'Coral' },
      { category: 'Movies', question: 'In what year was the original "Jurassic Park" film released?', options: ['1993', '1990', '1995', '1989'], answer: '1993' },
      { category: 'Movies', question: 'What substance is Han Solo frozen in during "The Empire Strikes Back"?', options: ['Carbonite', 'Ice', 'Kyber Crystal', 'Beskar'], answer: 'Carbonite' },
      { category: 'Movies', question: 'What famous character is known for saying, "I\'ll be back"?', options: ['The Terminator', 'Rambo', 'James Bond', 'Indiana Jones'], answer: 'The Terminator' },
      { category: 'Movies', question: 'What is Forrest Gump\'s IQ?', options: ['75', '100', '85', '120'], answer: '75' },

      // Sports (5 sample questions)
      { category: 'Sports', question: 'Which NFL player spent two years in prison for being one of the chief operators of Bad News Kennels?', options: ['Michael Vick', 'Tom Brady', 'Peyton Manning', 'Aaron Rodgers'], answer: 'Michael Vick' },
      { category: 'Sports', question: 'Which country originated the sport of curling?', options: ['Scotland', 'Canada', 'Norway', 'Switzerland'], answer: 'Scotland' },
      { category: 'Sports', question: 'What is the national sport of Canada?', options: ['Lacrosse', 'Hockey', 'Basketball', 'Soccer'], answer: 'Lacrosse' },
      { category: 'Sports', question: 'In what year were the first Air Jordan sneakers released?', options: ['1984', '1986', '1990', '1979'], answer: '1984' },
      { category: 'Sports', question: 'What US city hosted the 1994 World Cup final?', options: ['Pasadena', 'New York', 'Miami', 'Chicago'], answer: 'Pasadena' },

      // Science (5 sample questions, adapted from general/science-related trivia)
      { category: 'Science', question: 'How many colors are there in a rainbow?', options: ['7', '6', '8', '5'], answer: '7' },
      { category: 'Science', question: 'What is the human body’s heaviest organ?', options: ['The skin', 'The liver', 'The brain', 'The heart'], answer: 'The skin' },
      { category: 'Science', question: 'What is Cynophobia the fear of?', options: ['Dogs', 'Cats', 'Spiders', 'Heights'], answer: 'Dogs' },
      { category: 'Science', question: 'What is the world\'s most expensive spice by weight?', options: ['Saffron', 'Vanilla', 'Cinnamon', 'Cardamom'], answer: 'Saffron' },
      { category: 'Science', question: 'Where did the pineapple plant originate?', options: ['South America', 'Asia', 'Africa', 'Europe'], answer: 'South America' },
    ];

    await Question.insertMany(questions);
    console.log('Questions seeded');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));