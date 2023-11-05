import React, { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../actions/getCharacters';
import Sidebar from '../../components/SideBar/SideBar';
import Main from '../../components/Main/Main';
import PaginationBtns from '../../components/PaginationBtns/PaginationBtns';
import CharactersList from '../../components/CharactersList/CharactersList';
import CharacterCard from '../../components/Card/CharacterCard';

export interface HomeProps {
  cards: Character[];
  error: boolean;
  countPages: number;
  setError: Dispatch<SetStateAction<boolean>>;
  setCards: Dispatch<SetStateAction<Character[]>>;
  searchParam: string;
}

const Home: React.FC<HomeProps> = (props) => {
  const { cards, error, searchParam } = props;

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );

  const [homeLoading, setHomeLoading] = useState(false);

  function resetCurrentCharacter() {
    setCurrentCharacter(null);
  }

  return (
    <div className="wrapper">
      {homeLoading && <p className="app-loading">Loading...</p>}
      {!homeLoading && !error && (
        <div className="home-container">
          <Sidebar>
            <CharactersList
              cards={cards}
              setCurrentCharacter={setCurrentCharacter}
            />
          </Sidebar>
          <Main>
            <CharacterCard currentCharacter={currentCharacter} cards={cards} />
          </Main>
        </div>
      )}
      <PaginationBtns
        {...props}
        homeLoading={homeLoading}
        setHomeLoading={setHomeLoading}
        resetCurrentCharacter={resetCurrentCharacter}
        searchParam={searchParam}
      />
    </div>
  );
};

export default Home;
