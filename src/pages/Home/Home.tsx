import React from 'react';
import { Character } from '../../actions/getCharacters';
import Card from '../../components/Card/Card';

interface HomeProps {
  cards: Character[];
  error: boolean;
}

const Home: React.FC<HomeProps> = ({ cards, error }) => {
  return (
    <>
      {error ? (
        <p className="app-loading alert">error data, try to reload page</p>
      ) : (
        <section className="cards">
          {cards?.length ? (
            cards.map((card: Character) => <Card key={card.url} card={card} />)
          ) : (
            <p className="app-loading">No search results</p>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
