import styled from "styled-components";
import { GridAuto } from "../Grid";
import { SkeletonImage, SkeletonText, SkeletonTitle } from ".";

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
