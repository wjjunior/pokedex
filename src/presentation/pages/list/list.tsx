import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  PokemonList,
  MorePokemonArea,
  NoMatchingAlert,
} from "./styles";
import { PokemonItem, SearchBar } from "@/presentation/components";
import { LoadPokemonList } from "@/domain/usecases";
import { PokemonListModel } from "@/domain/models";

type ListProps = {
  loadPokemonList: LoadPokemonList;
};

const mockPokemonList = [
  {
    id: 1,
    name: "bulbasaur",
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    },
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "poison" } },
    ],
  },
  {
    id: 4,
    name: "charmander",
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        },
      },
    },
    types: [{ slot: 1, type: { name: "fire" } }],
  },
];

const List: React.FC<ListProps> = ({ loadPokemonList }) => {
  const [state, setState] = useState({
    pokemonList: {} as PokemonListModel,
  });

  useEffect(() => {
    loadPokemonList.load().then((pokemonList) => setState({ pokemonList }));
  }, []);

  console.log(state);

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
          <PokemonList>
            {mockPokemonList.map((pokemon) => (
              <PokemonItem
                key={pokemon.id}
                pokemon={pokemon}
                sprite={pokemon.sprites.other["official-artwork"].front_default}
              />
            ))}
          </PokemonList>
        </section>

        <section>
          <MorePokemonArea>
            <button type="button" disabled>
              Load more Pokémon
            </button>
          </MorePokemonArea>

          {!mockPokemonList.length && (
            <NoMatchingAlert>
              <h3>No Pokémon matches your search!</h3>
            </NoMatchingAlert>
          )}
        </section>
      </main>
    </Container>
  );
};

export default List;