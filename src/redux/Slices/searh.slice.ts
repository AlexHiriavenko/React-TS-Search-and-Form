import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchParam: '?page=',
  searchTerm: localStorage.getItem('lastSearch') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchParam, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
