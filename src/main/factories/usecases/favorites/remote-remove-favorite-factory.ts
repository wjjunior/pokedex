import { RemoteRemoveFavorite } from "@/data/usecases";
import { RemoveFavorite } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";

export const makeRemoteRemoveFavorite = (): RemoveFavorite => {
  return new RemoteRemoveFavorite(
    makeApiUrl("favorites"),
    makeAxiosHttpClient(),
  );
};
