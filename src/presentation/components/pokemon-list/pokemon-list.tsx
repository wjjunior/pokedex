import React from "react";
import {
  Container,
  Header,
  Title,
  PokemonListUl,
  MorePokemonArea,
  NoMatchingAlert,
} from "./styles";
import { PokemonItem, SearchBar, Spinner } from "@/presentation/components";
import { Favorites, LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { theme } from "@/presentation/theme/theme";
import { usePokemonList } from "@/presentation/hooks";
import { useFavorites } from "@/presentation/contexts/favorites-context";
import { PokemonModel } from "@/domain/models";

type PokemonListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
  handleFavorites: Favorites;
};

const PokemonList: React.FC<PokemonListProps> = ({
  loadPokemonList,
  loadPokemon,
  handleFavorites,
}) => {
  const {
    pokemonList,
    loading,
    hasMore,
    searchQuery,
    setSearchQuery,
    fetchPokemon,
    handleSearch,
  } = usePokemonList({ loadPokemonList, loadPokemon });

  const { favorites, setFavorites } = useFavorites();

  const handleAddFavorite = async (pokemon: PokemonModel) => {
    try {
      const response = await handleFavorites.add({ pokemonId: pokemon.id });
      if (response.success) {
        setFavorites([...favorites, pokemon]);
      }
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  const handleRemoveFavorite = async (pokemon: PokemonModel) => {
    try {
      const response = await handleFavorites.remove({
        pokemonId: pokemon.id,
      });
      if (response.success) {
        setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Pokédex</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
          }}
        >
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </form>
      </Header>
      <main>
        <section>
          {loading && pokemonList.length === 0 ? (
            <div className="flex justify-center my-3">
              <Spinner color={theme.colors.red} />
            </div>
          ) : (
            <PokemonListUl>
              {pokemonList.map((pokemon, index) => (
                <PokemonItem
                  key={`${pokemon.name}-${index}`}
                  pokemon={pokemon}
                  addFavorite={handleAddFavorite}
                  removeFavorite={handleRemoveFavorite}
                />
              ))}
            </PokemonListUl>
          )}
        </section>

        {!loading && (
          <section>
            <MorePokemonArea>
              {hasMore ? (
                <button type="button" onClick={() => fetchPokemon()}>
                  Load more Pokémon
                </button>
              ) : null}
            </MorePokemonArea>

            {!pokemonList.length && (
              <NoMatchingAlert>
                <h3>No Pokémon matches your search!</h3>
              </NoMatchingAlert>
            )}
          </section>
        )}
      </main>
    </Container>
  );
};

export default PokemonList;
