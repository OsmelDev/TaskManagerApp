import { useToast } from "@/hooks/use-toast";
import { authServices } from "@/services/auth/auth.services";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

export const useAuth = () => {
  const { loginService, registerService } = authServices();
  const router = useRouter();
  const { setUser } = useUserStore();
  const { toast, dismiss } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (userData: FieldValues) => {
    try {
      const { data } = await loginService(userData);

      setIsLoading(true);
      if (data) {
        setUser(data);
        router.push("/user_home");
        toast({
          description: "Has iniciado sesión correctamente.",
          variant: "success",
        });
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast({
        description: errorMessage || "Ocurrió un error",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: FieldValues) => {
    try {
      const { data } = await registerService(userData);
      setIsLoading(true);
      toast({
        description: data.message,
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast({
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signin, signup, isLoading, dismiss };
};
