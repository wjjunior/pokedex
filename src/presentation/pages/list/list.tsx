import React from "react";
import { LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { FavoritesProvider } from "@/presentation/contexts/favorites-context";
import { PokemonList } from "@/presentation/components";

type ListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
};

const List: React.FC<ListProps> = ({ loadPokemonList, loadPokemon }) => {
  return (
    <FavoritesProvider>
      <PokemonList
        loadPokemon={loadPokemon}
        loadPokemonList={loadPokemonList}
      />
    </FavoritesProvider>
  );
};

export default List;
