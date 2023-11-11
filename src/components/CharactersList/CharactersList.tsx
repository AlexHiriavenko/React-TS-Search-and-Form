import { useState, useContext } from 'react';
import { Character } from '../../actions/getCharacters';
import CharactersList_Item from '../CharactersList_Item/CharactersList_Item';
import { context } from '../Context/context';

function CharactersList() {
  const [activeItem, setActiveItem] = useState('');
  const cards = useContext(context).state.cards;

  function createKey(characterUrl: string) {
    characterUrl = characterUrl.slice(0, -1);
    return characterUrl.split('/').pop();
  }

  if (!cards?.length) {
    return <p className="app-loading">No search results</p>;
  }

  return (
    <ul>
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
