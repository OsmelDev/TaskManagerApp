"use client";
import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useActions } from "@/app/user_home/hooks/useActions";
import Loading from "../Loading";
import { useTaskStore } from "@/store/user.store";
import { AudioPlayer } from "./AudioPlayer";
import { useColors } from "@/app/user_home/hooks/useColors";

const TaskDetails = () => {
  const { updateTaskStatus, isUpdatingStatus } = useActions();
  const { getPriorityColor, getStatusText } = useColors();

  const { taskSelected } = useTaskStore();

  if (!taskSelected) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 fade-in ">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {taskSelected.title}
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          <Badge className={getPriorityColor(taskSelected.priority)}>
            {taskSelected.priority.toUpperCase()}
          </Badge>
          <Badge variant="outline">{getStatusText(taskSelected.status)}</Badge>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
        <p className="text-foreground/60">
          {taskSelected.description || "Sin descripción"}
        </p>
      </div>
      {taskSelected.voiceNote && <AudioPlayer url={taskSelected.voiceNote} />}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Estado</h3>
        <div className="space-y-2">
          <Button
            variant={
              taskSelected.status === "pendiente" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(taskSelected._id, "pendiente")}
            disabled={isUpdatingStatus}
          >
            <Circle className="h-4 w-4 mr-2" />
            Pendiente
          </Button>
          <Button
            variant={
              taskSelected.status === "en_proceso" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(taskSelected._id, "en_proceso")}
            disabled={isUpdatingStatus}
          >
            <Clock className="h-4 w-4 mr-2" />
            En Proceso
          </Button>
          <Button
            variant={
              taskSelected.status === "terminada" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(taskSelected._id, "terminada")}
            disabled={isUpdatingStatus}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Terminada
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">Información</h3>
        <div className="space-y-2 text-sm text-foreground/30">
          <div>
            <span className="font-medium text-foreground/80">Creada:</span>{" "}
            {new Date(taskSelected.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium text-foreground/80">Actualizada:</span>{" "}
            {new Date(taskSelected.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
