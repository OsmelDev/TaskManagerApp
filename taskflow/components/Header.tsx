"use client";
import { Target } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user.store";
import { authServices } from "@/services/auth/auth.services";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import HeaderMenu from "./UserMenu";

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
    <header className="border-b border-border/20 bg-background/50 backdrop-blur-sm  sticky top-0 z-40">
      <div className="">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
          <Link href="/" className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">TaskFlow</span>
          </Link>
          <HeaderMenu user={user} handleSignOut={handleSignOut} />
        </div>
      </div>
    </header>
  );
};

export default Header;
