import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskData } from "@/store/user.store";
import { Draggable } from "@hello-pangea/dnd";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import React, { FC, forwardRef } from "react";

interface TaskCardProps {
  task: TaskData;
  selectedTask: TaskData | null;
  handleSelectedTask: (task: TaskData) => Promise<void>;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.JSX.Element;
  getPriorityColor: (priority: string) => string;
  getStatusText: (status: string) => string;
  openEditDialog: (task: TaskData) => void;
  handleDeleteTask: (taskId: string) => Promise<void>;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      task,
      selectedTask,
      handleSelectedTask,
      getStatusColor,
      getStatusIcon,
      getPriorityColor,
      getStatusText,
      openEditDialog,
      handleDeleteTask,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        key={task._id}
        className={`cursor-pointer transition-all border-0 gap-1 rounded-[10px] backdrop-blur-2xl bg-accent-foreground/60 hover:shadow-xs hover:shadow-accent/20 shadow-xs   py-4  ${
          selectedTask?._id === task._id ? "ring-2 ring-gray-900" : ""
        }`}
        onClick={() => handleSelectedTask(task)}
        {...props}
        ref={ref}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={getStatusColor(task.status)}>
                  {getStatusIcon(task.status)}
                </span>
                <CardTitle className="text-xs text-foreground">
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
                <MoreVertical
                  className="h-4 w-4 hover:text-accent rounded-[2px] "
                  onClick={(e) => e.stopPropagation()}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background border-border/20"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditDialog(task);
                  }}
                  className="text-red-600 focus:bg-accent-foreground/40 cursor-pointer border-accent"
                >
                  <Edit className="h-3 w-3 " />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task._id);
                  }}
                  className="text-red-600 focus:bg-accent-foreground/40 cursor-pointer border-accent"
                >
                  <Trash2 className="h-3 w-3" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        {task.description && (
          <CardContent className="pt-0 ">
            <p className="text-sm text-foreground/60 line-clamp-2">
              {task.description}
            </p>
          </CardContent>
        )}
      </Card>
    );
  }
);
export default TaskCard;
