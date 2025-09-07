"use client";

import React from "react";
import Sidebar from "@/components/user_home/Sidebar";
import TaskList from "@/components/user_home/TaskList";
import TaskDetails from "@/components/user_home/TaskDetails";
import Loading from "@/components/Loading";
import TaskListTeam from "@/components/user_home/TaskListTeam";
import Info from "@/components/user_home/Info";
import { useMobile } from "@/hooks/use-mobile";
import SidebarMobile from "@/components/user_home/SidebarMobile";
import Header from "@/components/Header";
import { useTaskStore } from "@/store/user.store";
import { useActions } from "@/app/user_home/hooks/useActions";

export default function UserHomePage() {
  const {
    isLoading,
    selected,
    setSelected,
    setSelectedTask,
    showTaskDialog,
    setShowTaskDialog,
    openEditDialog,
    editingTask,
    setEditingTask,
    setSelectedTeam,
    selectedTeam,
  } = useActions();
  const { setTaskSelected, taskSelected } = useTaskStore();
  const { isMobile } = useMobile();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-background/90">
      <Header />
      <div className=" flex flex-1 h-screen pt-12">
        {isMobile ? (
          <SidebarMobile
            setTaskSelected={setTaskSelected}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            setShowTaskDialog={setShowTaskDialog}
            showTaskDialog={showTaskDialog}
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
            setTaskSelected={setTaskSelected}
          />
        )}
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-2 bg-background pt-2 px-2">
          {(selected && (
            <TaskList
              openEditDialog={openEditDialog}
              setShowTaskDialog={setShowTaskDialog}
              setTaskSelected={setTaskSelected}
            />
          )) ||
            (selectedTeam && (
              <TaskListTeam
                openEditDialog={openEditDialog}
                setShowTaskDialog={setShowTaskDialog}
                selectedTeam={selectedTeam}
                setTaskSelected={setTaskSelected}
              />
            ))}
          <div className=" rounded-2xl backdrop-blur-3xl bg-accent-foreground/20 p-6  border border-accent/10">
            {taskSelected ? <TaskDetails /> : <Info />}
          </div>
        </div>
      </div>
    </div>
  );
}
