import { PokemonListModel } from "@/domain/models";

export interface LoadPokemonList {
  load: () => Promise<PokemonListModel>;
}
