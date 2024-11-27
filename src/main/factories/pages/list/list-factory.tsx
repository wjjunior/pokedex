import { List } from "@/presentation/pages";
import React from "react";
import {
  makeRemoteFavorite,
  makeRemoteLoadPokemon,
  makeRemoteLoadPokemonList,
} from "@/main/factories/usecases";

export const makeList = () => {
  return (
    <List
      loadPokemonList={makeRemoteLoadPokemonList()}
      loadPokemon={makeRemoteLoadPokemon()}
      handleFavorites={makeRemoteFavorite()}
    />
  );
};
