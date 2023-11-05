import React, { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import { Character } from '../../actions/getCharacters';
import { ApiResponse } from '../../actions/getCharacters';
import getCharacters from '../../actions/getCharacters';

interface HeaderProps {
  setCards: Dispatch<SetStateAction<Character[]>>;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
  setCountPages: Dispatch<SetStateAction<number>>;
  resetCardsState: () => void;
  setSearchParam: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  setCards,
  setLoading,
  setError,
  setCountPages,
  resetCardsState,
  setSearchParam,
}) => {
  const location = useLocation().pathname;

  async function switchHome() {
    if (location !== '/') {
      const endPoint = 'https://swapi.dev/api/people/?page=1';

      try {
        setLoading(true);
        resetCardsState();
        setSearchParam('?page=');
        const { results, count }: ApiResponse = await getCharacters(endPoint);
        setCountPages(Math.ceil(count / 10));
        setCards(results);
        setLoading(false);
      } catch (error) {
        console.error('error get data:', error);
        setLoading(false);
        setError(true);
      }
    }
  }

  return (
    <header className="header-main">
      <Link to={'/'} onClick={switchHome}>
        <h1 className="app-title">Star Wars</h1>
      </Link>
      <Search
        updateCards={setCards}
        setLoading={setLoading}
        setError={setError}
        setCountPages={setCountPages}
        setSearchParam={setSearchParam}
      />
    </header>
  );
};

export default Header;
