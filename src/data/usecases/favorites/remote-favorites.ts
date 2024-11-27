import {
  HttpDeleteClient,
  HttpPostClient,
  HttpStatusCode,
} from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { FavoritePokemonParams, Favorites } from "@/domain/usecases";

export class RemoteFavorites implements Favorites {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      FavoritePokemonParams,
      ApiSuccessModel
    >,
    private readonly httpDeleteClient: HttpDeleteClient<
      FavoritePokemonParams,
      ApiSuccessModel
    >,
  ) {}

  async add(params: FavoritePokemonParams): Promise<ApiSuccessModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body!;
      default:
        throw new UnexpectedError();
    }
  }

  async remove(params: FavoritePokemonParams): Promise<ApiSuccessModel> {
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
