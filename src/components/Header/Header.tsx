import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import { ApiResponse } from '../../actions/getCharacters';
import getCharacters from '../../actions/getCharacters';
import { context } from '../Context/context';
import { initialState } from '../Context/InitialState';

const Header = () => {
  const location = useLocation().pathname;

  const { updateState } = useContext(context);

  async function switchHome() {
    if (location !== '/') {
      const endPoint = 'https://swapi.dev/api/people/?page=1';

      try {
        updateState(initialState);
        localStorage.setItem('lastSearch', '');
        const { results, count }: ApiResponse = await getCharacters(endPoint);
        updateState({
          countPages: Math.ceil(count / 10),
          cards: results,
          loading: false,
        });
      } catch (error) {
        console.error('error get data:', error);
        updateState({ loading: false, error: true });
      }
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
