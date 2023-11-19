import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
  character: null,
};

const characters = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    resetCharacters: (state) => {
      state.characters = initialState.characters;
    },
    resetCharacter: (state) => {
      state.character = initialState.character;
    },
  },
});

export const { setCharacter, setCharacters, resetCharacter, resetCharacters } =
  characters.actions;

export default characters.reducer;
