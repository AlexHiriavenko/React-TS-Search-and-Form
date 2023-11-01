import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home/Home';
import { ApiResponse, Character } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const defaultSearch = '?page=1';
  const lastSearch = localStorage.getItem('lastSearch');
  const searchParam = lastSearch ? `?search=${lastSearch}` : defaultSearch;

  const [cards, setCards] = useState<Character[]>([]);
  const [countPages, setCountPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // const updateCards = (newCards: Character[]) => setCards(newCards);

  const generateError = () => {
    try {
      throw new Error('catch boundary error');
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        setError(true);
        setErrorMessage(error.message);
        console.error(error.message);
      } else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async (pageNumber: string | number) => {
      try {
        const { results, count }: ApiResponse = await getCharacters(pageNumber);
        setCards(results);
        setCountPages(Math.ceil(count / 10));
        setLoading(false);
      } catch (error) {
        console.error('error get data:', error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData(1);
    console.log(location.pathname);
  }, [searchParam, location.pathname]);

  if (loading) {
    return <p className="app-loading">Loading...</p>;
  }

  if (error) {
    return (
      <ErrorBoundary errorMessage={errorMessage}>
        <p className="app-loading alert">error data, try reloading the page</p>
      </ErrorBoundary>
    );
  }

  console.log(countPages);
  return (
    <ErrorBoundary>
      <button onClick={generateError} className="btnError">
        generate Error
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cards={cards}
              error={error}
              countPages={countPages}
              setCards={setCards}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/page/:pageNumber"
          element={
            <Home
              cards={cards}
              error={error}
              countPages={countPages}
              setCards={setCards}
              setLoading={setLoading}
            />
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
