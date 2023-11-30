import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
