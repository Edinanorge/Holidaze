import { API_URL } from "../utils/constants.js";

interface FormDataProps {
  name: string;
  email: string | number;
  avatar: string;
  password: string;
  manager: boolean;
}

interface FormDataLoginProps {
  email: string;
  password: string;
}

export async function registerUser(formData: FormDataProps) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      password: formData.password,
      manager: formData.manager,
    }),
  };

  const res = await fetch(`${API_URL}/auth/register`, options);
  const data = await res.json();

  return data;
}

export async function loginUser(formData: FormDataLoginProps) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  };

  const res = await fetch(`${API_URL}/auth/login`, options);
  const data = await res.json();

  return data;
}
