import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRoutes from './components/Routes/Routes';
import Header from './components/Header/Header';
import { useGetCharactersQuery } from './redux/RTK-Query/swapi';
import { RootState } from './redux/rootStateType';
import { setCountPages } from './redux/Slices/pagination.slice';
import { setCharacters } from './redux/Slices/characters.slice';
import NotFound from './pages/NotFound/NotFound';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParam = useSelector(
    (state: RootState) => state.search.searchParam
  );

  const pageNumber = location.pathname.split('/').pop();

  let endPoint = '';
  if (!searchParam.includes('search')) {
    endPoint = pageNumber ? searchParam + pageNumber : searchParam + 1;
  } else {
    endPoint = searchParam;
  }

  console.log(endPoint);

  const { data, error, isFetching } = useGetCharactersQuery(endPoint);

  useEffect(() => {
    const countPages = Math.ceil((data?.count || 1) / 10);
    dispatch(setCountPages(countPages));
    dispatch(setCharacters(data?.results || []));
  }, [data?.count, searchParam, location.pathname]);

  return (
    <>
      {isFetching && <p className="app-loading">Loading...</p>}
      {error && location.pathname.includes('/404') && <NotFound />}
      {error && !location.pathname.includes('/404') && (
        <p className="app-loading alert">Error, try reload page</p>
      )}
      {!isFetching && !error && (
        <ErrorBoundary>
          <Header />
          <AppRoutes />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
