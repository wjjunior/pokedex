import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { PokemonModel } from "@/domain/models";
import { LoadPokemon, LoadPokemonParams } from "@/domain/usecases";

export class RemoteLoadPokemon implements LoadPokemon {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      LoadPokemonParams,
      PokemonModel
    >,
  ) {}
  async load(params?: LoadPokemonParams): Promise<PokemonModel> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      ...(params && { pathParams: [params.name] }),
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!;
      default:
        throw new UnexpectedError();
    }
  }
}
