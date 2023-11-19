import { useDispatch } from 'react-redux';
import { Character } from '../../actions/getCharacters';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { setCharacter } from '../../redux/Slices/characters.slice';

interface CharacterProps {
  id: string | undefined;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
  card: Character;
}

type ItemIvent = MouseEvent<HTMLLIElement, globalThis.MouseEvent>;

function CharactersList_Item(props: CharacterProps) {
  const dispatch = useDispatch();
  const { id, activeItem, setActiveItem, card } = props;

  function handleClickItem(event: ItemIvent, card: Character | null): void {
    if (card) {
      dispatch(setCharacter(card));
      const idItem = event.currentTarget.id;
      setActiveItem(idItem);
    }
    return;
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
      {card?.name}
    </li>
  );
}

export default CharactersList_Item;
