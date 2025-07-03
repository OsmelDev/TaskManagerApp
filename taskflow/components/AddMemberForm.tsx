import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { useActions } from "@/app/dashboard/hooks/useActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTeamStore } from "@/store/user.store";

const AddMemberForm = () => {
  const { control, register, handleSubmit } = useForm();

  const { loadTeams, addMembers } = useActions();
  const { teams } = useTeamStore();

  const handleAddMember = handleSubmit(async (data) => {
    await addMembers(data);
    await loadTeams();
  });

  return (
    <form onSubmit={handleAddMember} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Introduzca el email del usuario</Label>
        <Input
          id="email"
          {...register("email", {
            required: "Este campo es requerido",
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="team" className="py-2">
          Equipo
        </Label>

        <Controller
          name="team"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el equipo" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Button type="submit" className="w-full">
        Adicionar miembro
      </Button>
    </form>
  );
};

export default AddMemberForm;
