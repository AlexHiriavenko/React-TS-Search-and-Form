import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../actions/getCharacters';
import CharactersList_Item from '../CharactersList_Item/CharactersList_Item';

interface CharactersProps {
  cards: Character[];
  setCurrentCharacter: Dispatch<SetStateAction<Character | null>>;
}

function CharactersList({ cards, setCurrentCharacter }: CharactersProps) {
  const [activeItem, setActiveItem] = useState('');

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
          setCurrentCharacter={setCurrentCharacter}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </ul>
  );
}

export default CharactersList;
