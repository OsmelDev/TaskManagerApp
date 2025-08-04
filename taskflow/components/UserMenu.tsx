import { useMobile } from "@/hooks/use-mobile";
import React, { FC } from "react";
import { ModeToggle } from "./mode-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import { UserData } from "@/store/user.store";

interface Props {
  user: UserData | null;
  handleSignOut: () => Promise<void>;
}

const MenuMobile = () => (
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
        className="bg-background/20 mt-3 w-[100vw] z-30 border-0 backdrop-blur-sm flex flex-col items-center "
      >
        <DropdownMenuItem>
          <Link href="/auth" className="text-accent hover:text-foreground">
            Iniciar Sesión
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

const AuthMenu = () => (
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

const UserMenu: FC<Props> = ({ user, handleSignOut }) => (
  <div className="flex items-center space-x-4">
    <ModeToggle />
    <Link href="/dashboard" className="hover:text-accent">
      <span className="text-md text-foreground font-bold hover:text-white">
        Dashboard
      </span>
    </Link>
    <span className="text-md text-foreground font-bold hover:text-white cursor-pointer">
      Hola, {user?.name}
    </span>
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-transparent hover:border-border/20 rounded-xs border border-transparent hover:text-white  hover:cursor-pointer"
      onClick={handleSignOut}
    >
      <LogOut className="h-4 w-4 mr-1" />
      <span className="font-bold">Salir</span>
    </Button>
  </div>
);

const UserMenuMobile: FC<Props> = ({ user, handleSignOut }) => (
  <div className="flex items-center space-x-2 relative border">
    <ModeToggle />
    <DropdownMenu modal={true}>
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
        className="bg-background/20 mt-3 w-[100vw] z-30 border-0 backdrop-blur-sm flex flex-col items-center "
      >
        <DropdownMenuItem>
          <Link href="/dashboard">
            <span className="text-sm text-foreground ">Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth">
            <span className="text-sm text-foreground">Hola, {user?.name}</span>
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

const HeaderMenu: FC<Props> = ({ user, handleSignOut }) => {
  const { isMobile } = useMobile();

  if (user?.name) {
    if (isMobile) {
      return <UserMenuMobile user={user} handleSignOut={handleSignOut} />;
    }
    return <UserMenu user={user} handleSignOut={handleSignOut} />;
  }

  if (isMobile) {
    return <MenuMobile />;
  }

  return <AuthMenu />;
};

export default HeaderMenu;
