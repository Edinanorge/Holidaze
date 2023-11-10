import styled from "styled-components";

export const GridAuto = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  justify-content: center;

  gap: 2rem;
  row-gap: 6rem;
`;

export const GridCols = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  justifi-content: center;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem;

  & p {
    font-weight: 600;
  }
  & a {
    display: block;
  }
`;

export const GridColsTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
`;
