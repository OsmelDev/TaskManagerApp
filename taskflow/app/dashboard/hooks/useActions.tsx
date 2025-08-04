import { authServices } from "@/services/auth/auth.services";
import { taskServices } from "@/services/task/task.services";
import {
  priority,
  TaskData,
  TeamData,
  useTaskStore,
  useUserStore,
} from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { FieldValues } from "react-hook-form";
import { teamServices } from "@/services/team/team.services";
import { useRouter } from "next/navigation";
import { useActionsTeam } from "./useActionsTeam";
import { useTeam } from "./useTeam";
import { ParamsTask, TaskResponse } from "@/types/types";

export const useActions = () => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const [removeMember, setRemoveMember] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "media" as "alta" | "media" | "baja",
    status: "",
    _id: "",
    team_id: "",
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [selected, setSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);

  const { checkAuthService } = authServices();
  const { loadTasks, deleteTask } = taskServices();

  const { setUser } = useUserStore();
  const { saveTasks, setTask, taskSelected, setTaskSelected } = useTaskStore();
  const { addMember, removeMembers } = teamServices();
  const { createTask, update, updateStatus } = taskServices();
  const { fetchTasksTeams } = useTeam();

  const { toast } = useToast();
  const router = useRouter();

  const { loadTeams } = useActionsTeam();

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);

      toast({
        description: "La tarea se ha eliminado correctamente.",
        variant: "success",
      });

      if (selectedTask?._id === taskId) {
        setSelectedTask(null);
      }

      await reloadTasks();
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addMembers = async (data: FieldValues) => {
    try {
      const response = await addMember(data);
      toast({
        description: response.data.message,
        variant: "success",
      });
      await loadTasks();
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  const removeMembersTeam = async (data: FieldValues) => {
    try {
      const response = await removeMembers(data);
      toast({
        description: response.data.message,
        variant: "success",
      });
      await loadTasks();
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  const createTaskNew = async (taskData: FieldValues) => {
    try {
      const { data }: TaskResponse = await createTask(taskData);

      if (data) {
        setTask(data?.data);
        setShowTaskDialog(false);

        toast({
          description: data.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  const updateTask = async ({ _id, taskData }: ParamsTask) => {
    try {
      const { data } = await update({ _id, taskData });

      if (data) {
        toast({
          description: data.message,
          variant: "success",
        });

        setTaskForm({
          title: "",
          description: "",
          priority: "media",
          status: "",
          _id: "",
          team_id: "",
        });
        setEditingTask(null);
        setShowTaskDialog(false);
        await reloadTasks();
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateStatusTask = async ({
    _id,
    status,
  }: {
    _id: string;
    status: string;
  }) => {
    try {
      const { data } = await updateStatus({ _id, status });
      return data;
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "error",
      });
    }
  };
  const updateTaskStatus = async (taskId: string, status: string) => {
    if (isUpdatingStatus) return;
    setIsUpdatingStatus(true);

    try {
      if (taskSelected?._id === taskId) {
        const response = await updateStatusTask({ _id: taskId, status });
        if (response) {
          await reloadTasks();
          setTaskSelected({
            ...taskSelected,
            status,
            updatedAt: new Date().toDateString(),
          });
          toast({
            description: `La tarea ahora está ${status.replace("_", " ")}.`,
            variant: "success",
          });
        }
      }
    } catch (error: any) {
      await reloadTasks();

      toast({
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const reloadTasks = async () => {
    try {
      const apiData = await loadTasks();

      if (!Array.isArray(apiData)) {
        throw new Error("La API no devolvió un array de tareas");
      }
      saveTasks(apiData);
      if (selectedTask) {
        const updatedSelectedTask =
          apiData?.find((task) => task._id === selectedTask._id) || null;
        setSelectedTask(updatedSelectedTask);
        console.log(updatedSelectedTask);
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "error",
      });
    }
  };

  const checkUser = async () => {
    try {
      const { data } = await checkAuthService();
      setIsLoading(false);
      if (data) setUser(data);

      await Promise.all([loadTasks(), loadTeams()]);
    } catch (error) {
      router.push("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasksTeam();
  }, [selectedTeam]);

  useEffect(() => {
    checkUser();
    reloadTasks();
  }, []);

  const openEditDialog = (task: TaskData) => {
    setEditingTask(task);

    setTaskForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      _id: task._id,
      team_id: task.team_id as string,
    });
    setShowTaskDialog(true);
  };

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const openRemoveDialog = () => {
    setRemoveMember(true);
  };

  const loadTasksTeam = async () => {
    if (selectedTeam?._id) {
      await fetchTasksTeams(selectedTeam._id);
    }
  };

  return {
    checkUser,
    isLoading,
    taskForm,
    setTaskForm,
    reloadTasks,
    setShowTaskDialog,
    showTaskDialog,
    editingTask,
    setEditingTask,
    selected,
    setSelected,
    selectedTask,
    setSelectedTask,
    openEditDialog,
    updateTaskStatus,
    isUpdatingStatus,
    createTaskNew,
    updateTask,
    showAddDialog,
    setShowAddDialog,
    removeMember,
    setRemoveMember,
    openRemoveDialog,
    openAddDialog,
    addMembers,
    handleDeleteTask,
    removeMembersTeam,
    setSelectedTeam,
    selectedTeam,
  };
};
