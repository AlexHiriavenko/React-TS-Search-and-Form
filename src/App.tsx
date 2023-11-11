import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRoutes from './components/Routes/Routes';
import { ApiResponse } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';
import Header from './components/Header/Header';
import { context } from './components/Context/context';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const { state, updateState } = useContext(context);
  const { loading, error, searchParam } = state;

  const fetchData = async (path: string) => {
    const basicURL = 'https://swapi.dev/api/people/';
    const pageNumber = path.split('/').pop() || 1;
    const endPoint = basicURL + searchParam + pageNumber;

    try {
      const { results, count }: ApiResponse = await getCharacters(endPoint);
      updateState({
        loading: false,
        cards: results,
        countPages: Math.ceil(count / 10),
      });
    } catch (error) {
      console.error('error get data:', error);
      updateState({ loading: false, error: true });
    }
  };

  useEffect(() => {
    fetchData(location.pathname);

    return () => updateState({ cards: [] });
  }, []);

  return (
    <>
      {loading && <p className="app-loading">Loading...</p>}
      {error && <p className="app-loading alert">Error, try reload page</p>}
      {!loading && !error && (
        <ErrorBoundary>
          <Header />
          <AppRoutes />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
