"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TaskList from "@/components/dashboard/TaskList";
import TaskDetails from "@/components/dashboard/TaskDetails";
import Loading from "@/components/Loading";
import TaskListTeam from "@/components/dashboard/TaskListTeam";
import Info from "@/components/dashboard/Info";
import { useActions } from "./hooks/useActions";
import { useMobile } from "@/hooks/use-mobile";
import SidebarMobile from "@/components/dashboard/SidebarMobile";
import Header from "@/components/Header";
import { useTeamStore } from "@/store/user.store";

export default function DashboardPage() {
  const {
    isLoading,
    selected,
    setSelected,
    selectedTeam,
    setSelectedTeam,
    selectedTask,
    setSelectedTask,
    showTaskDialog,
    setShowTaskDialog,
    openEditDialog,
    editingTask,
    setEditingTask,
  } = useActions();
  const { tasks } = useTeamStore();

  const { isMobile } = useMobile();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background/90">
      <Header />
      <div className=" flex flex-1 h-[calc(100vh-73px)]">
        {isMobile ? (
          <SidebarMobile
            setSelectedTask={setSelectedTask}
            setSelected={setSelected}
            setSelectedTeam={setSelectedTeam}
          />
        ) : (
          <Sidebar
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            setShowTaskDialog={setShowTaskDialog}
            showTaskDialog={showTaskDialog}
            setSelectedTask={setSelectedTask}
            setSelected={setSelected}
            setSelectedTeam={setSelectedTeam}
          />
        )}
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-2 bg-background pt-2 px-2">
          {(selected && (
            <TaskList
              openEditDialog={openEditDialog}
              setShowTaskDialog={setShowTaskDialog}
              setSelectedTask={setSelectedTask}
            />
          )) ||
            (selectedTeam && (
              <TaskListTeam
                openEditDialog={openEditDialog}
                setShowTaskDialog={setShowTaskDialog}
                setSelectedTask={setSelectedTask}
                selectedTeam={selectedTeam}
              />
            ))}
          <div className=" rounded-2xl backdrop-blur-3xl bg-accent-foreground/20 p-6  border border-accent/10">
            {selectedTask ? (
              <TaskDetails selectedTask={selectedTask} />
            ) : (
              <Info />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
