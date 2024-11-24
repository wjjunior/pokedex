import { render, waitFor } from "@testing-library/react";
import React from "react";
import List from "./list";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";
import { LoadPokemonListSpy, LoadPokemonSpy } from "@/presentation/test";
import userEvent from "@testing-library/user-event";

describe("List Component", () => {
  test("Should call LoadPokemonList", () => {
    const { loadPokemonListSpy } = getRenderer();
    expect(loadPokemonListSpy.callsCount).toBe(1);
  });

  test("Should call LoadPokemon for each result in LoadPokemonList", async () => {
    const loadPokemonListSpy = new LoadPokemonListSpy();

    loadPokemonListSpy.load = jest.fn().mockResolvedValueOnce({
      count: 3,
      next: null,
      previous: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    });

    const { loadPokemonSpy } = getRenderer(loadPokemonListSpy);

    await waitFor(() => {
      expect(loadPokemonSpy.callsCount).toBe(3);
    });
  });

  test("Should load more Pokémon when 'Load more Pokémon' button is clicked", async () => {
    const loadPokemonListSpy = new LoadPokemonListSpy();
    const loadPokemonSpy = new LoadPokemonSpy();

    loadPokemonListSpy.load = jest
      .fn()
      .mockResolvedValueOnce({
        count: 6,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        ],
      })
      .mockResolvedValueOnce({
        count: 6,
        next: null,
        previous: null,
        results: [
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
          { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
          { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
        ],
      });

    const { getByText } = getRenderer(loadPokemonListSpy, loadPokemonSpy);

    await waitFor(() => {
      expect(loadPokemonListSpy.load).toHaveBeenCalledWith({
        offset: 0,
        limit: 20,
      });
      expect(getByText("Load more Pokémon")).toBeInTheDocument();
    });

    const loadMoreButton = getByText("Load more Pokémon");
    await userEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(loadPokemonListSpy.load).toHaveBeenCalledWith({
        offset: 20,
        limit: 20,
      });
    });

    expect(loadPokemonSpy.callsCount).toBe(6);
  });
});

function getRenderer(
  loadPokemonListSpy = new LoadPokemonListSpy(),
  loadPokemonSpy = new LoadPokemonSpy(),
) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <List
          loadPokemonList={loadPokemonListSpy}
          loadPokemon={loadPokemonSpy}
        />
      </ThemeProvider>,
    ),
    loadPokemonListSpy,
    loadPokemonSpy,
  };
}
