import { ApiSuccessModel } from "../models";

export type FavoritePokemonParams = {
  pokemonId: number;
};

export interface AddFavorite {
  addFavorite: (params: FavoritePokemonParams) => Promise<ApiSuccessModel>;
}
