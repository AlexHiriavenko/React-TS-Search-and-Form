interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  [key: string]: unknown;
}

export type { Planet };

async function getPlanet(url: string): Promise<Planet> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Planet = await response.json();
  return data;
}

export default getPlanet;
