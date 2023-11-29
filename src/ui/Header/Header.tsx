import styled from "styled-components";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  background-color: var(--color-gray-0);
  border-bottom: var(--border);
  z-index: 999;

  @media only screen and (max-width: 500px) {
    padding-x: 0;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

function Header() {
  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <Logo />
          <Search />
          <UserMenu />
        </StyledNav>
      </Container>
    </StyledHeader>
  );
}
export default Header;
