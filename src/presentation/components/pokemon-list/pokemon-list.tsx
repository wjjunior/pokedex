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
import { LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { theme } from "@/presentation/theme/theme";
import { usePokemonList } from "@/presentation/hooks";
import { FavoritesProvider } from "@/presentation/contexts/favorites-context";

type PokemonListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
};

const PokemonList: React.FC<PokemonListProps> = ({
  loadPokemonList,
  loadPokemon,
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

  return (
    <FavoritesProvider>
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
    </FavoritesProvider>
  );
};

export default PokemonList;
