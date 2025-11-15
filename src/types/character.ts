export interface Character {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    gender: string;
    image: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    episode: string[];
  }
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export interface CharacterLocationRef {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocationRef;
  location: CharacterLocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}
  export interface CharactersResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  }