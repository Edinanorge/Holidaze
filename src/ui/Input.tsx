import styled from "styled-components";

interface InputProps {
  label: string;
  id: string;
  type: string;
  register: any;
  error?: string | undefined;
  pattern?: {
    value: any;
    message: string;
  };
  required?: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
}

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledError = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-100);
`;

function Input({ label, id, type, register, error, pattern, required, minLength }: InputProps) {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        {...register(id, {
          ...(pattern && { pattern }),
          ...(required && { required }),
          ...(minLength && { minLength }),
        })}
      />
      <StyledError>{error}</StyledError>
    </StyledInput>
  );
}

export default Input;
