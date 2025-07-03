"use client";
import { LogOut, MenuIcon, Target } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import { ModeToggle } from "./mode-toggle";
import { authServices } from "@/services/auth/auth.services";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { user, delUser } = useUserStore();
  const { logoutService } = authServices();
  const router = useRouter();
  const { toast } = useToast();
  const { isMobile } = useMobile();

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

  const showMenu = () => {
    if (user.name) {
      if (isMobile) {
        return (
          <div className="flex items-center space-x-2 relative">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background fixed -right-18 top-5 w-[28rem] z-30  border flex flex-col items-center  "
              >
                <DropdownMenuItem>
                  <Link href="/dashboard">
                    <span className="text-sm text-foreground">Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth">
                    <span className="text-sm text-foreground">
                      Hola, {user?.name}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth" className=" text-foreground">
                    <Button variant="ghost" size="sm" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Salir
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
      return (
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href="/dashboard">Dashboard</Link>
          <span className="text-sm text-foreground">Hola, {user?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className="flex items-center space-x-2 relative">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background fixed -right-18 top-5 w-[28rem] z-30  border flex flex-col items-center "
            >
              <DropdownMenuItem>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="cursor-pointer rounded-[5px] "
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth">
                  <Button className="rounded-[5px] bg-chart-3 cursor-pointer">
                    Comenzar Gratis
                  </Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2 ">
        <ModeToggle />
        <Link href="/auth">
          <Button variant="ghost" className="cursor-pointer rounded-[5px]">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/auth">
          <Button className="rounded-[5px] bg-chart-3 cursor-pointer">
            Comenzar Gratis
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="border-b border-border/50 bg-background backdrop-blur-sm  sticky top-0 z-40">
      <div className="">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
          <Link href="/" className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">TaskFlow</span>
          </Link>
          {showMenu()}
        </div>
      </div>
    </header>
  );
};

export default Header;
