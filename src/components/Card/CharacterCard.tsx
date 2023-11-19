import { useSelector, useDispatch } from 'react-redux';
import PlanetList from '../PlanetList/PlanetList';
import { RootState } from '../../redux/rootStateType';
import { resetCharacter } from '../../redux/Slices/characters.slice';

function CharacterCard() {
  const dispatch = useDispatch();
  const currentCard = useSelector(
    (state: RootState) => state.characters.character
  );
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );

  if (!currentCard) {
    return characters.length ? (
      <p className="app-loading" data-testid="noActiveCardMessage">
        Select a Character
      </p>
    ) : null;
  }

  const { name, gender, birth_year, eye_color, hair_color, height, mass, url } =
    currentCard;

  const characterID = url
    .replace('https://swapi.dev/api/people/', '')
    .slice(0, -1);
  const characterPhoto = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterID}.jpg`;

  return (
    <div className="card" data-testid="character-info">
      <h3 className="card__title">Hero Name: {name}</h3>
      <img src={characterPhoto} alt="character photo" width={180} />
      <ul className="card__list">
        <li className="card__item">gender: {gender}</li>
        <li className="card__item">birth year: {birth_year}</li>
        <li className="card__item">eye color: {eye_color}</li>
        <li className="card__item">hair color: {hair_color}</li>
        <li className="card__item">
          height : {height}; weight : {mass}
        </li>
        <li className="card__item">
          home world: <PlanetList />
        </li>
      </ul>
      <button
        className="btnClose"
        data-testid="btnClose"
        onClick={() => dispatch(resetCharacter())}
      >
        X
      </button>
    </div>
  );
}

export default CharacterCard;
