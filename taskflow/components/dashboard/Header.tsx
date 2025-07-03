"use client";
import { LogOut, Target } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { useUserStore } from "@/store/user.store";
import { authServices } from "@/services/auth/auth.services";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const { logoutService } = authServices();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await logoutService();
      router.push("/auth");
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  return (
    <header className="bg-background  border-b">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-foreground">TaskFlow</span>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <span className="text-sm text-foreground">Hola, {user?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
