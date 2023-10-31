import styled from "styled-components";

import { BiSearch } from "react-icons/bi";
import Button from "../Button";

const StyledSearch = styled.div`
  border: var(--border);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-lg);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const StyledSearchConatianer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;

  :not(:nth-last-child(-n + 2)) {
    border-right: 1px solid var(--color-gray-300);
    font-weight: 600;
  }
`;

const StyledSearchElement = styled.div`
  padding: 1rem;
`;

const ButtonSerach = styled(Button)`
  background-color: var(--color-brand-50);
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 100%;
  color: var(--color-gray-50);
`;

function Search() {
  return (
    <StyledSearch>
      <StyledSearchConatianer>
        <StyledSearchElement>
          <p>Anywhere</p>
        </StyledSearchElement>
        <StyledSearchElement>
          <p>Any week</p>
        </StyledSearchElement>
        <StyledSearchElement>
          <p>Add guests</p>
        </StyledSearchElement>
        <ButtonSerach>
          <BiSearch />
        </ButtonSerach>
      </StyledSearchConatianer>
    </StyledSearch>
  );
}

export default Search;
