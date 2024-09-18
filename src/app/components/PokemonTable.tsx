"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "../utils/api";
import PokemonRow from "./PokemonRow";
import { Pokemon, PokemonDetails } from "../types/pokemon";

const PokemonTable: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [expandedPokemons, setExpandedPokemons] = useState<
    Record<string, PokemonDetails>
  >({});
  const [loading, setLoading] = useState<boolean>(false);

  const loadPokemonList = useCallback(
    async (url: string = "https://pokeapi.co/api/v2/pokemon") => {
      setLoading(true);
      const data = await fetchPokemonList(url);
      if (data) {
        setPokemonList((prevList) => [...prevList, ...data.results]);
        setNextUrl(data.next);
      }
      setLoading(false);
    },
    [],
  );

  const handleClick = useCallback(
    async (pokemonName: string, pokemonUrl: string) => {
      if (expandedPokemons[pokemonName]) return;

      const details = await fetchPokemonDetails(pokemonUrl);
      if (details) {
        setExpandedPokemons((prev) => ({
          ...prev,
          [pokemonName]: details,
        }));
      }
    },
    [expandedPokemons],
  );

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const bottom =
        event.currentTarget.scrollHeight ===
        event.currentTarget.scrollTop + event.currentTarget.clientHeight;
      if (bottom && nextUrl && !loading) {
        loadPokemonList(nextUrl);
      }
    },
    [nextUrl, loading, loadPokemonList],
  );

  useEffect(() => {
    loadPokemonList();
  }, [loadPokemonList]);

  return (
    <div onScroll={handleScroll} className="scroll-main h-screen overflow-auto">
      <div className="scroll-data">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              {Object.keys(expandedPokemons).length > 0 && (
                <>
                  <th className="table-header">Type</th>
                  <th className="table-header">Image</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon) => (
              <PokemonRow
                key={pokemon.name}
                pokemon={pokemon}
                onClick={handleClick}
                details={expandedPokemons[pokemon.name]}
              />
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default PokemonTable;
