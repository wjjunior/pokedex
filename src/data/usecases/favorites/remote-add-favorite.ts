import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { AddFavorite, FavoritePokemonParams } from "@/domain/usecases";

export class RemoteAddFavorite implements AddFavorite {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      FavoritePokemonParams,
      ApiSuccessModel
    >,
  ) {}

  async addFavorite(params: FavoritePokemonParams): Promise<ApiSuccessModel> {
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
}
