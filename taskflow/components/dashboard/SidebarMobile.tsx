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
import { Plus, User, Users, ArrowBigRight, ArrowBigLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import FormTeam from "../FormTeam";
import { useActions } from "@/app/dashboard/hooks/useActions";
import CreateAndUpdateTaskForm from "./CreateAndUpdateTaskForm";
import { TaskData, TeamData, useTeamStore } from "@/store/user.store";
import AddMemberForm from "../AddMemberForm";
import TeamCard from "../TeamCard";

interface SidebarProps {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamData | null>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskData | null>>;
}

const SidebarMobile = ({
  setSelected,
  setSelectedTeam,
  setSelectedTask,
}: SidebarProps) => {
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const {
    setTaskForm,
    setShowTaskDialog,
    showTaskDialog,
    editingTask,
    setEditingTask,
    openAddDialog,
    showAddDialog,
    setShowAddDialog,
  } = useActions();
  const { teams } = useTeamStore();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`fixed  z-30 items-center flex flex-row-reverse min-w-[330px] h-full 
    ${open ? "left-0" : "-left-80"} transition-all 1s ease-in-out
    `}
    >
      {open ? (
        <ArrowBigLeft onClick={() => setOpen(!open)} />
      ) : (
        <ArrowBigRight onClick={() => setOpen(!open)} />
      )}
      <div className="h-full w-80 bg-background p-6">
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

                <CreateAndUpdateTaskForm />
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
                  onClick={() => openAddDialog()}
                >
                  <User className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuevo Miembro</DialogTitle>
                  <DialogDescription>
                    Agrega miembros a tu equipo
                  </DialogDescription>
                </DialogHeader>

                <AddMemberForm />
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
                    setSelectedTask={setSelectedTask}
                    setSelected={setSelected}
                    setSelectedTeam={setSelectedTeam}
                    team={team}
                    openAddDialog={openAddDialog}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
