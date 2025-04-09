import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thuncAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thuncAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.title && payload.author) {
        state.push(createBookWithId(payload, 'API'));
      }
    });
  }
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
