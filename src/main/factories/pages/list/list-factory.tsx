import { List } from "@/presentation/pages";
import React from "react";
import {
  makeMockRemoteFavorites,
  makeRemoteLoadPokemon,
  makeRemoteLoadPokemonList,
} from "@/main/factories/usecases";

export const makeList = () => {
  return (
    <List
      loadPokemonList={makeRemoteLoadPokemonList()}
      loadPokemon={makeRemoteLoadPokemon()}
      handleFavorites={makeMockRemoteFavorites()}
    />
  );
};
