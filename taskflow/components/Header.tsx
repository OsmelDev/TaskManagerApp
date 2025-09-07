"use client";
import { Target } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user.store";
import { authServices } from "@/services/auth/auth.services";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import HeaderMenu from "./UserMenu";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const { user, delUser } = useUserStore();
  const { logoutService } = authServices();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await logoutService();
      router.push("/auth");
      toast({
        description: "Cerrando session",
        variant: "success",
      });
      setTimeout(() => {
        delUser();
      }, 2000);
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  return (
    <header className="bg-background/50 backdrop-blur-sm fixed w-full top-0 z-40 shadow-2xl">
      <div className="  p-2 flex justify-between items-center w-full ">
        <Link href="/" className="flex items-center space-x-2">
          <Target className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold text-foreground">TaskFlow</span>
        </Link>
        <HeaderMenu user={user} handleSignOut={handleSignOut} />
      </div>
    </header>
  );
};

export default Header;
