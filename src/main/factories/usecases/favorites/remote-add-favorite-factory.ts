import { RemoteAddFavorite } from "@/data/usecases";
import { AddFavorite } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";

export const makeRemoteAddFavorite = (): AddFavorite => {
  return new RemoteAddFavorite(makeApiUrl("favorites"), makeAxiosHttpClient());
};
