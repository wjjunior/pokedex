import React from "react";
import styled, { useTheme } from "styled-components";

type SpinnerProps = {
  size?: string;
  color?: string;
};

const SpinnerWrapper = styled.div<{
  size: string;
  color: string;
  bgColor: string;
}>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 4px solid ${(props) => props.bgColor};
  border-top: 4px solid ${(props) => props.color};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner: React.FC<SpinnerProps> = ({ size = "24px", color }) => {
  const theme = useTheme();
  return (
    <SpinnerWrapper
      size={size}
      color={color || theme.colors.red}
      bgColor={theme.colors.defaultGray}
      role="status"
    />
  );
};
