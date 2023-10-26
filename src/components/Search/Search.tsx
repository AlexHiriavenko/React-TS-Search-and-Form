import { ChangeEvent, FormEvent, Component } from 'react';
import getCharacters, {
  ApiResponse,
  Character,
} from '../../actions/getCharacters';

interface SearchState {
  searchTerm: string;
}

interface SearchProps {
  updateCards: (newCards: Character[]) => void;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  handleSearch = async (event: FormEvent) => {
    const { updateCards, setLoading, setError } = this.props;
    event.preventDefault();
    const { searchTerm } = this.state;
    setLoading(true);
    if (searchTerm) {
      console.log('Поисковый запрос:', searchTerm);
      try {
        const endPoint = `?search=${searchTerm}`;
        const { results }: ApiResponse = await getCharacters(endPoint);
        updateCards(results);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
        setError(true);
      }
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <form className="search-form" onSubmit={this.handleSearch}>
        <input
          id="search"
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={this.handleInputChange}
          placeholder="Введите имя персонажа"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
