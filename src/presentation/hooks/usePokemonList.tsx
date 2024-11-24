import { useEffect, useState } from "react";
import { LoadPokemon, LoadPokemonList } from "@/domain/usecases";
import { PokemonModel } from "@/domain/models";

type UsePokemonListProps = {
  loadPokemonList: LoadPokemonList;
  loadPokemon: LoadPokemon;
};

type UsePokemonListState = {
  pokemonList: PokemonModel[];
  loading: boolean;
  hasMore: boolean;
  searchQuery: string;
  fetchPokemon: (query?: string) => Promise<void>;
  handleSearch: (query: string) => void;
  setSearchQuery: (query: string) => void;
};

export const usePokemonList = ({
  loadPokemonList,
  loadPokemon,
}: UsePokemonListProps): UsePokemonListState => {
  const [state, setState] = useState({
    pokemonList: [] as PokemonModel[],
    loading: true,
    offset: 0,
    limit: 20,
    hasMore: true,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPokemon = async (query?: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        pokemonList: [],
        loading: true,
      }));

      if (query) {
        try {
          const pokemon = await loadPokemon.load({ name: query });
          setState({
            pokemonList: pokemon ? [pokemon] : [],
            loading: false,
            hasMore: false,
            offset: 0,
            limit: state.limit,
          });
        } catch (error) {
          console.error("Error fetching Pokémon by ID or name:", error);
          setState({
            pokemonList: [],
            loading: false,
            hasMore: false,
            offset: 0,
            limit: state.limit,
          });
        }
        return;
      }

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
        offset: prevState.offset + prevState.limit,
      }));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleSearch = async (query: string) => {
    await fetchPokemon(query);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonList: state.pokemonList,
    loading: state.loading,
    hasMore: state.hasMore,
    searchQuery,
    setSearchQuery,
    fetchPokemon,
    handleSearch,
  };
};
