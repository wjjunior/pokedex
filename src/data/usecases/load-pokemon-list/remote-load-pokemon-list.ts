import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { PokemonListModel } from "@/domain/models";
import { LoadPokemonList, LoadPokemonListParams } from "@/domain/usecases";

export class RemoteLoadPokemonList implements LoadPokemonList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      LoadPokemonListParams,
      PokemonListModel
    >,
  ) {}
  async load(params?: LoadPokemonListParams): Promise<PokemonListModel> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      ...(params && { queryParams: params }),
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!;
      default:
        throw new UnexpectedError();
    }
  }
}
