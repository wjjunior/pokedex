import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 9999px;
  overflow: hidden;
  box-shadow: 0 2px 5px ${({ theme }) => theme.colors.boxShadow};
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryHover};
  }

  &:focus {
    outline: none;
  }
`;
