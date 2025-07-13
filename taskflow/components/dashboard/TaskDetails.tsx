"use client";
import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useActions } from "@/app/dashboard/hooks/useActions";
import Loading from "../Loading";
import { TaskData } from "@/store/user.store";
import { AudioPlayer } from "./AudioPlayer";

interface TaskDetailsProps {
  selectedTask: TaskData | null;
}

const TaskDetails = ({ selectedTask }: TaskDetailsProps) => {
  const {
    getPriorityColor,
    getStatusText,
    updateTaskStatus,
    isUpdatingStatus,
  } = useActions();

  if (!selectedTask) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 fade-in ">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {selectedTask.title}
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          <Badge className={getPriorityColor(selectedTask.priority)}>
            {selectedTask.priority.toUpperCase()}
          </Badge>
          <Badge variant="outline">{getStatusText(selectedTask.status)}</Badge>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
        <p className="text-foreground/60">
          {selectedTask.description || "Sin descripción"}
        </p>
      </div>
      {selectedTask.voiceNote && <AudioPlayer url={selectedTask.voiceNote} />}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Estado</h3>
        <div className="space-y-2">
          <Button
            variant={
              selectedTask.status === "pendiente" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(selectedTask._id, "pendiente")}
            disabled={isUpdatingStatus}
          >
            <Circle className="h-4 w-4 mr-2" />
            Pendiente
          </Button>
          <Button
            variant={
              selectedTask.status === "en_proceso" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(selectedTask._id, "en_proceso")}
            disabled={isUpdatingStatus}
          >
            <Clock className="h-4 w-4 mr-2" />
            En Proceso
          </Button>
          <Button
            variant={
              selectedTask.status === "terminada" ? "default" : "outline"
            }
            size="sm"
            className="w-full justify-start"
            onClick={() => updateTaskStatus(selectedTask._id, "terminada")}
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
            {new Date(selectedTask.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium text-foreground/80">Actualizada:</span>{" "}
            {new Date(selectedTask.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
