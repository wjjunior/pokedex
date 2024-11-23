import React from "react";
import { Container, Index, Header, Section } from "./styles";
import { PokemonType } from "..";

interface PokemonItemProps {
  pokemon: Pokemon;
  sprite: string;
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Type[];
}

interface Type {
  slot: number;
  type: {
    name: string;
  };
}

const PokemonItem = ({ pokemon, sprite }: PokemonItemProps) => {
  return (
    <Container type={`${pokemon.types[0].type.name}`}>
      <Header nameLength={pokemon.name.length}>
        <h3>{pokemon.name}</h3>
        <Index>#{`000${pokemon.id}`.slice(-3)}</Index>
      </Header>
      <Section sprite={sprite}>
        <ul>
          {pokemon.types.map((type) => (
            <PokemonType key={type.slot} type={type.type.name} />
          ))}
        </ul>
        <div id="pokemon_image" />
      </Section>
    </Container>
  );
};

export default PokemonItem;
