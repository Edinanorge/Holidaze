import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);

  & p {
    background-color: var(--color-gary-600);
  }
`;

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <StyledError id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </StyledError>
  );
}

export default ErrorPage;
