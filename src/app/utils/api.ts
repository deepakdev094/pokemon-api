import axios from "axios";
import {
  Pokemon,
  PokemonDetails,
  PokemonResponse,
  PokemonApiResponse,
} from "../types/pokemon";

export const fetchPokemonList = async (
  url: string = "https://pokeapi.co/api/v2/pokemon",
): Promise<PokemonResponse | null> => {
  try {
    const response = await axios.get<PokemonResponse>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokémon data", error);
    return null;
  }
};

export const fetchPokemonDetails = async (
  url: string,
): Promise<PokemonDetails | null> => {
  try {
    const response = await axios.get<PokemonApiResponse>(url);
    return {
      type: response.data.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", "),
      image: response.data.sprites.front_default,
    };
  } catch (error) {
    console.error("Failed to fetch Pokémon details", error);
    return null;
  }
};
