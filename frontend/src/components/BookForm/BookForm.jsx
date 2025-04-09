import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookWithId } from '../../utils/createBookWithId';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import { FaSpinner } from 'react-icons/fa6';
import './BookForm.css';
import booksData from '../../data/books.json';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      dispatch(addBook(createBookWithId({ title, author })));
    } else {
      dispatch(setError('All the fields must be fill in'));
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
      setIsLoading(true);
      await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
    } finally {
      setIsLoading(false);
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
        <button type="button" onClick={addRandomBookByApi} disabled={isLoading}>
          {isLoading ? (
            <>
              <span>Book is loading...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
