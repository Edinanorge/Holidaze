import styled from "styled-components";
import { SkeletonButton, SkeletonImageSmall, SkeletonText, SkeletonTitle } from ".";
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
`;
const StyledVenueList = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr 1fr auto;
  align-items: center;
  margin: 3rem 0;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

function SkeletonVenuesPage() {
  return (
    <StyledSkeletonVenuePage>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <StyledVenueList key={index}>
          <SkeletonImageSmall />
          <div>
            <SkeletonTitle />
            <SkeletonText />
          </div>

          <div>
            <SkeletonTitle />
            <SkeletonText />
          </div>
          <GridColsTwo>
            <SkeletonButton />
            <SkeletonButton />
          </GridColsTwo>
        </StyledVenueList>
      ))}
    </StyledSkeletonVenuePage>
  );
}

export default SkeletonVenuesPage;
