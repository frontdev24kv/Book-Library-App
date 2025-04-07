import { useSelector, useDispatch } from 'react-redux';
import {
  deleteBook,
  toggleFavoriteBook
} from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter
} from '../../redux/slices/filterSlice';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const filterTitle = useSelector(selectTitleFilter);
  const filterAuthor = useSelector(selectAuthorFilter);
  const showFavorite = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();

  const deleteBookhandler = (id) => {
    dispatch(deleteBook(id));
  };

  const toggleFavoriteHandler = (id) => {
    dispatch(toggleFavoriteBook(id));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(filterAuthor.toLowerCase()) &&
      (showFavorite ? book.isFavorite : book)
  );

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span className="highlight" key={i}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!books.length && <h3>The Books Library is empty</h3>}
      <ul>
        {filteredBooks.map((book, ind) => (
          <li key={book.id}>
            <div className="book-info">
              {++ind} {highlightMatch(book.title, filterTitle)} by <strong>{highlightMatch(book.author, filterAuthor)}</strong>
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
