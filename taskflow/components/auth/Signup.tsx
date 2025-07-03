"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import { CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/auth/hooks/useAuth";

const Signup = () => {
  const signUpForm = useForm();
  const { signup, isLoading } = useAuth();

  const handleSignUp = signUpForm.handleSubmit(async (data) => {
    await signup(data);
  });

  return (
    <TabsContent value="signup" className="pt-4 fade-in">
      <CardTitle className="text-foreground">Crear Cuenta</CardTitle>
      <CardDescription>
        Completa los datos para crear tu nueva cuenta
      </CardDescription>
      <TabsContent value="signup" className="mt-8">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground">
              Nombre Completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                {...signUpForm.register("name", {
                  required: "El nombre es requerido",
                })}
                className="pl-10"
                required
              />
            </div>
            {signUpForm.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {String(signUpForm.formState.errors.name.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-signup" className="text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email-signup"
                type="email"
                placeholder="tu@email.com"
                {...signUpForm.register("email", {
                  required: "El correo es requerido",
                })}
                className="pl-10"
                required
              />
            </div>
            {signUpForm.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {String(signUpForm.formState.errors.email.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-signup" className="text-foreground">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password-signup"
                type="password"
                placeholder="••••••••"
                {...signUpForm.register("password", {
                  required: "El password es requerido",
                })}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
            {signUpForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {String(signUpForm.formState.errors.password.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-[5px] text-foreground bg-background"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>
      </TabsContent>
    </TabsContent>
  );
};

export default Signup;
