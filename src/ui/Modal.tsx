import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import styled from "styled-components";

interface ModalProps {
  children: React.ReactElement;
}

const StyledModal = styled.main`
  display: flex;
  justify-content: center;

  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 9999;
  background-color: rgb(3 3 3 / 0.5);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 2rem;
  margin: 6rem 0;
  width: 60rem;
  height: fit-content;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius);

  & h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  animation: animate 0.35s ease-out;

  @keyframes animate {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalBody = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div:has(input[type="checkbox"]) {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: end;
      align-items: center;
      margin-bottom: 1rem;

      @media only screen and (max-width: 500px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap-column: 2rem;
      }
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    text-align: center;
    margin: 1rem;
  }
`;

function Modal({ children }: ModalProps) {
  return (
    <StyledModal>
      <ModalContent>
        <NavLink to="/">
          <FaTimes />
        </NavLink>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </StyledModal>
  );
}

export default Modal;
