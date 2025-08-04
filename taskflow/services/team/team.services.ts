import { axiosIntance } from "@/intance/axios";
import { Params } from "@/types/types";
import { FieldValues } from "react-hook-form";

export const teamServices = () => {
  const { team } = axiosIntance();

  const create = async ({ data }: Params) => {
    const body = {
      name: data.name,
      description: data.description,
    };
    const response = await team.post("create", body, { withCredentials: true });

    return response;
  };

  const viewTeams = async () => {
    const response = await team.get("teams", { withCredentials: true });

    return response;
  };

  const viewTask = async (_id: string) => {
    const response = await team.get(`tasks/${_id}`, { withCredentials: true });
    return response;
  };

  const getMyTask = async () => {
    const response = await team.get("/my", { withCredentials: true });
    return response;
  };

  const addMember = async (data: FieldValues) => {
    const body = {
      teamId: data.team,
      email: data.email,
    };

    const response = await team.post("add", body, { withCredentials: true });
    return response;
  };

  const removeMembers = async (data: FieldValues) => {
    const body = {
      teamId: data.team,
      email: data.email,
    };

    const response = await team.post("remove", body, { withCredentials: true });
    return response;
  };

  return { create, viewTeams, viewTask, getMyTask, addMember, removeMembers };
};
