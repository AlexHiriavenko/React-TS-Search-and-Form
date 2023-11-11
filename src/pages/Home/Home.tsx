import { Dispatch, SetStateAction, useState, useContext } from 'react';
import { Character } from '../../actions/getCharacters';
import Sidebar from '../../components/SideBar/SideBar';
import Main from '../../components/Main/Main';
import PaginationBtns from '../../components/PaginationBtns/PaginationBtns';
import CharactersList from '../../components/CharactersList/CharactersList';
import CharacterCard from '../../components/Card/CharacterCard';
import { context } from '../../components/Context/context';

export interface HomeProps {
  cards: Character[];
  error: boolean;
  countPages: number;
  setError: Dispatch<SetStateAction<boolean>>;
  setCards: Dispatch<SetStateAction<Character[]>>;
  searchParam: string;
}

const Home = () => {
  const error = useContext(context).state.error;

  const [homeLoading, setHomeLoading] = useState(false);

  return (
    <div className="wrapper">
      {homeLoading && <p className="app-loading">Loading...</p>}
      {!homeLoading && !error && (
        <div className="home-container">
          <Sidebar>
            <CharactersList />
          </Sidebar>
          <Main>
            <CharacterCard />
          </Main>
        </div>
      )}
      <PaginationBtns
        homeLoading={homeLoading}
        setHomeLoading={setHomeLoading}
      />
    </div>
  );
};

export default Home;
