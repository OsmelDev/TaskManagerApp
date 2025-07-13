import { axiosIntance } from "@/intance/axios";
import { FieldValues } from "react-hook-form";

interface Params {
  taskData: FieldValues;
  _id: string;
}

export const taskServices = () => {
  const { task } = axiosIntance();

  const createTask = async (data: FieldValues) => {
    const body = data;
    const response = await task.post("create", body, { withCredentials: true });
    return response;
  };

  const deleteTask = async (_id: string) => {
    const body = {
      _id,
    };
    const response = await task.post("delete", body, {
      withCredentials: true,
    });
    return response;
  };

  const loadTasks = async () => {
    const { data } = await task.get("viewTask", { withCredentials: true });
    return data;
  };

  const update = async ({ taskData, _id }: Params) => {
    const body = taskData;
    const response = await task.post(`update/${_id}`, body, {
      withCredentials: true,
    });
    return response;
  };

  const updateStatus = async ({
    _id,
    status,
  }: {
    _id: string;
    status: string;
  }) => {
    const body = {
      status,
    };
    const response = await task.post(`updatestatus/${_id}`, body, {
      withCredentials: true,
    });
    return response;
  };
  return { createTask, deleteTask, loadTasks, update, updateStatus };
};
