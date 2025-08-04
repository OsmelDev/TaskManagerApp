import { priority } from "@/store/user.store";
import { FieldValues } from "react-hook-form";

export interface ParamsTask {
  taskData: FieldValues;
  _id: string;
}
export interface TaskResponse {
  data: {
    message: string;
    data: {
      createdAt: string;
      created_by: string;
      description: string;
      priority: priority;
      status: string;
      title: string;
      updatedAt: string;
      __v: 0;
      _id: string;
      audioNote: string;
      voiceNote: string;
    };
  };
}

export interface Params {
  data: FieldValues;
}
