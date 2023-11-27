import styled from "styled-components";
import { SkeletonImage, SkeletonText, SkeletonTitle } from ".";
import { GridColsTwo } from "../Grid";

const StyledSkeletonVenue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  animation: shine 1.5s infinite ease-out;

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

function SkeletonVenuePage() {
  return (
    <StyledSkeletonVenue>
      <SkeletonTitle />
      <SkeletonText />
      <SkeletonImage />
      <GridColsTwo>
        <div>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
        <SkeletonImage />
      </GridColsTwo>
    </StyledSkeletonVenue>
  );
}

export default SkeletonVenuePage;
