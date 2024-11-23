import { Chance } from "chance";
import { PokemonListItem, PokemonListModel } from "../models";

const chance = new Chance();

export const mockPokemonListModel = (): PokemonListModel => {
  const mockResults: PokemonListItem[] = Array.from({ length: 20 }, () => ({
    name: chance.word(),
    url: `https://pokeapi.co/api/v2/pokemon/${chance.integer({ min: 1, max: 1000 })}`,
  }));

  return {
    count: 1000,
    next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    previous: null,
    results: mockResults,
  };
};
