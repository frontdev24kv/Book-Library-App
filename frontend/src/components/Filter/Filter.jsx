import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavorite,
  resetFilters,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const showOnlyFavorite = useSelector(selectOnlyFavoriteFilter)

  const handleInputTitleChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleInputAuthorChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const resetHandler = () => {
    dispatch(resetFilters());
  };

  const toggleFavoriteHandler = () => {
    dispatch(setOnlyFavorite())
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={handleInputTitleChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={handleInputAuthorChange}
          />
        </div>
        <div className="filter-group">
          <label>
          <input
            type="checkbox"
            checked={showOnlyFavorite}
            onChange={toggleFavoriteHandler}
            />
            Only Favorite
            </label>
        </div>
        <button type="button" onClick={resetHandler}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
