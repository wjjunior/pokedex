import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import List from "./list";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";
import { LoadPokemonListSpy, LoadPokemonSpy } from "@/presentation/test";
import { mockPokemon } from "@/domain/test";

const MOCK_POKEMON_LIST = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
];

function setup(
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

describe("List Component", () => {
  describe("Initial Rendering", () => {
    test("Should call LoadPokemonList on render", () => {
      const { loadPokemonListSpy } = setup();
      expect(loadPokemonListSpy.callsCount).toBe(1);
    });

    test("Should call LoadPokemon for each result in LoadPokemonList", async () => {
      const loadPokemonListSpy = new LoadPokemonListSpy();
      loadPokemonListSpy.load = jest.fn().mockResolvedValueOnce({
        count: 3,
        next: null,
        previous: null,
        results: MOCK_POKEMON_LIST,
      });

      const { loadPokemonSpy } = setup(loadPokemonListSpy);

      await waitFor(() => {
        expect(loadPokemonSpy.callsCount).toBe(3);
      });
    });
  });

  describe("Load More Pokémon", () => {
    test("Should load more Pokémon when 'Load more Pokémon' button is clicked", async () => {
      const loadPokemonListSpy = new LoadPokemonListSpy();
      loadPokemonListSpy.load = jest
        .fn()
        .mockResolvedValueOnce({
          count: 6,
          next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
          previous: null,
          results: MOCK_POKEMON_LIST,
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

      const { getByText } = setup(loadPokemonListSpy);

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
    });
  });

  describe("Search Pokémon", () => {
    test("Should display search results when a valid query is entered", async () => {
      const loadPokemonSpy = new LoadPokemonSpy();
      const pokemon = mockPokemon({ name: "bulbasaur" });
      loadPokemonSpy.load = jest.fn().mockResolvedValueOnce(pokemon);

      const { getByPlaceholderText, getByText } = setup(
        undefined,
        loadPokemonSpy,
      );

      const searchBar = getByPlaceholderText("Search...");
      await userEvent.type(searchBar, "bulbasaur");
      await userEvent.keyboard("{Enter}");

      await waitFor(() => {
        expect(loadPokemonSpy.load).toHaveBeenCalledWith({ name: "bulbasaur" });
      });

      await waitFor(() => {
        expect(getByText("bulbasaur")).toBeInTheDocument();
      });
    });

    test("Should display 'No Pokémon matches your search!' when no results are found", async () => {
      const loadPokemonSpy = new LoadPokemonSpy();
      loadPokemonSpy.load = jest
        .fn()
        .mockRejectedValueOnce(new Error("Not Found"));

      const { getByPlaceholderText, getByText } = setup(
        undefined,
        loadPokemonSpy,
      );

      const searchBar = getByPlaceholderText("Search...");
      await userEvent.type(searchBar, "invalid-query");
      await userEvent.keyboard("{Enter}");

      await waitFor(() => {
        expect(loadPokemonSpy.load).toHaveBeenCalledWith({
          name: "invalid-query",
        });
      });

      await waitFor(() => {
        expect(
          getByText("No Pokémon matches your search!"),
        ).toBeInTheDocument();
      });
    });
  });
});
