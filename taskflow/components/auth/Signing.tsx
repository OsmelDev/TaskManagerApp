"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import { CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/auth/hooks/useAuth";

const Signing = () => {
  const signInForm = useForm();
  const { signin, isLoading } = useAuth();

  const handleSignIn = signInForm.handleSubmit(async (data) => {
    await signin(data);
  });

  return (
    <TabsContent value="signin" className="pt-4 fade-in">
      <CardTitle className="text-foreground">Iniciar Sesión</CardTitle>
      <CardDescription>
        Ingresa tus credenciales para acceder a tu cuenta
      </CardDescription>
      <TabsContent value="signin" className="mt-8">
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...signInForm.register("email", {
                  required: "El email es requerido",
                })}
                className="pl-10"
              />
            </div>
            {signInForm.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {String(signInForm.formState.errors.email.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...signInForm.register("password", {
                  required: "el password es requerido",
                })}
                className="pl-10"
              />
            </div>
            {signInForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {String(signInForm.formState.errors.password.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-[5px] bg-background text-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </TabsContent>
    </TabsContent>
  );
};

export default Signing;
