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
        <p className="app-loading alert">error data, try to reload page</p>
      );
    }
    return (
      <>
        <section className="cards">
          {cards?.length ? (
            cards.map((card: Character) => <Card key={card.url} card={card} />)
          ) : (
            <p className="app-loading">No search results</p>
          )}
        </section>
      </>
    );
  }
}

export default Home;
