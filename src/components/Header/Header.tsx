import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchParam, setSearchTerm } from '../../redux/Slices/searh.slice';
import Search from '../Search/Search';
import {
  resetCharacter,
  setCharacters,
} from '../../redux/Slices/characters.slice';
import getCharacters, { ApiResponse } from '../../actions/getCharacters';

const Header = () => {
  const dispatch = useDispatch();

  async function switchHome() {
    localStorage.setItem('lastSearch', '');
    dispatch(setSearchTerm(''));
    dispatch(setSearchParam('/?page='));
    try {
      const endPoint = 'https://swapi.dev/api/people/?page=1';
      dispatch(resetCharacter());
      const { results }: ApiResponse = await getCharacters(endPoint);
      dispatch(setCharacters(results));
    } catch (error) {
      console.error('error get data:', error);
    }
  }

  return (
    <header className="header-main">
      <Link to={'/'} onClick={switchHome}>
        <h1 className="app-title">Star Wars</h1>
      </Link>
      <Search />
    </header>
  );
};

export default Header;
