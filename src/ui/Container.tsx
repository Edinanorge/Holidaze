import { styled } from "styled-components";

const Container = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 4rem;

  @media only screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

export default Container;
