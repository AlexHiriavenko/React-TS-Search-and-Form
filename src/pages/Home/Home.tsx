import { Component } from 'react';
import { Character } from '../../actions/getCharacters';
import Card from '../../components/Card/Card';

interface HomeProps {
  cards: Character[];
}

class Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
  }

  render() {
    const { cards } = this.props;
    return (
      <>
      <section className="cards">
        {cards.map((card: Character) => (
          <Card key={card.url} card={card} />
        ))}
        </section>
        </>
    );
  }
}

export default Home;
