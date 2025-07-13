"use client";
import { useToast } from "@/hooks/use-toast";
import { teamServices } from "@/services/team/team.services";
import { useTeamStore } from "@/store/user.store";

export const useTeam = () => {
  const { viewTeams, getMyTask, viewTask } = teamServices();
  const { toast } = useToast();
  const { saveTasksTeam } = useTeamStore();

  const fetchTeams = async () => {
    try {
      const { data } = await viewTeams();
      if (data) return data;
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "error",
      });
    }
  };

  const fetchTasksTeams = async (_id: string) => {
    try {
      const { data } = await viewTask(_id);
      if (data) saveTasksTeam(data);
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  const getMyTasks = async () => {
    try {
      const { data } = await getMyTask();
      if (data) return data;
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "error",
      });
    }
  };

  return { getMyTasks, fetchTeams, fetchTasksTeams };
};
