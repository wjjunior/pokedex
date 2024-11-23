import styled, { css } from "styled-components";

interface ContainerProps {
  type: string;
}

interface HeaderProps {
  nameLength: number;
}

interface SectionProps {
  sprite: string | null;
}

export const Container = styled.li<ContainerProps>`
  width: 100%;
  height: 205px;
  border-radius: 30px;
  padding: 25px 10px 30px 20px;
  list-style-type: none;
  box-shadow: 0px 0px 15px -5px ${({ theme }) => theme.colors.boxShadow};
  background-image: url("/pokeball.svg");
  background-repeat: no-repeat;
  background-size: 45%;
  background-position: bottom right;
  transition: transform 0.5s;
  background-color: ${({ type, theme }) =>
    theme.colors.typeColors[type]?.dark || theme.colors.defaultGray};
  background-blend-mode: soft-light;

  &:hover {
    transform: translate(0, -10px);
    cursor: pointer;
  }
`;

export const Index = styled.span`
  font-weight: 900;
  font-size: 25px;
  opacity: 0.5;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "nameLength",
})<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bolder;
  font-size: 23px;
  margin-bottom: 15px;

  h3 {
    transform: translateY(5px);

    ${({ nameLength }) =>
      nameLength > 12 &&
      css`
        font-size: 20px;
      `}
  }
`;

export const Section = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== "sprite",
})<SectionProps>`
  display: flex;
  padding-bottom: 20px;
  height: 100%;

  ul {
    display: flex;
    flex-direction: column;
  }

  div#pokemon_image {
    ${({ sprite }) =>
      sprite &&
      css`
        background-image: url(${sprite});
      `}

    width: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    transform: translateY(-10px);
  }
`;
