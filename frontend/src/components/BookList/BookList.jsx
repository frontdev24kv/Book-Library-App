import { useSelector, useDispatch } from 'react-redux';
import {
  deleteBook,
  toggleFavoriteBook
} from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const deleteBookhandler = (id) => {
    dispatch(deleteBook(id));
  };

  const toggleFavoriteHandler = (id) => {
    dispatch(toggleFavoriteBook(id));
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
              <span onClick={() => toggleFavoriteHandler(book.id)}>
                {book.isFavorite && (
                  <BsBookmarkStarFill className="star-icon" />
                )}
                {!book.isFavorite && <BsBookmarkStar className="star-icon" />}
              </span>
              <button onClick={() => deleteBookhandler(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
