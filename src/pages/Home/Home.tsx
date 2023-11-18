import { useState } from 'react';
import Sidebar from '../../components/SideBar/SideBar';
import Main from '../../components/Main/Main';
import PaginationBtns from '../../components/PaginationBtns/PaginationBtns';
import CharactersList from '../../components/CharactersList/CharactersList';
import CharacterCard from '../../components/Card/CharacterCard';

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);

  return (
    <div className="wrapper">
      {!homeLoading && (
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
