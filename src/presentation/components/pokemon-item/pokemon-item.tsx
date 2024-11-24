import React from "react";
import { Container, Index, Header, Section } from "./styles";
import { PokemonType } from "..";
import { PokemonModel } from "@/domain/models";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useFavorites } from "@/presentation/contexts/favorites-context";

interface PokemonItemProps {
  pokemon: PokemonModel;
}

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
  const sprite = pokemon.sprites?.other
    ? pokemon.sprites.other["official-artwork"].front_default
    : "";

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

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
        <div className="relative" onClick={() => toggleFavorite(pokemon)}>
          {favorite ? (
            <SolidHeartIcon className="heart-icon icon-solid favorite" />
          ) : (
            <>
              <OutlineHeartIcon className="heart-icon icon-outline" />
              <SolidHeartIcon className="heart-icon icon-solid" />
            </>
          )}
        </div>
      </Section>
    </Container>
  );
};

export default PokemonItem;
