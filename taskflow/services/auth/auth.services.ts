import { axiosIntance } from "@/intance/axios";
import { FieldValues } from "react-hook-form";

export interface data {
  name: string;
  email: string;
  password: string;
}

export const authServices = () => {
  const { auth } = axiosIntance();

  const registerService = async (data: FieldValues) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const response = await auth.post("register", body, {
      withCredentials: true,
    });

    return response;
  };

  const loginService = async (data: FieldValues) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const response = await auth.post("login", body, { withCredentials: true });
    return response;
  };

  const checkAuthService = async () => {
    const response = await auth.get("verify", { withCredentials: true });
    return response;
  };

  const logoutService = async () => {
    const response = await auth.post(
      "/logout",
      {},
      {
        withCredentials: true, // Envía cookies al servidor
      }
    );
    return response;
  };

  return { loginService, registerService, checkAuthService, logoutService };
};
