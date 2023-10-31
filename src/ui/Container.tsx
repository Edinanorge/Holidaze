import { styled } from "styled-components";

interface ConatinerProps {
  children: React.ReactNode;
}

const StyledContainer = styled.div`
  position: relative;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

function Container({ children }: ConatinerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
