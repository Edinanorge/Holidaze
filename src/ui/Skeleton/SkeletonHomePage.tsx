import styled from "styled-components";
import { GridAuto } from "../Grid";

const StyledSkeletonVenue = styled.li`
  margin-top: 3rem;
  list-style: none;
  z-index: -1;

  animation: shine 2s infinite ease-out;

  @keyframes shine {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 25rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--color-gray-400);
`;

export const SkeletonTitle = styled.div`
  height: 1rem;
  width: 60%;
  margin-bottom: 1rem;
  background-color: var(--color-gray-300);
`;

export const SkeletonText = styled.div`
  width: 80%;
  height: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--color-gray-300);
`;

const SkeletenPrice = styled.div`
  width: 20%;
  height: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--color-gray-300);
`;

function SkeletonVenue() {
  return (
    <StyledSkeletonVenue>
      <SkeletonImage />
      <SkeletonTitle />
      <SkeletonText />
      <SkeletenPrice />
    </StyledSkeletonVenue>
  );
}

function SkeletonVenueList() {
  return (
    <GridAuto>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((nr) => (
        <SkeletonVenue key={nr} />
      ))}
    </GridAuto>
  );
}

export default SkeletonVenueList;
