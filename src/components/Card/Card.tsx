import React, { useState, useEffect, useRef } from 'react';
import { Character } from '../../actions/getCharacters';
import getPlanet, { Planet } from '../../actions/getPlanet';
import PlanetList from '../PlanetList/PlanetList';

interface CardProps {
  card: Character;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const planetInitialState = {
    name: '',
    climate: '',
    terrain: '',
    population: '',
  };

  const [planet, setPlanet] = useState<Planet>(planetInitialState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  const characterID = card.url
    .replace('https://swapi.dev/api/people/', '')
    .slice(0, -1);
  const characterPhoto = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterID}.jpg`;

  const setPlanetInfo = async (url: string) => {
    try {
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
    setPlanetInfo(card.homeworld);

    // Отмена запроса при размонтировании компонента
    return () => {
      abortControllerRef.current.abort();
    };
  }, [card.homeworld]);

  return (
    <div className="card">
      <h3 className="card__title">Hero Name: {card.name}</h3>
      <img src={characterPhoto} alt="character photo" width={180} />
      <ul className="card__list">
        <li className="card__item">gender : {card.gender}</li>
        <li className="card__item">birth year : {card.birth_year}</li>
        <li className="card__item">eye color : {card.eye_color}</li>
        <li className="card__item">hair color : {card.hair_color}</li>
        <li className="card__item">
          height : {card.height}; weight : {card.mass}
        </li>
        <li className="card__item">
          home world :{' '}
          {loading ? (
            'Loading...'
          ) : error ? (
            'error, try reload page'
          ) : (
            <PlanetList planet={planet} />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Card;
