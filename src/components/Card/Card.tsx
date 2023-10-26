import { Component } from 'react';
import { Character } from '../../actions/getCharacters';
import getPlanet, { Planet } from '../../actions/getPlanet';
import PlanetList from '../PlanetList/PlanetList';

interface CardProps {
  card: Character;
}

interface CardState {
  planet: Planet;
  loading: boolean;
  error: boolean;
}

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      planet: { name: '', climate: '', terrain: '', population: '' },
      loading: true,
      error: false,
    };
  }

  setPlanetInfo = async (url: string) => {
    try {
      const planetInfo = await getPlanet(url);
      this.setState({ planet: planetInfo, loading: false });
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount(): void {
    this.setPlanetInfo(this.props.card.homeworld);
  }

  render() {
    const { card: hero } = this.props;
    const planet = this.state.planet;
    const characterID = hero.url.replace("https://swapi.dev/api/people/", "").slice(0, -1);
    const characterPhoto = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterID}.jpg`
    
    return (
      <div className="card">
        <h3 className='card__title'>Hero Name: {hero.name}</h3>
        <img src={characterPhoto} alt="character photo" width={180}/>
        <ul className='card__list'>
          <li className='card__item'>gender : {hero.gender}</li>
          <li className='card__item'>birth year : {hero.birth_year}</li>
          <li className='card__item'>eye color : {hero.eye_color}</li>
          <li className='card__item'>hair color : {hero.hair_color}</li>
          <li className='card__item'>height : {hero.height}; weight : {hero.mass}</li>
          <li className='card__item'>
            home world :{' '}
            {this.state.loading ? 'Loading...' : this.state.error ? "error, try reload page" : <PlanetList planet={planet} />}
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
