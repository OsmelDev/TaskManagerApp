"use client";
import { teamServices } from "@/services/team/team.services";
import { useTeam } from "./useTeam";
import { useToast } from "@/hooks/use-toast";
import { useTeamStore } from "@/store/user.store";
import { useState } from "react";
import { Params } from "@/types/types";

export const useActionsTeam = () => {
  const [teamForm, setTeamForm] = useState({
    name: "",
    description: "",
  });
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const { fetchTeams } = useTeam();
  const { saveTeams } = useTeamStore();
  const { create } = teamServices();
  const { toast } = useToast();

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

  return {
    createTeam,
    loadTeams,
    teamForm,
    setTeamForm,
    showTeamDialog,
    setShowTeamDialog,
  };
};
