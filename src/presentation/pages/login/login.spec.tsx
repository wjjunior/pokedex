import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./login";
import { theme } from "@/presentation/theme/theme";
import { ThemeProvider } from "styled-components";
import chance from "chance";
import { AuthenticationSpy } from "@/presentation/test";
import "jest-localstorage-mock";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });
  test("Should start with initial state", () => {
    const { getByRole } = getRenderer();
    const submitButton = getByRole("button", {
      name: "Login",
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should call Authentication with correct values", async () => {
    const { getByPlaceholderText, getByRole, authenticationSpy } =
      getRenderer();

    const emailInput = getByPlaceholderText("Email");
    const email = chance().email();
    await userEvent.type(emailInput, email);
    const passwordInput = getByPlaceholderText("Password");
    const password = chance().string({
      length: 12,
    });
    await userEvent.type(passwordInput, password);

    const submitButton = getByRole("button", {
      name: "Login",
    }) as HTMLButtonElement;
    await userEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("Should show spinner during form submission", async () => {
    const {
      getByPlaceholderText,
      getByRole,
      getByLabelText,
      authenticationSpy,
    } = getRenderer();

    const emailInput = getByPlaceholderText("Email");
    const email = chance().email();
    await userEvent.type(emailInput, email);

    const passwordInput = getByPlaceholderText("Password");
    const password = chance().string({ length: 12 });
    await userEvent.type(passwordInput, password);

    const submitButton = getByRole("button", { name: "Login" });

    authenticationSpy.auth = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ accessToken: "fake-token" }), 2000),
        ),
    );

    await userEvent.click(submitButton);

    const spinner = getByLabelText("loading");

    expect(submitButton).toHaveAttribute("disabled");
    expect(spinner).toBeInTheDocument();

    await authenticationSpy.auth;

    expect(submitButton.querySelector(".spinner")).not.toBeInTheDocument();
  });
});

function getRenderer() {
  const authenticationSpy = new AuthenticationSpy();
  const renderer = render(
    <ThemeProvider theme={theme}>
      <Login authentication={authenticationSpy} />
    </ThemeProvider>,
  );
  return { ...renderer, authenticationSpy };
}
