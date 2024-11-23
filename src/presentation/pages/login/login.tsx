import React, { useState } from "react";
import { Card, Button, Container, Input } from "./styles";
import { Authentication } from "@/domain/usecases/authentication";
import { useRouter } from "next/router";
import { Spinner } from "@/presentation/components";

type LoginProps = {
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ authentication }) => {
  const router = useRouter();
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setState({ ...state, isLoading: true });
    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      document.cookie = `accessToken=${account.accessToken}`;
      router.push("/");
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Card>
        <div className="flex justify-center">
          <img
            src="https://access.pokemon.com/images/pokemon_logo.png"
            alt="Pokemon Logo"
            className="mx-auto mb-4 h-20"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            disabled={!state.email || !state.password || state.isLoading}
          >
            {state.isLoading ? <Spinner /> : "Login"}
          </Button>
        </form>
        <p className="text-xs mt-4 text-gray-400">
          ©2024 Pokémon. <br />
          ©1995–2024 Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.
        </p>
      </Card>
    </Container>
  );
};

export default Login;
