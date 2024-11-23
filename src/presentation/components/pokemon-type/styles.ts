import styled from "styled-components";

interface TypeProps {
  type: string;
}

export const Type = styled.li<TypeProps>`
  list-style-type: none;
  border-radius: 20px;
  color: #fff;
  font-size: 15px;
  font-weight: bolder;
  text-align: center;
  padding: 8px 20px;
  margin-bottom: 10px;
  transform: translateY(10px);
  background-color: ${({ type, theme }) =>
    theme.colors.typeColors[type]?.light || theme.colors.defaultGray};

  @media (max-width: 500px) {
    padding: 3px 15px;
    font-size: 12px;
  }
`;
