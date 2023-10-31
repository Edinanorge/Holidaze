import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

interface ModalProps {
  children: React.ReactElement;
}

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 999;
  background-color: rgb(3 3 3 / 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  padding: 2rem;
  width: 60rem;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius);

  animation: animate 0.35s ease-out;
  
  @keyframes animate {
    0% {
      transform: translatey(100%);
      opacity:0;
    }
    100% {
      transform: translateY(0);
      opacity:1;
  }
`;

const ModalBody = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div:has(input[type="checkbox"]) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: end;
    align-items: center;
    margin-bottom: 1rem;
  }

  & input {
    padding: 0.5rem 1rem;
  }
`;

const ModalFooter = styled.div`
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
        <ModalFooter>
          <p>or</p>

          <ButtonIcon>
            <FaSquareFacebook />
            <span>Continue with Facebook</span>
          </ButtonIcon>

          <ButtonIcon>
            <FcGoogle />
            <span>Continue with Goggle</span>
          </ButtonIcon>

          <ButtonIcon>
            <BsApple />
            <span> Continue with Apple</span>
          </ButtonIcon>

          <ButtonIcon>
            <IoMailOutline />
            <span>Continue with email</span>
          </ButtonIcon>
        </ModalFooter>
      </ModalContent>
    </StyledModal>
  );
}

export default Modal;
