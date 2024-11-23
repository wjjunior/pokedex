import { PokemonModel } from "../models";

export type LoadPokemonParams = {
  name: string;
};
export interface LoadPokemon {
  load: (params?: LoadPokemonParams) => Promise<PokemonModel>;
}
