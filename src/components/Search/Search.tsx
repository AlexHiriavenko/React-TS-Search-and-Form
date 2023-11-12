import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import getCharacters, { ApiResponse } from '../../actions/getCharacters';
import { createSearhParam } from '../../helpers/createSearchParam';
import ClearBtn from '../ClearBtn/ClearBtn';
import { context } from '../Context/context';

const Search = () => {
  const navigate = useNavigate();

  const { updateState } = useContext(context);
  const basicURL = 'https://swapi.dev/api/people/';

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
    updateState({ loading: true, currentCard: null });
    try {
      const { results, count, next }: ApiResponse = await getCharacters(
        endPoint
      );
      let newSearchParam = '';
      if (next) {
        newSearchParam = createSearhParam(basicURL, next);
      }
      console.log(newSearchParam);
      updateState({ searchParam: newSearchParam || '?page=' });
      updateState({
        cards: results,
        countPages: Math.ceil(count / 10),
        loading: false,
      });
    } catch (error) {
      console.error('Error:', error);
      updateState({ loading: false, error: true });
    }
  };

  function clearInput() {
    setSearchTerm('');
  }

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div
        style={{
          position: 'relative',
          width: '320px',
          minWidth: '220px',
        }}
      >
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
