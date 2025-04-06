import { useSelector } from 'react-redux';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books);

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!books.length && <h3>The Books Library is empty</h3>}
      <ul>
        {books.map((book, ind) => (
          <li key={book.id}>
            <div className="book-info">
              {++ind} {book.title} by <strong>{book.author}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
