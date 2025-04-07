import * as a from './actionTypes';

let initialState = [];

const booksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case a.ADD_BOOK:
      return [...state, payload];
    case a.DELETE_BOOK:
      return state.filter((book) => book.id !== payload);
    case a.TOGGLE_FAVORITE_BOOK:
      return state.map((book) =>
        book.id === payload ? { ...book, isFavorite: !book.isFavorite } : book
      );
    default:
      return state;
  }
};

export default booksReducer;
