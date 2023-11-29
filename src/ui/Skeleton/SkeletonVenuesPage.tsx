import styled from "styled-components";
import { SkeletonButton, SkeletonImageSmall, SkeletonText, SkeletonTitle } from ".";
import FlexContainer from "../FlexContainer";
import { GridColsTwo } from "../Grid";

const StyledSkeletonVenuePage = styled.main`
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

  @media only screen and (max-width: 650px) {
    & GridColsTwo {
      display: block;
    }
  }
`;

function SkeletonVenuesPage() {
  return (
    <StyledSkeletonVenuePage>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <GridColsTwo key={index}>
          <GridColsTwo>
            <SkeletonImageSmall />
            <div>
              <SkeletonTitle />
              <SkeletonText />
              <SkeletonText />
            </div>
          </GridColsTwo>
          <GridColsTwo>
            <div>
              <SkeletonTitle />
              <SkeletonText />
              <SkeletonText />
            </div>
            <FlexContainer>
              <SkeletonButton />
              <SkeletonButton />
            </FlexContainer>
          </GridColsTwo>
        </GridColsTwo>
      ))}
    </StyledSkeletonVenuePage>
  );
}

export default SkeletonVenuesPage;
