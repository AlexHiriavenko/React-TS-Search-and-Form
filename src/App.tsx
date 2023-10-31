import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { ApiResponse, Character } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const defaultSearch = '?page=1';
  const lastSearch = localStorage.getItem('lastSearch');
  const searchParam = lastSearch ? `?search=${lastSearch}` : defaultSearch;

  const [cards, setCards] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const updateCards = (newCards: Character[]) => setCards(newCards);

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
    const fetchData = async () => {
      try {
        const { results }: ApiResponse = await getCharacters(searchParam);
        setCards(results);
        setLoading(false);
      } catch (error) {
        console.error('error get data:', error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [searchParam]);

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

  return (
    <ErrorBoundary>
      <button onClick={generateError} className="btnError">
        generate Error
      </button>
      <Header
        updateCards={updateCards}
        setLoading={setLoading}
        setError={setError}
      />
      <Home cards={cards} error={error} />
    </ErrorBoundary>
  );
};

export default App;
