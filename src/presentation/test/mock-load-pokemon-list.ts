import { PokemonListModel } from "@/domain/models";
import { LoadPokemonList } from "@/domain/usecases";

export class LoadPokemonListSpy implements LoadPokemonList {
  callsCount = 0;

  async load(): Promise<PokemonListModel> {
    this.callsCount++;
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}
