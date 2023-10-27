import { Component } from 'react';
import './styles/App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { ApiResponse, Character } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';

interface AppState {
  cards: Character[];
  loading: boolean;
  error: boolean;
  errorMessage?: string;
}

const initialState: AppState = {
  cards: [],
  loading: true,
  error: false,
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  setCards = async (options?: string) => {
    try {
      const { results }: ApiResponse = await getCharacters(options);
      this.setState({ cards: results, loading: false });
    } catch (error) {
      console.error('error get data:', error);
      this.setState({ loading: false, error: true });
    }
  };

  updateCards = (newCards: Character[]) => this.setState({ cards: newCards });

  setLoading = (bool: boolean) => this.setState({ loading: bool });

  setError = (bool: boolean) => this.setState({ error: bool });

  generateError = () => {
    try {
      throw new Error('catch boundary error');
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        this.setState({ error: true, errorMessage: error.message });
        console.error(error.message);
      } else {
        this.setState({ error: true });
      }
    }
  };

  componentDidMount() {
    const defaultSearch = '?page=1';
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `?search=${lastSearch}` : defaultSearch;
    this.setCards(searchParam);
  }

  render() {
    const { loading, error, cards } = this.state;

    if (loading) {
      return <p className="app-loading">Loading...</p>;
    }
    if (error) {
      return (
        <ErrorBoundary errorMessage={this.state.errorMessage}>
          <p className="app-loading alert">
            error data, try reloading the page
          </p>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <button onClick={this.generateError} className="btnError">
          generate Error
        </button>
        <Header
          updateCards={this.updateCards}
          setLoading={this.setLoading}
          setError={this.setError}
        />
        <Home cards={cards} error={error} />
      </ErrorBoundary>
    );
  }
}

export default App;
