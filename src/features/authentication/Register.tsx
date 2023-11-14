import Modal, { ModalFooter } from "../../ui/Modal";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../ui/Input";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { registerUser } from "../../services/aoiAuth";
import styled from "styled-components";

interface FormDataProps {
  name: string;
  email: string | number;
  avatar: string;
  password: string;
  manager: boolean;
}

export const StyledErrosMessage = styled.p`
  text-align: center;
  color: var(--color-red-100);
  font-weigth: 700;
  font-size: 2rem;
`;

function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      manager: false,
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataProps) {
    //send data to API
    const data = await registerUser(formData);

    //handlig server errors
    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      //navigate to login page
      setTimeout(() => {
        navigate("/auth/login");
      }, 300);
    }
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading as="h1">Sign up</Heading>

        <Input
          label="Name"
          id="name"
          type="text"
          register={register}
          error={errors.name?.message}
          required={{ value: true, message: "Name is required" }}
          pattern={{
            value: /^[\w]+$/,
            message: "The name value must not contain punctuation symbols apart from underscore (_).",
          }}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email?.message}
          pattern={{
            value: /^[\w\-.]+@(stud.)?noroff.no$/,
            message: "Only users with @noroff.no or @stud.noroff.no email can register",
          }}
          required={{ value: true, message: "Email is required" }}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          register={register}
          error={errors.password?.message}
          required={{ value: true, message: "Password is required" }}
          minLength={{ value: 8, message: "Password must be at least 8 characters" }}
        />

        <Input label="Avatar(url)" id="avatar" type="text" register={register} />

        <Input label="Venue manager" id="manager" type="checkbox" register={register} />

        {serverErrors && <StyledErrosMessage>{serverErrors}</StyledErrosMessage>}
        <Button variation="primary" type="submit">
          Continue
        </Button>

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
          <p>
            Allready have an account? <NavLink to="/auth/login">Log in</NavLink>{" "}
          </p>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default RegisterForm;
