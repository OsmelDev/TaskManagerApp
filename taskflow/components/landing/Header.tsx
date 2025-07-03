import { Target } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-background backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-foreground">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-4">
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
      </div>
    </header>
  );
};

export default Header;
