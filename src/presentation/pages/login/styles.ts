import styled from "styled-components";

export const Container = styled.div`
  background-image: url("https://static.prod.pokemon.com/images/pikachu_pattern.png");
  background-repeat: repeat;
  background-size: auto;
  background-color: #f7f7f7; /* Light gray background to match the design */
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #6ee7b7;
    box-shadow: 0 0 0 2px rgba(110, 231, 183, 0.3);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #10b981;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    background-color: #059669;
  }
`;
