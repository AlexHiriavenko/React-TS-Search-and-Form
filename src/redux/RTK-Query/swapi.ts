import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../actions/getCharacters';

interface SearchParams {
  searchParam: string;
  pageNumber: number;
}

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  [key: string]: unknown;
}

export const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, SearchParams>({
      query: ({ searchParam, pageNumber }) => `${searchParam}${pageNumber}`,
    }),
    getPlanet: builder.query<Planet, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetCharactersQuery, useGetPlanetQuery } = swapi;
export type { SearchParams };
