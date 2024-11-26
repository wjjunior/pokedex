import { HttpDeleteClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { RemoveFavorite, FavoritePokemonParams } from "@/domain/usecases";

export class RemoteRemoveFavorite implements RemoveFavorite {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<
      FavoritePokemonParams,
      ApiSuccessModel
    >,
  ) {}

  async removeFavorite(
    params: FavoritePokemonParams,
  ): Promise<ApiSuccessModel> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: `${this.url}/${params.pokemonId}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.noContent:
        return httpResponse.body!;
      default:
        throw new UnexpectedError();
    }
  }
}
