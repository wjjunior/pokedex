import { PokemonListModel } from "@/domain/models";

export type LoadPokemonListParams = {
  limit?: number;
  offset?: number;
};
export interface LoadPokemonList {
  load: (params?: LoadPokemonListParams) => Promise<PokemonListModel>;
}
