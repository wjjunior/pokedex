import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  PokemonList,
  MorePokemonArea,
  NoMatchingAlert,
} from "./styles";
import { PokemonItem, SearchBar, Spinner } from "@/presentation/components";
import { LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { PokemonModel } from "@/domain/models";

type ListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
};

const List: React.FC<ListProps> = ({ loadPokemonList, loadPokemon }) => {
  const [state, setState] = useState({
    pokemonList: [] as PokemonModel[],
    loading: true,
    offset: 0,
    limit: 20,
    hasMore: true,
  });

  const fetchPokemon = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      const response = await loadPokemonList.load({
        offset: state.offset,
        limit: state.limit,
      });
      const pokemonResults = response.results;

      const results = await Promise.allSettled(
        pokemonResults.map(async (pokemon: { name: string; url: string }) => {
          const pokemonDetail = await loadPokemon.load({
            name: pokemon.name,
          });
          return pokemonDetail;
        }),
      );

      const detailedPokemon = results
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) => (result as PromiseFulfilledResult<PokemonModel>).value,
        );

      setState((prevState) => ({
        ...prevState,
        pokemonList: [...prevState.pokemonList, ...detailedPokemon],
        loading: false,
        hasMore: !!response.next,
        offset: prevState.offset + state.limit,
      }));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pokédex</Title>
        <form>
          <SearchBar />
        </form>
      </Header>
      <main>
        <section>
          {state.loading && state.pokemonList.length === 0 ? (
            <Spinner />
          ) : (
            <PokemonList>
              {state.pokemonList.map((pokemon, index) => (
                <PokemonItem
                  key={`${pokemon.name}-${index}`}
                  pokemon={pokemon}
                />
              ))}
            </PokemonList>
          )}
        </section>

        {!state.loading && (
          <section>
            <MorePokemonArea>
              {state.hasMore ? (
                <button type="button" onClick={fetchPokemon}>
                  Load more Pokémon
                </button>
              ) : (
                <p>No more Pokémon to load</p>
              )}
            </MorePokemonArea>

            {!state.pokemonList.length && (
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

export default List;
