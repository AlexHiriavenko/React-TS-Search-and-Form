import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRoutes from './components/Routes/Routes';
import Header from './components/Header/Header';
import { context } from './components/Context/context';
import { useGetCharactersQuery, SearchParams } from './redux/RTK-Query/swapi';
import { RootState } from './redux/rootStateType';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const { updateState } = useContext(context);

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
    updateState({
      countPages: Math.ceil((data?.count || 1) / 10),
    });

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
