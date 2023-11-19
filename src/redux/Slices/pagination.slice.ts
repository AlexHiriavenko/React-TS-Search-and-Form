import { createSlice } from '@reduxjs/toolkit';

const pagination = createSlice({
  name: 'pagination',
  initialState: { countPages: 1 },
  reducers: {
    setCountPages: (state, action) => {
      state.countPages = action.payload;
    },
  },
});

export const { setCountPages } = pagination.actions;

export default pagination.reducer;
