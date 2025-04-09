import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thuncAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thuncAPI.dispatch(setError(error.message));
      // throw error;
      return thuncAPI.rejectWithValue(error)
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => ({
      ...state,
      books: [...state.books, action.payload]
    }),
    deleteBook: (state, action) => ({
      ...state,
      books: state.books.filter((book) => book.id !== action.payload)
    }),
    toggleFavoriteBook: (state, action) =>
      state.books.forEach((book) =>
        book.id === action.payload ? (book.isFavorite = !book.isFavorite) : book
      )
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, state => {
      state.isLoadingViaAPI = true
    }),
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false
      const { payload } = action;
      if (payload.title && payload.author) {
        state.books.push(createBookWithId(payload, 'API'));
      }
    }),
    builder.addCase(fetchBook.rejected, state => {
      state.isLoadingViaAPI = false
    })
  }
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoading = state => state.books.isLoadingViaAPI

export default booksSlice.reducer;
