import { render } from "@testing-library/react";
import React from "react";
import List from "./list";
import { LoadPokemonListSpy } from "@/presentation/test/mock-load-pokemon-list";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";

describe("List Component", () => {
  test("Should call LoadSurveyList", () => {
    const { loadPokemonListSpy } = getRenderer();
    expect(loadPokemonListSpy.callsCount).toBe(1);
  });
});

function getRenderer() {
  const loadPokemonListSpy = new LoadPokemonListSpy();
  const renderer = render(
    <ThemeProvider theme={theme}>
      <List loadPokemonList={loadPokemonListSpy} />
    </ThemeProvider>,
  );
  return { ...renderer, loadPokemonListSpy };
}
