import { List } from "@/presentation/pages";
import React from "react";
import { makeRemoteLoadPokemonList } from "@/main/factories/usecases";

export const makeList = () => {
  return <List loadPokemonList={makeRemoteLoadPokemonList()} />;
};
