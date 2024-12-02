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
  position: relative;

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

  .heart-icon {
    position: absolute;
    bottom: 12px;
    right: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition:
      opacity 0.3s ease,
      color 0.3s ease;

    &.icon-outline {
      color: ${({ theme }) => theme.colors.white};
      opacity: 1;
    }

    &.icon-solid {
      color: ${({ theme }) => theme.colors.red400};
      opacity: 0;
    }

    &:hover {
      &.icon-outline {
        opacity: 0;
      }

      &.icon-solid {
        opacity: 1;
      }
    }

    /* Adjust visibility based on favorite state */
    &.favorite {
      &.icon-outline {
        opacity: 0; /* Hide outline when favorite */
      }

      &.icon-solid {
        opacity: 1; /* Show solid when favorite */
      }
    }
  }
`;
