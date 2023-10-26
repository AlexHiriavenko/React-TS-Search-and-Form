import { Component } from 'react';
import './styles/App.scss';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { ApiResponse, Character } from './actions/getCharacters';
import getCharacters from './actions/getCharacters';

interface AppState {
  cards: Character[];
  loading: boolean;
  error: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    if (this.state.cards.length === 0) {
      const options = '?page=1';
      this.setCards(options);
    }
  }

  setCards = async (options?: string) => {
    try {
      const { results }: ApiResponse = await getCharacters(options);
      this.setState({ cards: results, loading: false }, () => {
        console.log(this.state.cards);
      });
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { loading, error, cards } = this.state;

    if (loading) {
      return <p className='app-loading'>Loading...</p>;
    }
    if (error) {
      return <p>Ошибка при получении данных, попробуйте позже и перезагрузите страницу</p>;
    }

    return (
      <>
        <Header />
        <Home cards={cards} />
      </>
    );
  }
}

export default App;
