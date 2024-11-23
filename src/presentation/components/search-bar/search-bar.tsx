import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Heroicons for the search icon
import { SearchButton, SearchContainer, StyledInput } from "./styles";

const SearchBar: React.FC = () => {
  return (
    <SearchContainer>
      <StyledInput type="text" placeholder="Search..." />
      <SearchButton>
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
