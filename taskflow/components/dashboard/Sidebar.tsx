"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, User, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import FormTeam from "../FormTeam";
import { useActions } from "@/app/dashboard/hooks/useActions";
import CreateAndUpdateTaskForm from "./CreateAndUpdateTaskForm";
import { TaskData, TeamData, useTeamStore } from "@/store/user.store";
import TeamCard from "../TeamCard";
import AddAndRemoveMemberForm from "../AddMemberForm";
import { useColors } from "@/app/dashboard/hooks/useColors";

interface SidebarProps {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamData | null>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskData | null>>;
  setShowTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingTask: React.Dispatch<React.SetStateAction<TaskData | null>>;
  editingTask: TaskData | null;
  showTaskDialog: boolean;
  setTaskSelected: (data: TaskData | null) => void;
}

const Sidebar = ({
  setSelected,
  setSelectedTeam,
  setSelectedTask,
  setShowTaskDialog,
  showTaskDialog,
  setEditingTask,
  editingTask,
  setTaskSelected,
}: SidebarProps) => {
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const {
    setTaskForm,
    taskForm,
    createTaskNew,
    openAddDialog,
    showAddDialog,
    setShowAddDialog,
    removeMember,
    setRemoveMember,
  } = useActions();
  const { getStatusText } = useColors();
  const { teams } = useTeamStore();

  return (
    <div className="w-80 bg-accent-foreground/20 p-6 border border-accent/10 overflow-auto scrollbar-hide">
      <div className="space-y-6">
        <div className="space-y-2">
          <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
            <DialogTrigger asChild>
              <Button
                className="w-full cursor-pointer"
                onClick={() => {
                  setEditingTask(null);
                  setTaskForm({
                    title: "",
                    description: "",
                    priority: "media",
                    status: "",
                    _id: "",
                    team_id: "",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTask ? "Editar Tarea" : "Nueva Tarea"}
                </DialogTitle>
                <DialogDescription>
                  {editingTask
                    ? "Modifica los detalles de la tarea"
                    : "Crea una nueva tarea para tu equipo"}
                </DialogDescription>
              </DialogHeader>

              <CreateAndUpdateTaskForm
                taskForm={taskForm}
                editingTask={editingTask}
                getStatusText={getStatusText}
                createTaskNew={createTaskNew}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full cursor-pointer">
                <Users className="h-4 w-4 mr-2" />
                Nuevo Equipo
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Equipo</DialogTitle>
                <DialogDescription>
                  Crea un nuevo equipo de trabajo
                </DialogDescription>
              </DialogHeader>

              <FormTeam />
            </DialogContent>
          </Dialog>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => {
                  setRemoveMember(false);
                  openAddDialog();
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {removeMember ? " Eliminar miembro" : "Nuevo Miembro"}
                </DialogTitle>
                <DialogDescription>
                  {removeMember
                    ? "Elimina miembros del equipo"
                    : "Agrega miembros a tu equipo"}
                </DialogDescription>
              </DialogHeader>

              <AddAndRemoveMemberForm removeMember={removeMember} />
            </DialogContent>
          </Dialog>
        </div>

        <Separator />
        <div
          className="p-3 rounded-lg  bg-accent-foreground/60 text-foreground hover:bg-gray-900  transition-colors cursor-pointer"
          onClick={() => {
            setSelectedTeam(null);
            setSelected(true);
          }}
        >
          Mis Tareas
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-foreground mb-3">Equipos</h3>
          <div className="space-y-2">
            {teams.length === 0 ? (
              <p className="text-sm text-gray-500">No hay equipos creados</p>
            ) : (
              teams.map((team) => (
                <TeamCard
                  setRemoveMember={setRemoveMember}
                  key={team._id}
                  setSelectedTask={setSelectedTask}
                  setSelected={setSelected}
                  setSelectedTeam={setSelectedTeam}
                  team={team}
                  openAddDialog={openAddDialog}
                  setTaskSelected={setTaskSelected}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
