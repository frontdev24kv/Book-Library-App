const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express();

app.use(cors());

const getrandomBook = () => {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  return randomBook;
};

app.get('/random-book', (req, res) => {
  res.json(getrandomBook());
});

app.get('/random-book-delayed', (req, res) => {
  setTimeout(() => {
    res.json(getrandomBook());
  }, 2000);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
