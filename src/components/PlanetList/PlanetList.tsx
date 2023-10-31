import React, { ReactNode } from 'react';

interface PlanetListProps {
  planet: {
    name: string;
    climate: string;
    terrain: string;
    population: string;
  };
}

const PlanetList: React.FC<PlanetListProps> = ({ planet }): ReactNode => {
  const {
    name = '',
    climate = '',
    terrain = '',
    population = '',
  } = planet || {};

  return (
    <ul>
      <li>Planet name: {name}</li>
      <li>Planet Climate: {climate}</li>
      <li>Planet terrain: {terrain}</li>
      <li>Planet population: {population}</li>
    </ul>
  );
};

export default PlanetList;
