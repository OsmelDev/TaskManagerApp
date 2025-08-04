"use client";

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  AlertCircle,
  Edit,
  MoreVertical,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import {
  TaskData,
  TeamData,
  useTaskStore,
  useTeamStore,
} from "@/store/user.store";
import { useActions } from "@/app/dashboard/hooks/useActions";
import { useColors } from "@/app/dashboard/hooks/useColors";

interface TaskListTeamProps {
  selectedTeam: TeamData;
  setShowTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openEditDialog: (task: TaskData) => void;
  setTaskSelected: (data: TaskData | null) => void;
}

const TaskListTeam = ({
  selectedTeam,
  setShowTaskDialog,
  openEditDialog,
  setTaskSelected,
}: TaskListTeamProps) => {
  const { tasks } = useTeamStore();
  const { saveTasks } = useTaskStore();
  const { selectedTask, handleDeleteTask } = useActions();
  const { getPriorityColor, getStatusText, getStatusColor, getStatusIcon } =
    useColors();

  if (!selectedTeam) {
    return <div>"Seleccione un equipo"</div>;
  }

  return (
    <div className="flex-1 p-4 rounded-3xl backdrop-blur-3xl bg-accent-foreground/20 overflow-hidden h-[480px] md:h-auto">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Tareas del Equipo {selectedTeam.name}
          </h1>
          <p className="text-foreground/60">
            Gestiona y organiza las tareas del equipo
          </p>
        </div>
        <div className="flex space-x-2">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">
            {selectedTeam.members.length}
          </span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {tasks?.map((task) => (
            <Card
              key={task._id}
              className={`cursor-pointer transition-all border-0 rounded-[10px] backdrop-blur-2xl bg-accent-foreground/60 hover:shadow-md hover:shadow-gray-800 fade-in ${
                selectedTask?._id === task._id ? "ring-2 ring-gray-900" : ""
              }`}
              onClick={() => {
                saveTasks([]);
                setTaskSelected(task);
              }}
            >
              <CardHeader className="pb-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={getStatusColor(task.status)}>
                        {getStatusIcon(task.status)}
                      </span>
                      <CardTitle className="text-lg text-foreground/20">
                        {task.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 ">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getStatusColor(task.status)}
                      >
                        {getStatusText(task.status)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog(task);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task._id);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              {task.description && (
                <CardContent className="pt-0 ">
                  <p className="text-sm text-foreground/60  line-clamp-2">
                    {task.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 fade-in">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay tareas
              </h3>
              <p className="text-gray-600 mb-4">
                Crea tu primera tarea para comenzar
              </p>
              <Button onClick={() => setShowTaskDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskListTeam;
