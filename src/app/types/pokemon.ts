export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  type: string;
  image: string;
}

export interface PokemonResponse {
  results: Pokemon[];
  next: string | null;
}

export interface PokemonApiResponse {
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}
