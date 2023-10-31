import React, { useState, ChangeEvent, FormEvent } from 'react';
import getCharacters, {
  ApiResponse,
  Character,
} from '../../actions/getCharacters';

interface SearchProps {
  updateCards: (newCards: Character[]) => void;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  updateCards,
  setLoading,
  setError,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('lastSearch') || ''
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const endPoint = searchTerm ? `?search=${searchTerm}` : '?page=1';
    localStorage.setItem('lastSearch', searchTerm);
    try {
      setLoading(true);
      const { results }: ApiResponse = await getCharacters(endPoint);
      updateCards(results);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        id="search"
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="enter character name"
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
