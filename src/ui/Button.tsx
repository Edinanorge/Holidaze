import styled, { css } from "styled-components";

interface ButtonProps {
  variation?: "primary" | "secondary" | "outline" | "default" | "dark";
}

const variations = {
  primary: css`
    color: var(--color-gray-0);
    background: var(--gradiant-right-1);
    &:hover {
      background: var(--gradiant-left-1);
    }
  `,

  secondary: css`
    color: var(--color-gray-0);
    background: var(--gradiant-right-3);
    &:hover {
      background: var(--gradiant-left-3);
    }
  `,

  outline: css`
    color: var(--color-gray-800);
    background-color: inherit;
    border: 1px solid var(--color-gray-700);
    &:hover {
      background-color: var(--color-gray-200);
    }
  `,
  dark: css`
    color: var(--color-gray-0);
    background-color: var(--color-gray-800);
    margin: 0;
    &hover {
      background-color: var(--color-gray-900);
    }
  `,
  default: css`
    background-color: var(--color-gray-0);
    border-radius: var(--border-radius-lg);
    &:hover {
      background-color: var(--color-gray-200);
    }
  `,
};

const Button = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  background-color: inherit;
  border: none;
  font-weight: 500;
  margin-top: 2rem;

  ${(props) => props.variation && variations[props.variation]}
`;

export default Button;
