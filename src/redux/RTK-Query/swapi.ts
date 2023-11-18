import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../actions/getCharacters';

interface SearchParams {
  searchParam: string;
  pageNumber: number;
}

export const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, SearchParams>({
      query: ({ searchParam, pageNumber }) => `${searchParam}${pageNumber}`,
    }),
  }),
});

export const { useGetCharactersQuery } = swapi;
export type { SearchParams };
