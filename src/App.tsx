import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRoutes from './components/Routes/Routes';
import { ApiResponse, Character } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';
import Header from './components/Header/Header';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();

  const [cards, setCards] = useState<Character[]>([]);
  const [countPages, setCountPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParam, setSearchParam] = useState('?page=');

  const fetchData = async (path: string) => {
    const basicURL = 'https://swapi.dev/api/people/';
    const pageNumber = path.split('/').pop() || 1;
    const endPoint = basicURL + searchParam + pageNumber;

    try {
      const { results, count }: ApiResponse = await getCharacters(endPoint);
      setCards(results);
      setCountPages(Math.ceil(count / 10));
      setLoading(false);
    } catch (error) {
      console.error('error get data:', error);
      setLoading(false);
      setError(true);
    }
  };

  function resetCardsState() {
    setCards([]);
  }

  useEffect(() => {
    fetchData(location.pathname);

    return () => resetCardsState();
  }, []);

  console.log(searchParam);

  return (
    <>
      {loading && <p className="app-loading">Loading...</p>}
      {error && <p className="app-loading alert">Error, try reload page</p>}
      {!loading && !error && (
        <ErrorBoundary>
          <Header
            setCards={setCards}
            setLoading={setLoading}
            setError={setError}
            setCountPages={setCountPages}
            resetCardsState={resetCardsState}
            setSearchParam={setSearchParam}
          />
          <AppRoutes
            cards={cards}
            error={error}
            setError={setError}
            countPages={countPages}
            setCards={setCards}
            searchParam={searchParam}
          />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
