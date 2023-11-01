import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../../actions/getCharacters';
import Card from '../../components/Card/Card';
import getCharacters from '../../actions/getCharacters';
import { ApiResponse } from '../../actions/getCharacters';

interface HomeProps {
  cards: Character[];
  error: boolean;
  countPages: number;
  setCards: Dispatch<SetStateAction<Character[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({
  cards,
  error,
  countPages,
  setCards,
  setLoading,
}) => {
  const navigate = useNavigate();

  const paginationButtons = Array.from({ length: countPages }, (_, i) => (
    <button key={i + 1} onClick={() => handlePageClick(i + 1)}>
      {i + 1}
    </button>
  ));

  async function handlePageClick(pageNumber: number) {
    navigate(`/page/${pageNumber}`);
    setLoading(true);
    const { results }: ApiResponse = await getCharacters(pageNumber);
    setCards(results);
    setLoading(false);
  }

  return (
    <>
      {error ? (
        <p className="app-loading alert">error data, try to reload page</p>
      ) : (
        <>
          <section className="cards">
            {cards?.length ? (
              cards.map((card: Character) => (
                <Card key={card.url} card={card} />
              ))
            ) : (
              <p className="app-loading">No search results</p>
            )}
          </section>
          <div>{paginationButtons}</div>
        </>
      )}
    </>
  );
};

export default Home;
