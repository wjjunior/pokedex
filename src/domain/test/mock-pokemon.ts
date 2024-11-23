import { Chance } from "chance";
import { PokemonModel } from "../models";

const chance = new Chance();

export const mockPokemon = (): PokemonModel => {
  return {
    id: chance.integer({ min: 1, max: 1000 }),
    name: chance.word(),
    base_experience: chance.integer({ min: 50, max: 300 }),
    height: chance.integer({ min: 1, max: 20 }),
    weight: chance.integer({ min: 1, max: 1000 }),
    abilities: Array.from(
      { length: chance.integer({ min: 1, max: 3 }) },
      (_, i) => ({
        ability: {
          name: chance.word(),
          url: `https://pokeapi.co/api/v2/ability/${i + 1}/`,
        },
        is_hidden: chance.bool(),
        slot: i + 1,
      }),
    ),
    forms: Array.from({ length: 1 }, () => ({
      name: chance.word(),
      url: `https://pokeapi.co/api/v2/pokemon-form/${chance.integer({ min: 1, max: 1000 })}/`,
    })),
    game_indices: Array.from(
      { length: chance.integer({ min: 1, max: 5 }) },
      (_, i) => ({
        game_index: chance.integer({ min: 1, max: 100 }),
        version: {
          name: chance.word(),
          url: `https://pokeapi.co/api/v2/version/${i + 1}/`,
        },
      }),
    ),
    held_items: [],
    location_area_encounters: `https://pokeapi.co/api/v2/pokemon/${chance.integer({ min: 1, max: 1000 })}/encounters`,
    moves: Array.from(
      { length: chance.integer({ min: 1, max: 5 }) },
      (_, i) => ({
        move: {
          name: chance.word(),
          url: `https://pokeapi.co/api/v2/move/${i + 1}/`,
        },
        version_group_details: [],
      }),
    ),
    species: {
      name: chance.word(),
      url: `https://pokeapi.co/api/v2/pokemon-species/${chance.integer({ min: 1, max: 1000 })}/`,
    },
    sprites: {
      back_default: chance.url(),
      back_female: null,
      back_shiny: chance.url(),
      back_shiny_female: null,
      front_default: chance.url(),
      front_female: null,
      front_shiny: chance.url(),
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default: chance.url(),
          front_female: null,
        },
        "official-artwork": {
          front_default: chance.url(),
        },
      },
    },
    stats: Array.from({ length: 6 }, (_, i) => ({
      base_stat: chance.integer({ min: 1, max: 150 }),
      effort: chance.integer({ min: 0, max: 3 }),
      stat: {
        name: `stat-${i + 1}`,
        url: `https://pokeapi.co/api/v2/stat/${i + 1}/`,
      },
    })),
    types: Array.from(
      { length: chance.integer({ min: 1, max: 2 }) },
      (_, i) => ({
        slot: i + 1,
        type: {
          name: chance.pickone([
            "normal",
            "fire",
            "water",
            "electric",
            "grass",
            "ice",
            "fighting",
            "poison",
            "ground",
            "flying",
            "psychic",
            "bug",
            "rock",
            "ghost",
            "dragon",
            "dark",
            "steel",
            "fairy",
          ]),
          url: `https://pokeapi.co/api/v2/type/${i + 1}/`,
        },
      }),
    ),
  };
};
