import { ApiSuccessModel } from "../models";

export type FavoritePokemonParams = {
  pokemonId: number;
};

export interface Favorites {
  add: (params: FavoritePokemonParams) => Promise<ApiSuccessModel>;
  remove: (params: FavoritePokemonParams) => Promise<ApiSuccessModel>;
}
