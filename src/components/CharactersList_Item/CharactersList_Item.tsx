import { Character } from '../../actions/getCharacters';
import { Dispatch, SetStateAction, MouseEvent } from 'react';

interface CharacterProps {
  card: Character;
  id: string | undefined;
  setCurrentCharacter: Dispatch<SetStateAction<Character | null>>;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}

type ItemIvent = MouseEvent<HTMLLIElement, globalThis.MouseEvent>;

function CharactersList_Item({
  card,
  id,
  activeItem,
  setCurrentCharacter,
  setActiveItem,
}: CharacterProps) {
  function handleClickItem(event: ItemIvent, card: Character): void {
    setCurrentCharacter(card);
    const idItem = event.currentTarget.id;
    setActiveItem(idItem);
  }

  function isActiveItem(activeItem: string, id: string = ''): boolean {
    return activeItem === id;
  }

  return (
    <li
      className={
        isActiveItem(activeItem, id)
          ? 'character-title active'
          : 'character-title'
      }
      onClick={(event) => handleClickItem(event, card)}
      id={id}
    >
      {card.name}
    </li>
  );
}

export default CharactersList_Item;
