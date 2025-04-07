import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  title: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      const {type, payload} = action
      state.title = payload
    },
    resetFilters: (state) => initialState
  }
})

export const {setTitleFilter, resetFilters} = filterSlice.actions
export const selectTitleFilter = state => state.filter.title

export default filterSlice.reducer
