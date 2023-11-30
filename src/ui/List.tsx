import styled from "styled-components";
import { GridCols } from "./Grid";

export const ListHorizonlat = styled(GridCols)`
  padding: 3rem 0;
  display: grid;
  grid-template-cols: ;
  gap: 4rem;
  min-height: 50vh;

  @media only screen and (max-width: 800px) {
    display: block;
  }
`;

export const ListVertical = styled.ul`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  min-height: 50vh;
`;

export const StyledListItem = styled.li`
  border-top: var(--border);
  padding-top: 3rem;
  display: grid;
  grid-template-columns: auto repeat(2, 1fr) auto;
  gap: 2rem;
  align-items: center;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;

    & button {
      margin-right: 2rem;
    }
  }
`;

export const StyledHorizontalListItem = styled.li`
  display: flex;
  gap: 2rem;

  @media only screen and (max-width: 800px) {
    margin-bottom: 3rem;
  }
`;
