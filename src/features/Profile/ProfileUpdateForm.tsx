import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { updateAvatar } from "../../services/apiProfile";
import Button from "../../ui/Button";
import { StyledErrosMessage } from "../authentication/Register";

interface FormDataProps {
  avatar: string;
}

function ProfileUpdateForm() {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const form = useForm({
    defaultValues: {
      avatar: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    const data = await updateAvatar(authToken, userName, formData);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      navigate(`/profiles/${userName}`);
      localStorage.setItem("userAvatar", formData.avatar);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1">Update Profile Avatar</Heading>
        <Input
          label="Image url"
          type="text"
          id="avatar"
          register={register}
          error={errors.avatar?.message}
          required={{ value: true, message: "Image url is required." }}
        />
        {serverErrors && <StyledErrosMessage>{serverErrors}</StyledErrosMessage>}
        <Button variation="primary" type="submit">
          Continue
        </Button>
      </form>
    </Modal>
  );
}
export default ProfileUpdateForm;
