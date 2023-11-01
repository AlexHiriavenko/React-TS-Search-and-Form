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

async function getCharacters(
  pageNumber?: string | number
): Promise<ApiResponse> {
  try {
    const endPoint = `${basicURL}?page=${pageNumber}`;
    const response = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
}

export default getCharacters;
