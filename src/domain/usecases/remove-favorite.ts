import { ApiSuccessModel } from "../models";
import { FavoritePokemonParams } from "./add-favorite";

export interface RemoveFavorite {
  removeFavorite: (params: FavoritePokemonParams) => Promise<ApiSuccessModel>;
}
