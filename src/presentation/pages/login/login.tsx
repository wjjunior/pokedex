import React from "react";
import { Card, Button, Container, Input } from "./styles";

const LoginForm: React.FC = () => {
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

        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" disabled>
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

export default LoginForm;
