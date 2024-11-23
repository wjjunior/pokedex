import { LoadPokemonList } from "@/domain/usecases";
import { RemoteLoadPokemonList } from "@/data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteLoadPokemonList = (): LoadPokemonList => {
  return new RemoteLoadPokemonList(
    makeApiUrl("pokemon"),
    makeAxiosHttpClient(),
  );
};
