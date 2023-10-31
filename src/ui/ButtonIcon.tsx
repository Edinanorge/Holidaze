import styled from "styled-components";

const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  background: none;
  border: 1px solid var(--color-gray-700);
  border-radius: var(--border-radius);
  padding: 1rem 2rem;

  &:hover {
    background-color: var(--color-gray-200);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }

  & span {
    margin: 0 auto;
  }
`;

export default ButtonIcon;
