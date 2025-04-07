import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleInputTitleChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const resetHandler = () => {
    dispatch(resetFilters());
  };

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
        <button type="button" onClick={resetHandler}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
