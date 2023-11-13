import { styled } from "styled-components";

interface ConatinerProps {
  children: React.ReactNode;
}

const StyledContainer = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 4rem;

  @media only screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

function Container({ children }: ConatinerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
