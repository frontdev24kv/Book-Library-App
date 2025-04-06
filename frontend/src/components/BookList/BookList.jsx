import { useSelector, useDispatch } from 'react-redux';
import './BookList.css';
import { deleteBook } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const deleteBookhandler = (id) => {
    dispatch(deleteBook(id));
  };

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
            <div className="book-actions">
              <button onClick={() => deleteBookhandler(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
