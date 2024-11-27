import { ApiSuccessModel } from "@/domain/models";
import { FavoritePokemonParams, Favorites } from "@/domain/usecases";

export class MockRemoteFavorites implements Favorites {
  addParams?: FavoritePokemonParams;
  removeParams?: FavoritePokemonParams;

  successResponse: ApiSuccessModel = { success: true };

  async add(params: FavoritePokemonParams): Promise<ApiSuccessModel> {
    this.addParams = params;
    return new Promise((resolve) => resolve(this.successResponse));
  }

  async remove(params: FavoritePokemonParams): Promise<ApiSuccessModel> {
    this.removeParams = params;
    return new Promise((resolve) => resolve(this.successResponse));
  }
}
