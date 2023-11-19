import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearBtn from '../ClearBtn/ClearBtn';
import { setSearchTerm, setSearchParam } from '../../redux/Slices/searh.slice';
import { RootState } from '../../redux/rootStateType';

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('lastSearch', event.target.value.trim());
    dispatch(setSearchTerm(event.target.value.trim()));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const endPoint = searchTerm ? `?search=${searchTerm}` : '/?page=';
    dispatch(setSearchParam(endPoint));
    navigate('./page/1');
  };

  function clearInput() {
    localStorage.setItem('lastSearch', '');
    dispatch(setSearchTerm(''));
  }

  return (
    <form className="search-form" onSubmit={onSubmit} data-testid="search-form">
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
