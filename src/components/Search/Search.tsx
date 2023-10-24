import { ChangeEvent, FormEvent, Component } from 'react';

interface SearchState {
  searchTerm: string;
}

class Search extends Component<{}, SearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    // Логика для отправки поискового запроса на API
    console.log('Поисковый запрос:', searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <form className="search-form" onSubmit={this.handleSearch}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={this.handleInputChange}
          placeholder="Введите поисковый запрос"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
