import styled from "styled-components";
interface StyledImageProps {
  fullsize?: boolean;
}

const StyledImage = styled.img<StyledImageProps>`
  width: 8rem;
  height: 8rem;
  object-fit: cover;

  @media only screen and (max-width: 800px) {
    width: ${(props) => props.fullsize && "50%"};
    height: ${(props) => props.fullsize && "20rem"};
  }

  @media only screen and (max-width: 600px) {
    width: ${(props) => props.fullsize && "100%"};
  }
`;

export default StyledImage;
