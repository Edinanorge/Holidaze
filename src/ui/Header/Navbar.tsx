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
  z-index: 9999;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

function Navbar() {
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
export default Navbar;
