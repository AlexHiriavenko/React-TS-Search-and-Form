import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Character } from '../../actions/getCharacters';
import CharactersList_Item from '../CharactersList_Item/CharactersList_Item';
import { context } from '../Context/context';
import { useGetCharactersQuery } from '../../redux/RTK-Query/swapi';

function CharactersList() {
  const [activeItem, setActiveItem] = useState('');
  // const cards = useContext(context).state.cards;
  const location = useLocation();

  const searchParam = useContext(context).state.searchParam;
  console.log(searchParam);
  const searchParams = {
    searchParam: searchParam,
    pageNumber: Number(location.pathname.split('/').pop()) || 1,
  };
  const cards = useGetCharactersQuery(searchParams).data?.results || [];

  function createKey(characterUrl: string) {
    characterUrl = characterUrl.slice(0, -1);
    return characterUrl.split('/').pop();
  }

  if (!cards?.length) {
    return <p className="app-loading">No search results</p>;
  }

  return (
    <ul data-testid="characters-list">
      {cards.map((card: Character) => (
        <CharactersList_Item
          key={createKey(card.url)}
          id={createKey(card.url)}
          card={card}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </ul>
  );
}

export default CharactersList;
