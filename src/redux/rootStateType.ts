import { ApiResponse } from '../actions/getCharacters';

interface RootState {
  // Другие разделы вашего стейта
  swapi: {
    queries: {
      getCharacters: {
        (params: { pageNumber: number; searchParam: string }): {
          data: ApiResponse;
        };
      };
    };
    mutations: {
      [key: string]: unknown;
    };
    subscriptions: {
      [key: string]: unknown;
    };
    config: {
      online: boolean;
      focused: boolean;
      middlewareRegistered: boolean;
      refetchOnFocus: boolean;
      refetchOnReconnect: boolean;
      refetchOnMountOrArgChange: boolean;
      keepUnusedDataFor: number;
      reducerPath: string;
    };
  };
  search: {
    searchParam: string;
    searchTerm: string;
  };
}

export type { RootState };
