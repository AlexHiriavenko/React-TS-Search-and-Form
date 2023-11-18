import { configureStore } from '@reduxjs/toolkit';
import { swapi } from './RTK-Query/swapi';
import searchReducer from './Slices/searh.slice';

export const store = configureStore({
  reducer: {
    [swapi.reducerPath]: swapi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(swapi.middleware),
});
