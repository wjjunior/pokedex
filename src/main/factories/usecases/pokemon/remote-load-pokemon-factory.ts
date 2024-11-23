import { RemoteLoadPokemon } from "@/data/usecases";
import { LoadPokemon } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteLoadPokemon = (): LoadPokemon => {
  return new RemoteLoadPokemon(makeApiUrl("pokemon"), makeAxiosHttpClient());
};
