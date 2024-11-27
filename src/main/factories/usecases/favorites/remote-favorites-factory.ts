import { RemoteFavorites } from "@/data/usecases";
import { Favorites } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";

export const makeRemoteFavorite = (): Favorites => {
  return new RemoteFavorites(
    makeApiUrl("favorites"),
    makeAxiosHttpClient(),
    makeAxiosHttpClient(),
  );
};
