import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { PokemonListModel } from "@/domain/models";
import { LoadPokemonList } from "@/domain/usecases";

export class RemoteLoadPokemonList implements LoadPokemonList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<PokemonListModel>,
  ) {}
  async load(): Promise<PokemonListModel> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!;
      default:
        throw new UnexpectedError();
    }
  }
}
