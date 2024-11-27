import { Favorites } from "@/domain/usecases";
import { MockRemoteFavorites } from "@/main/test";

export const makeMockRemoteFavorites = (): Favorites => {
  return new MockRemoteFavorites();
};
