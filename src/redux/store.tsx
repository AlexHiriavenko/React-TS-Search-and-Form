import { configureStore } from '@reduxjs/toolkit';
import { swapi } from './RTK-Query/swapi';
import searchReducer from './Slices/searh.slice';
import paginationReducer from './Slices/pagination.slice';
import charactersReducer from './Slices/characters.slice';

export const store = configureStore({
  reducer: {
    [swapi.reducerPath]: swapi.reducer,
    search: searchReducer,
    pagination: paginationReducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(swapi.middleware),
});
