import type React from "react";

import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";
import Link from "next/link";
import Signing from "@/components/auth/Signing";
import Signup from "@/components/auth/Signup";

export default function AuthPage() {
  return (
    <div className="  min-h-screen bg-background from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="  w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <Target className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">TaskFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground/85">Bienvenido</h1>
          <p className="text-foreground/50 font-bold">
            Inicia sesión o crea tu cuenta
          </p>
        </div>

        <Card className="backdrop-blur-3xl bg-foreground/30 border-0 spand">
          <CardHeader>
            <Tabs defaultValue="signin" className="w-full ">
              <TabsList className="grid w-full  grid-cols-2 backdrop-blur-3xl bg-transparent">
                <TabsTrigger value="signin" className="text-accent">
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-accent">
                  Registrarse
                </TabsTrigger>
              </TabsList>
              <Signing />
              <Signup />
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
