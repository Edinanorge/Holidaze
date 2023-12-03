import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Modal, { ModalFooter } from "../../ui/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import ButtonIcon from "../../ui/ButtonIcon";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { StyledErrosMessage } from "./Register";

import { loginUser } from "../../services/apiAuth.tsx";
import { useAuth } from "../../context/authContext";

interface FormDataLoginProps {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<FormDataLoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormDataLoginProps) {
    //send data to API
    const data = await loginUser(formData);

    //handling server errors
    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      //save user
      login(data);

      //navigate to profile page
      setTimeout(() => {
        navigate(`/profiles/${data.name}`);
      }, 1000);
    }
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading as="h1">Login</Heading>

        <Input
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email?.message}
          pattern={{
            value: /^[\w\-.]+@(stud.)?noroff.no$/,
            message: "Only users with @noroff.no or @stud.noroff.no email can login.",
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
            Dont't have an account? <NavLink to="/auth/register">Register</NavLink>{" "}
          </p>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default LoginForm;
