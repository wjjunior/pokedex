import React from "react";
import { Type } from "./styles";

interface PokemonTypeProps {
  type: string;
}

const PokemonType = ({ type }: PokemonTypeProps) => {
  return <Type type={type}>{type}</Type>;
};

export default PokemonType;
