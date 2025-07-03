import { useActions } from "@/app/dashboard/hooks/useActions";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTeamStore } from "@/store/user.store";
import { Button } from "../ui/button";

const CreateAndUpdateTaskForm = () => {
  const { editingTask, taskForm, getStatusText, createTaskNew, updateTask } =
    useActions();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { teams } = useTeamStore();

  const handleCreateTask = handleSubmit(async (data) => {
    await createTaskNew(data);
  });

  const handleUpdateTask = handleSubmit(async (data) => {
    if (!editingTask) return;

    const _id = editingTask._id;
    const taskData = data;
    await updateTask({ _id, taskData });
  });

  return (
    <form
      onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="title" className="py-2">
          Título
        </Label>
        <Input
          id="title"
          {...register("title", {
            required: "El título es requerido",
          })}
          placeholder={editingTask ? taskForm.title : ""}
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm">{String(errors.title.message)}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="py-2">
          Descripción
        </Label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full border rounded-md p-2"
          placeholder={editingTask ? taskForm.description : ""}
        />
      </div>

      <div>
        <Label htmlFor="priority" className="py-2">
          Prioridad
        </Label>
        <Controller
          name="priority"
          control={control}
          rules={{ required: "La prioridad es requerida" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    editingTask ? taskForm.priority : "Selecciona prioridad"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && (
          <p className="text-red-500 text-sm">
            {String(errors.priority.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="status" className="py-2">
          Estado
        </Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "El estado es requerido" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    editingTask
                      ? getStatusText(taskForm.status)
                      : "Selecciona el estado"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendiente">pendiente</SelectItem>
                <SelectItem value="en_proceso">En proceso</SelectItem>
                <SelectItem value="terminada">Terminado</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-red-500 text-sm">
            {String(errors.status.message)}
          </p>
        )}
      </div>

      <div>
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
        {editingTask ? "Actualizar Tarea" : "Crear Tarea"}
      </Button>
    </form>
  );
};

export default CreateAndUpdateTaskForm;
