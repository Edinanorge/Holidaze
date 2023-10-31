import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";

interface FormProps {
  email: string;
  password: string | number;
}

function LoginForm() {
  const form = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormProps) => {
    //send data to API
    console.log("Data", data);

    //navigate to profile page
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

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
        <Button variation="primary" type="submit">
          Continue
        </Button>
      </form>
    </Modal>
  );
}

export default LoginForm;
