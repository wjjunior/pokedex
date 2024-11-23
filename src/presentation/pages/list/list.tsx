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
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await loadPokemonList.load();
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

        setState({ pokemonList: detailedPokemon, loading: false });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setState({ pokemonList: [], loading: false });
      }
    };

    fetchPokemon();
  }, [loadPokemonList, loadPokemon]);

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
          {state.loading ? (
            <Spinner />
          ) : (
            <PokemonList>
              {state.pokemonList.map((pokemon) => (
                <PokemonItem key={pokemon.id} pokemon={pokemon} />
              ))}
            </PokemonList>
          )}
        </section>

        {!state.loading && (
          <section>
            <MorePokemonArea>
              <button type="button" disabled>
                Load more Pokémon
              </button>
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
