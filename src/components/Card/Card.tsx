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
    return (
      <div className="card">
        <h3>Hero Name: {hero.name}</h3>
        <ul>
          <li>gender : {hero.gender}</li>
          <li>birth year : {hero.birth_year}</li>
          <li>eye color : {hero.eye_color}</li>
          <li>hair color : {hero.hair_color}</li>
          <li>height : {hero.height}</li>
          <li>weight : {hero.mass}</li>
          <li>
            home world :{' '}
            {this.state.loading ? 'Loading...' : <PlanetList planet={planet} />}
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
