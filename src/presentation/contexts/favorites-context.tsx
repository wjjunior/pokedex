import React, { createContext, useContext, useState } from "react";
import { PokemonModel } from "@/domain/models";

type FavoritesContextType = {
  favorites: PokemonModel[];
  toggleFavorite: (pokemon: PokemonModel) => Promise<void>;
  isFavorite: (pokemonId: number) => boolean;
  setFavorites: React.Dispatch<React.SetStateAction<PokemonModel[]>>; // Add this line
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<PokemonModel[]>([]);

  const toggleFavorite = async (pokemon: PokemonModel) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    if (isAlreadyFavorite) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== pokemon.id));
    } else {
      setFavorites((prev) => [...prev, pokemon]);
    }
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        setFavorites, // Provide the setFavorites function
      }}
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
