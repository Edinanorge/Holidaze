import styled from "styled-components";

interface InputProps {
  label: string;
  id: string;
  type: string;
  register: any;
  error?: string | undefined | any;
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
  placeholder?: string;
  min?: number;
  max?: number;
}

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: var(--border);
    padding: 1rem 0.5rem;
  }
`;

export const StyledDateInput = styled.div`
  p {
    border: var(--border);
    padding: 1rem 0.5rem;
    cursor: pointer;
  }
`;

const StyledError = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-100);
`;

function Input({ label, id, type, register, error, pattern, required, minLength, placeholder, min, max }: InputProps) {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input
        min={min}
        max={max}
        placeholder={placeholder}
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
