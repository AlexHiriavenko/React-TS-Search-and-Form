import { useState, useEffect, useContext } from 'react';
import getPlanet, { Planet } from '../../actions/getPlanet';
import PlanetList from '../PlanetList/PlanetList';
import { context } from '../Context/context';

function CharacterCard() {
  const { state, updateState } = useContext(context);
  const { currentCard, cards } = state;

  const [planet, setPlanet] = useState<Planet>({
    name: '',
    climate: '',
    terrain: '',
    population: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const setPlanetInfo = async (url: string): Promise<void> => {
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
    if (!currentCard) {
      setLoading(false);
      return;
    }

    const { homeworld } = currentCard;

    setPlanetInfo(homeworld);
  }, [currentCard]);

  if (!currentCard) {
    return cards.length ? (
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
      <button
        className="btnClose"
        data-testid="btnClose"
        onClick={() => updateState({ currentCard: null })}
      >
        X
      </button>
    </div>
  );
}

export default CharacterCard;
