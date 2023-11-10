import styled from "styled-components";

import { AiOutlineHome } from "react-icons/ai";
import Heading from "../Heading";

const StyledLogo = styled.a`
  color: var(--color-brand-50);
  font-weight: 800;
  display: flex;
  align-items: center;

  & h1 {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    font-size: 2.4rem;

    @media only screen and (max-width: 1000px) {
      display: none;
    }

    @media only screen and (max-width: 500px) {
      display: block;
    }
  }
  & svg {
    width: 4rem;
    height: 4rem;
  }
`;

function Logo() {
  return (
    <StyledLogo href="/">
      <AiOutlineHome />
      <Heading as="h1">holidaze</Heading>
    </StyledLogo>
  );
}

export default Logo;
