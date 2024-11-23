import { List } from "@/presentation/pages";
import React from "react";
import { makeRemoteLoadPokemonList } from "@/main/factories/usecases";
import { makeRemoteLoadPokemon } from "../../usecases/pokemon/remote-load-pokemon-factory";

export const makeList = () => {
  return (
    <List
      loadPokemonList={makeRemoteLoadPokemonList()}
      loadPokemon={makeRemoteLoadPokemon()}
    />
  );
};
