import { PokemonModel } from "@/domain/models";
import { LoadPokemon } from "@/domain/usecases";

export class LoadPokemonSpy implements LoadPokemon {
  callsCount = 0;

  async load(): Promise<PokemonModel> {
    this.callsCount++;
    return {
      id: 1,
      name: "bulbasaur",
      base_experience: 64,
      height: 7,
      weight: 69,
      abilities: [
        {
          ability: {
            name: "overgrow",
            url: "https://pokeapi.co/api/v2/ability/65/",
          },
          is_hidden: false,
          slot: 1,
        },
      ],
      types: [
        {
          slot: 1,
          type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
        },
        {
          slot: 2,
          type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
        },
      ],
    } as PokemonModel;
  }
}
