import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Character } from '../../actions/getCharacters';
import CharactersList_Item from '../CharactersList_Item/CharactersList_Item';

import { RootState } from '../../redux/rootStateType';

function CharactersList() {
  const [activeItem, setActiveItem] = useState('');

  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );

  function createKey(characterUrl: string) {
    characterUrl = characterUrl.slice(0, -1);
    return characterUrl.split('/').pop();
  }

  if (!characters?.length) {
    return <p className="app-loading">No search results</p>;
  }

  return (
    <ul data-testid="characters-list">
      {characters.map((card: Character) => (
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
