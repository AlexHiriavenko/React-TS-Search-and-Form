interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
  [key: string]: unknown;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
export type { ApiResponse, Character };

const basicURL = 'https://swapi.dev/api/people/';

async function getCharacters(options?: string): Promise<ApiResponse> {
  const response = await fetch(options ? basicURL + options : basicURL);
  const data: ApiResponse = await response.json();
  return data;
}

export default getCharacters;
