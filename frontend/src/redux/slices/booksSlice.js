import { createSlice } from '@reduxjs/toolkit';

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

export default booksSlice.reducer;
