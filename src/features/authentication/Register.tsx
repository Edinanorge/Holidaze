import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";

interface FormProps {
  username: string;
  email: string | number;
  avatar: string;
  password: string;
  manager: boolean;
}

function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<FormProps>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
      manager: false,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormProps) => {
    //send data to API
    console.log("Data", data);
    //navigate to login page
    setTimeout(() => {
      navigate("/auth/login");
    }, 300);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading as="h1">Sign up</Heading>

        <Input
          label="Username"
          id="username"
          type="text"
          register={register}
          error={errors.username?.message}
          required={{ value: true, message: "Username is required" }}
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

        <Button variation="primary" type="submit">
          Continue
        </Button>
      </form>
    </Modal>
  );
}

export default RegisterForm;
