import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRoutes from './components/Routes/Routes';
import Header from './components/Header/Header';
import { useGetCharactersQuery, SearchParams } from './redux/RTK-Query/swapi';
import { RootState } from './redux/rootStateType';
import { setCountPages } from './redux/Slices/pagination.slice';
import { setCharacters } from './redux/Slices/characters.slice';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParam = useSelector(
    (state: RootState) => state.search.searchParam
  );

  const endPoint: SearchParams = {
    searchParam: searchParam,
    pageNumber: Number(location.pathname.split('/').pop()) || 1,
  };

  const { data, error, isLoading, refetch } = useGetCharactersQuery(endPoint);

  useEffect(() => {
    refetch();
    const counPages = Math.ceil((data?.count || 1) / 10);
    dispatch(setCountPages(counPages));
    dispatch(setCharacters(data?.results || []));
    // return () => updateState({ cards: [] });
  }, [data?.count, searchParam]);

  return (
    <>
      {isLoading && <p className="app-loading">Loading...</p>}
      {error && <p className="app-loading alert">Error, try reload page</p>}
      {!isLoading && !error && (
        <ErrorBoundary>
          <Header />
          <AppRoutes />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
