import React from "react";
import { render } from "@testing-library/react";
import Login from "./login";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";

describe("Login Component", () => {
  test("Should start with initial state", () => {
    const { getByRole } = getRenderer();
    const submitButton = getByRole("button", {
      name: "Login",
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});

function getRenderer() {
  const renderer = render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>,
  );
  return { ...renderer };
}
