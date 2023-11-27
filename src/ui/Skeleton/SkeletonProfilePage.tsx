import { GridColsTwo } from "../Grid";
import { SkeletonButton, SkeletonImageRounded, SkeletonText, SkeletonTitle } from ".";
import styled from "styled-components";

const StyledSkeletonProfilePage = styled.main`
  padding: 5rem;

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

const StyledGridColsTwo = styled(GridColsTwo)`
  grid-template-columns: 1fr 2fr;

  @media only screen and (max-width: 650px) {
    display: block;
  }
`;

function SkeletonProfilePage() {
  return (
    <StyledSkeletonProfilePage>
      <StyledGridColsTwo>
        <SkeletonImageRounded />
        <div>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonButton />
        </div>
      </StyledGridColsTwo>
      <StyledGridColsTwo>
        <SkeletonImageRounded />
        <div>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
        </div>
      </StyledGridColsTwo>
    </StyledSkeletonProfilePage>
  );
}
export default SkeletonProfilePage;
