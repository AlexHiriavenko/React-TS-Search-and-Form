import { useSelector } from 'react-redux';
import { useGetPlanetQuery } from '../../redux/RTK-Query/swapi';
import { RootState } from '../../redux/rootStateType';

function PlanetList() {
  const planetURL = useSelector(
    (state: RootState) => state.characters.character.homeworld
  );

  const { data, error, isLoading } = useGetPlanetQuery(planetURL);
  const { name, climate, terrain, population } = data || {};

  return (
    <>
      {error && <span className="alert">error</span>}
      {isLoading && <span>Loading ...</span>}
      {!error && !isLoading && (
        <ul>
          <li>Planet name: {name}</li>
          <li>Planet Climate: {climate}</li>
          <li>Planet terrain: {terrain}</li>
          <li>Planet population: {population}</li>
        </ul>
      )}
    </>
  );
}

export default PlanetList;
