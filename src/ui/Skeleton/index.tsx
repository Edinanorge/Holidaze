import styled from "styled-components";

export const SkeletonButton = styled.div`
  width: 10rem;
  height: 4rem;
  margin: 2rem 0;
  border-radius: var(--border-radius);
  background-color: var(--color-gray-400);
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 25rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--color-gray-400);
`;
export const SkeletonImageSmall = styled(SkeletonImage)`
  width: 8rem;
  height: 8rem;
`;
export const SkeletonImageRounded = styled(SkeletonImage)`
  border-radius: var(--border-radius-lg);
  height: 20rem;
  margin-bottom: 2rem;
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
