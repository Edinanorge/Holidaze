import { SkeletonImageSmall, SkeletonText, SkeletonTitle } from ".";
import { GridCols, GridColsTwo } from "../Grid";

function SkeletonBookingPage() {
  return (
    <GridCols>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <GridColsTwo key={index}>
          <SkeletonImageSmall />
          <div>
            <SkeletonTitle />
            <SkeletonText />
            <SkeletonText />
          </div>
        </GridColsTwo>
      ))}
    </GridCols>
  );
}

export default SkeletonBookingPage;
