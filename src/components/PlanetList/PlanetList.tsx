import { Component, ReactNode } from 'react';

interface PlanetListProps {
  planet: {
    name: string;
    climate: string;
    terrain: string;
    population: string;
  };
}

class PlanetList extends Component<PlanetListProps> {
  constructor(props: PlanetListProps) {
    super(props);
  }

  render(): ReactNode {
    const {
      name = '',
      climate = '',
      terrain = '',
      population = '',
    } = this.props.planet || {};
    return (
      <ul>
        <li>Planet name: {name}</li>
        <li>Planet Climate: {climate}</li>
        <li>Planet terrain: {terrain}</li>
        <li>Planet population: {population}</li>
      </ul>
    );
  }
}

export default PlanetList;
