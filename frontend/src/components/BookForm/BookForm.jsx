import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';
import { addBook } from '../../redux/slices/booksSlice';
import './BookForm.css';
import booksData from '../../data/books.json';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      dispatch(addBook(createBookWithId({ title, author })));
    } else {
      alert('All the fields must be fill in');
    }
    setTitle('');
    setAuthor('');
  };

  const addRandomBookHandler = () => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];
    dispatch(addBook(createBookWithId(randomBook, 'random')));
  };

  const addRandomBookByApi = async () => {
    try {
      const res = await axios.get('http://localhost:4000/random-book');
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data, "API")));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button>Add book</button>
        <button type="button" onClick={addRandomBookHandler}>
          Add random
        </button>
        <button type="button" onClick={addRandomBookByApi}>
          Add random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
