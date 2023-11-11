import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Character } from '../../actions/getCharacters';
import getPlanet, { Planet } from '../../actions/getPlanet';
import PlanetList from '../PlanetList/PlanetList';

interface CardProps {
  currentCharacter: Character | null;
  resetCurrentCharacter: () => void;
  cards: Character[];
}

function CharacterCard(props: CardProps) {
  const { currentCharacter, cards, resetCurrentCharacter } = props;

  const [planet, setPlanet] = useState<Planet>({
    name: '',
    climate: '',
    terrain: '',
    population: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const setPlanetInfo = async (url: string) => {
    try {
      setError(false);
      setLoading(true);
      const planetInfo = await getPlanet(url);
      setPlanet(planetInfo);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (!currentCharacter) {
      setLoading(false);
      return;
    }

    const { homeworld } = currentCharacter;

    setPlanetInfo(homeworld);
  }, [currentCharacter]);

  if (!currentCharacter) {
    return cards.length ? (
      <p className="app-loading">Select a Character</p>
    ) : null;
  }

  const { name, gender, birth_year, eye_color, hair_color, height, mass, url } =
    currentCharacter;

  const characterID = url
    .replace('https://swapi.dev/api/people/', '')
    .slice(0, -1);
  const characterPhoto = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterID}.jpg`;

  return (
    <div className="card">
      <h3 className="card__title">Hero Name: {name}</h3>
      <img src={characterPhoto} alt="character photo" width={180} />
      <ul className="card__list">
        <li className="card__item">gender : {gender}</li>
        <li className="card__item">birth year : {birth_year}</li>
        <li className="card__item">eye color : {eye_color}</li>
        <li className="card__item">hair color : {hair_color}</li>
        <li className="card__item">
          height : {height}; weight : {mass}
        </li>
        <li className="card__item">
          home world :{' '}
          {loading ? (
            'Loading...'
          ) : error ? (
            <span className="alert">error, try reload page</span>
          ) : (
            <PlanetList planet={planet} />
          )}
        </li>
      </ul>
      <button className="btnClose" onClick={() => resetCurrentCharacter()}>
        X
      </button>
    </div>
  );
}

export default CharacterCard;
