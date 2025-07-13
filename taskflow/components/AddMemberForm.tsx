"use client";
import React, { FC } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useActions } from "@/app/dashboard/hooks/useActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTeamStore } from "@/store/user.store";

interface AddAndRemoveMemberFormProps {
  removeMember: boolean;
}

const AddAndRemoveMemberForm: FC<AddAndRemoveMemberFormProps> = ({
  removeMember,
}) => {
  const { control, register, handleSubmit } = useForm();

  const { loadTeams, addMembers, removeMembersTeam } = useActions();
  const { teams } = useTeamStore();

  const handleAddMember = handleSubmit(async (data: FieldValues) => {
    await addMembers(data);
    await loadTeams();
  });
  const handleRemoveMember = handleSubmit(async (data: FieldValues) => {
    await removeMembersTeam(data);
    await loadTeams();
  });

  return (
    <form
      onSubmit={removeMember ? handleRemoveMember : handleAddMember}
      className="space-y-4"
    >
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
        {removeMember ? "Remove Member" : "Adicionar miembro"}
      </Button>
    </form>
  );
};

export default AddAndRemoveMemberForm;
