import React from "react";
import { Pokemon, PokemonDetails } from "../types/pokemon";

interface PokemonRowProps {
  pokemon: Pokemon;
  onClick: (pokemonName: string, pokemonUrl: string) => void;
  details?: PokemonDetails;
}

const PokemonRow: React.FC<PokemonRowProps> = ({
  pokemon,
  onClick,
  details,
}) => (
  <tr className="group table-row">
    <td
      onClick={() => onClick(pokemon.name, pokemon.url)}
      className="table-cell-text table-cell cursor-pointer"
    >
      {pokemon.name}
    </td>
    {details && (
      <>
        <td className="table-cell-text table-cell">{details.type}</td>
        <td className="table-cell">
          <img src={details.image} alt={pokemon.name} className="img-small" />
        </td>
      </>
    )}
  </tr>
);

export default PokemonRow;
