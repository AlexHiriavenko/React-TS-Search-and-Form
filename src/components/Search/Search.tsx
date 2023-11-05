import React, {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import getCharacters, {
  ApiResponse,
  Character,
} from '../../actions/getCharacters';
import { createSearhParam } from '../../helpers/createSearchParam';
import ClearBtn from '../ClearBtn/ClearBtn';

interface SearchProps {
  updateCards: (newCards: Character[]) => void;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
  setCountPages: Dispatch<SetStateAction<number>>;
  setSearchParam: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({
  updateCards,
  setLoading,
  setError,
  setCountPages,
  setSearchParam,
}) => {
  const basicURL = 'https://swapi.dev/api/people/';

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('lastSearch') || ''
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('lastSearch', event.target.value.trim());
    setSearchTerm(event.target.value.trim());
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const endPoint = searchTerm
      ? basicURL + `?search=${searchTerm}`
      : basicURL + '?page=1';

    navigate('./page/1');
    try {
      setLoading(true);
      const { results, count, next }: ApiResponse = await getCharacters(
        endPoint
      );
      let newSearchParam = '';
      if (next) {
        newSearchParam = createSearhParam(basicURL, next);
      }
      console.log(newSearchParam);
      setSearchParam(newSearchParam || '?page=');
      updateCards(results);
      setCountPages(Math.ceil(count / 10));
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false);
      setError(true);
    }
  };

  function clearInput() {
    setSearchTerm('');
  }

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div style={{ position: 'relative', maxWidth: 'max-content' }}>
        <input
          id="search"
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="enter character name"
        />
        <ClearBtn clearInput={clearInput} />
      </div>
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
