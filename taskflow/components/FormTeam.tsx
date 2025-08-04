"use client";
import React from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useActionsTeam } from "@/app/dashboard/hooks/useActionsTeam";

const FormTeam = () => {
  const { register, handleSubmit } = useForm();
  const { createTeam, loadTeams } = useActionsTeam();

  const handleCreateTeam = handleSubmit(async (data) => {
    await createTeam({ data });
    await loadTeams();
  });

  return (
    <form onSubmit={handleCreateTeam} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="team-name">Nombre del Equipo</Label>
        <Input
          id="team-name"
          {...register("name", {
            required: "El nombre es requerido",
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="team-description">Descripción</Label>
        <Textarea id="team-description" {...register("description")} rows={3} />
      </div>
      <Button type="submit" className="w-full">
        Crear Equipo
      </Button>
    </form>
  );
};

export default FormTeam;
