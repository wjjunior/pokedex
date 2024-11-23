import React, { useState } from "react";
import { Card, Button, Container, Input } from "./styles";
import { Authentication } from "@/domain/usecases/authentication";

type LoginProps = {
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ authentication }) => {
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
    await authentication.auth({ email: state.email, password: state.password });
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
            Login
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
