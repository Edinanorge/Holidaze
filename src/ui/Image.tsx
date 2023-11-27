import styled from "styled-components";
interface StyledImageProps {
  fullSize?: boolean;
}

const StyledImage = styled.img<StyledImageProps>`
  width: 8rem;
  height: 8rem;
  object-fit: cover;

  @media only screen and (max-width: 800px) {
    width: ${(props) => props.fullSize && "50%"};
    height: ${(props) => props.fullSize && "20rem"};
  }

  @media only screen and (max-width: 600px) {
    width: ${(props) => props.fullSize && "100%"};
  }
`;

export default StyledImage;
