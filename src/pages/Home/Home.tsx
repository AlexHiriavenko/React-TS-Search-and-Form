import { Component } from 'react';
import { Character } from '../../actions/getCharacters';
import Card from '../../components/Card/Card';

interface HomeProps {
  cards: Character[];
  error: boolean;
}

class Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
  }

  render() {
    const { cards, error } = this.props;
    if (error) {
      return (
        <p className="app-loading" style={{ color: 'orange' }}>
          Ошибка получения данных, попробуйте перезагрузить страницу
        </p>
      );
    }
    return (
      <>
        <section className="cards">
          {cards?.length ? (
            cards.map((card: Character) => <Card key={card.url} card={card} />)
          ) : (
            <p className="app-loading">Нет подходящих результатов поиска</p>
          )}
        </section>
      </>
    );
  }
}

export default Home;
