import { render, waitFor } from "@testing-library/react";
import React from "react";
import List from "./list";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";
import { LoadPokemonListSpy, LoadPokemonSpy } from "@/presentation/test";

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
