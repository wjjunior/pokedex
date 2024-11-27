import React from "react";
import { Favorites, LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { FavoritesProvider } from "@/presentation/contexts/favorites-context";
import { PokemonList } from "@/presentation/components";

type ListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
  handleFavorites: Favorites;
};

const List: React.FC<ListProps> = ({
  loadPokemonList,
  loadPokemon,
  handleFavorites,
}) => {
  return (
    <FavoritesProvider>
      <PokemonList
        loadPokemon={loadPokemon}
        loadPokemonList={loadPokemonList}
        handleFavorites={handleFavorites}
      />
    </FavoritesProvider>
  );
};

export default List;
