import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => [...state, action.payload],
    deleteBook: (state, action) =>
      state.filter((book) => book.id !== action.payload),
    toggleFavoriteBook: (state, action) => {
      state.forEach((book) => {
        book.id === action.payload
          ? (book.isFavorite = !book.isFavorite)
          : book;
      });
    }
  }
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export const thuncFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://127.0.0.1:4000/random-book');
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, 'API')));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default booksSlice.reducer;
