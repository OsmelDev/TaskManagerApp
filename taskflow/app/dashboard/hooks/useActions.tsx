import { authServices } from "@/services/auth/auth.services";
import { taskServices } from "@/services/task/task.services";
import {
  priority,
  TaskData,
  TeamData,
  useTaskStore,
  useTeamStore,
  useUserStore,
} from "@/store/user.store";
import { useTeam } from "./useTeam";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { FieldValues } from "react-hook-form";
import { teamServices } from "@/services/team/team.services";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface Params {
  data: FieldValues;
}
interface ParamsTask {
  taskData: FieldValues;
  _id: string;
}
interface TaskResponse {
  data: {
    message: string;
    taskSave: {
      createdAt: string;
      created_by: string;
      description: string;
      priority: priority;
      status: string;
      title: string;
      updatedAt: string;
      __v: 0;
      _id: string;
    };
  };
}

export const useActions = () => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "media" as "alta" | "media" | "baja",
    status: "",
    _id: "",
    team_id: "",
  });
  const [teamForm, setTeamForm] = useState({
    name: "",
    description: "",
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [selected, setSelected] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuthService } = authServices();
  const { setUser } = useUserStore();
  const { loadTasks } = taskServices();
  const { saveTasks, setTask } = useTaskStore();
  const { saveTeams } = useTeamStore();
  const { fetchTeams, fetchTasksTeams } = useTeam();
  const router = useRouter();
  const { toast } = useToast();

  const { create, addMember } = teamServices();
  const { createTask, update, updateStatus } = taskServices();

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

  const createTaskNew = async (taskData: FieldValues) => {
    try {
      const { data }: TaskResponse = await createTask(taskData);
      if (data) {
        setTask(data?.taskSave);
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
    } catch (error:any) {
      toast({
        description: error.message,
        variant: "error",
      });
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
      }
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
      if (selectedTask?._id === taskId) {
        setSelectedTask((prev) =>
          prev
            ? { ...prev, status, updated_at: new Date().toISOString() }
            : null
        );
      }

      const response = await updateStatusTask({ _id: taskId, status });

      if (response) {
        await reloadTasks();
        toast({
          description: `La tarea ahora está ${status.replace("_", " ")}.`,
          variant: "success",
        });
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

  const loadTasksTeam = async () => {
    if (selectedTeam?._id) {
      await fetchTasksTeams(selectedTeam._id);
    }
  };

  const createTeam = async ({ data }: Params) => {
    try {
      const response = await create({ data });
      if (!response) return;

      toast({
        description: "El equipo se ha creado correctamente.",
        variant: "success",
      });

      setTeamForm({ name: "", description: "" });
      setShowTeamDialog(false);
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadTeams = async () => {
    try {
      const data = await fetchTeams();

      saveTeams(data || []);
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    loadTasksTeam();
  }, [selectedTeam]);

  useEffect(() => {
    checkUser();
    reloadTasks();
  }, []);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baja":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "en_proceso":
        return "En Proceso";
      case "terminada":
        return "Terminada";
      default:
        return status;
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "text-gray-500";
      case "en_proceso":
        return "text-blue-500";
      case "terminada":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Circle className="h-4 w-4" />;
      case "en_proceso":
        return <Clock className="h-4 w-4" />;
      case "terminada":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return {
    getStatusIcon,
    getStatusColor,
    isLoading,
    setSelectedTeam,
    taskForm,
    setTaskForm,
    getStatusText,
    reloadTasks,
    loadTeams,
    setShowTaskDialog,
    showTaskDialog,
    editingTask,
    setEditingTask,
    selected,
    setSelected,
    selectedTask,
    setSelectedTask,
    getPriorityColor,
    openEditDialog,
    selectedTeam,
    updateTaskStatus,
    isUpdatingStatus,
    showTeamDialog,
    setShowTeamDialog,
    teamForm,
    setTeamForm,
    createTeam,
    createTaskNew,
    updateTask,
    showAddDialog,
    setShowAddDialog,
    openAddDialog,
    addMembers,
  };
};
