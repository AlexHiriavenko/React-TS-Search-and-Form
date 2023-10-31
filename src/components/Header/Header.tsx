import React from 'react';
import Search from '../Search/Search';
import { Character } from '../../actions/getCharacters';

interface HeaderProps {
  updateCards: (newCards: Character[]) => void;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  updateCards,
  setLoading,
  setError,
}) => {
  return (
    <header className="header-main">
      <h1 className="app-title">Star Wars</h1>
      <Search
        updateCards={updateCards}
        setLoading={setLoading}
        setError={setError}
      />
    </header>
  );
};

export default Header;
