import React, { createContext, useContext, useState } from "react";
import { PokemonModel } from "@/domain/models";

type FavoritesContextType = {
  favorites: PokemonModel[];
  toggleFavorite: (pokemon: PokemonModel) => void;
  isFavorite: (pokemonId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<PokemonModel[]>([]);

  const toggleFavorite = (pokemon: PokemonModel) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.id === pokemon.id,
      );
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
