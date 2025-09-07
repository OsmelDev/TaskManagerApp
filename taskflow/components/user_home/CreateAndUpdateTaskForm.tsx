"use client";
import { useActions } from "@/app/user_home/hooks/useActions";
import React, { FC, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TaskData, useTeamStore } from "@/store/user.store";
import { Button } from "../ui/button";
import VoiceNoteRecorder, { VoiceNoteRecorderHandle } from "./VoiceRecorder";

interface CreateAndUpdateTaskFormProps {
  taskForm: {
    title: string;
    description: string;
    priority: "alta" | "media" | "baja";
    status: string;
    _id: string;
    team_id: string;
  };
  editingTask: TaskData | null;
  getStatusText: (status: string) => string;
  createTaskNew: (taskData: FieldValues) => Promise<void>;
}

const CreateAndUpdateTaskForm: FC<CreateAndUpdateTaskFormProps> = ({
  taskForm,
  editingTask,
  getStatusText,
  createTaskNew,
}) => {
  const { updateTask } = useActions();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { teams } = useTeamStore();
  const voiceNoteRef = useRef<VoiceNoteRecorderHandle>(null);

  const handleCreateTask = handleSubmit(async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("priority", data.priority);
    formData.append("status", data.status);
    formData.append("team", data.team);

    const audioBlob = voiceNoteRef.current?.getAudioBlob();
    const recordingTime = voiceNoteRef.current?.getRecordingTime();

    if (audioBlob) {
      formData.append("voiceNote", audioBlob, "recording.wav");
      formData.append("duration", recordingTime!.toString());
    }

    await createTaskNew(formData);
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

      <div className="flex flex-1 w-full items-center justify-between">
        <div className="w-[50%]">
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
                    <SelectValue placeholder="Selecciona prioridad" />
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
                    <SelectValue placeholder={getStatusText(taskForm.status)} />
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

            {teams && (
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
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-[50%]">
          <Controller
            name="voiceNote"
            control={control}
            render={({ field }) => (
              <VoiceNoteRecorder
                field={field}
                onRecordingComplete={(blob) => {
                  console.log("Grabación completada", blob);
                }}
                ref={voiceNoteRef}
              />
            )}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {editingTask ? "Actualizar Tarea" : "Crear Tarea"}
      </Button>
    </form>
  );
};

export default CreateAndUpdateTaskForm;
