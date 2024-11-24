import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Heroicons for the search icon
import { SearchButton, SearchContainer, StyledInput } from "./styles";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <StyledInput
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <SearchButton>
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
