import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      text-align: center;
      font-size: 2.8rem;
      font-weight: 800;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.8rem;
      font-weight: 700;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.6rem;
      font-weight: 600;
    `}
    
   
    
  line-height: 1.4;
`;

export default Heading;
