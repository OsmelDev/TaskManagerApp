"use client";

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { TaskData, useTaskStore } from "@/store/user.store";
import { useActions } from "@/app/user_home/hooks/useActions";
import { notesServices } from "@/services/voice_note/voice_note.services";
import { useColors } from "@/app/user_home/hooks/useColors";
import TaskCard from "./components/TaskCard";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTaskDragAndDrop from "@/hooks/useDragAndDrop";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface TaskListProps {
  setTaskSelected: (data: TaskData) => void;
  setShowTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openEditDialog: (task: TaskData) => void;
}

const TaskList = ({
  setTaskSelected,
  setShowTaskDialog,
  openEditDialog,
}: TaskListProps) => {
  const { tasks } = useTaskStore();
  const { selectedTask, handleDeleteTask, setEditingTask, setTaskForm } =
    useActions();
  const { getPriorityColor, getStatusText, getStatusColor, getStatusIcon } =
    useColors();
  const { audioSrc } = notesServices();
  const { handleDragEnd } = useTaskDragAndDrop(tasks);

  const handleSelectedTask = async (task: TaskData) => {
    setTaskSelected(task);

    if (task && task.audioNote) {
      const response = await audioSrc(task.audioNote);
    }
  };

  return (
    <div className="flex-1 p-4 rounded-3xl bg-accent-foreground/20 border border-accent/10  overflow-hidden  h-screen md:h-auto ">
      <div className="mb-6">
        <h1 className="text-xl font-bold  text-foreground">Mis Tareas</h1>
        <p className=" text-foreground/80 text-xs">
          Gestiona y organiza tus tareas
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-100px)] md:h-[calc(100vh-150px)]  ">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4 notScrolling"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          selectedTask={selectedTask}
                          handleSelectedTask={handleSelectedTask}
                          getStatusColor={getStatusColor}
                          getStatusIcon={getStatusIcon}
                          getPriorityColor={getPriorityColor}
                          getStatusText={getStatusText}
                          openEditDialog={openEditDialog}
                          handleDeleteTask={handleDeleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {tasks.length === 0 && (
          <div className="text-center py-12  ">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay tareas
            </h3>
            <p className="text-gray-600 mb-4">
              Crea tu primera tarea para comenzar
            </p>
            <Button
              onClick={() => {
                setTaskForm({
                  title: "",
                  description: "",
                  priority: "media",
                  status: "",
                  _id: "",
                  team_id: "",
                });
                setEditingTask(null);
                setShowTaskDialog(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TaskList;
