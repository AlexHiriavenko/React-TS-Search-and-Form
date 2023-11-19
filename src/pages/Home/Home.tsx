import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/SideBar/SideBar';
import Main from '../../components/Main/Main';
import PaginationBtns from '../../components/PaginationBtns/PaginationBtns';
import CharactersList from '../../components/CharactersList/CharactersList';
import CharacterCard from '../../components/Card/CharacterCard';
import { RootState } from '../../redux/rootStateType';

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  // const location = useLocation();
  // const searchParam = useSelector(
  //   (state: RootState) => state.search.searchParam
  // );

  // const endPoint = {
  //   searchParam: searchParam,
  //   pageNumber: Number(location.pathname.split('/').pop()) || 1,
  // };

  // const { data, error, isLoading, refetch } = useGetCharactersQuery(endPoint);

  return (
    <div className="wrapper">
      {homeLoading && <p className="app-loading">Loading</p>}
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
