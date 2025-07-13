import { create } from "zustand";

interface UserData {
  name?: string;
  id?: string;
  email?: string;
}
export type priority = "alta" | "media" | "baja";

export interface TaskData {
  createdAt: string;
  created_by: string;
  description: string;
  priority: priority;
  status: string;
  title: string;
  updatedAt: string;
  team_id?: string;
  __v: 0;
  _id: string;
  audioNote: string;
  voiceNote: string;
}

export interface TeamData {
  createdAt: string;
  updatedAt: string;
  created_by: string;
  description: string;
  name: string;
  members: [];
  _id: string;
}

interface UserStore {
  user: UserData;
  setUser: (data: UserData) => void;
  delUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {},
  setUser: (data: UserData) => set({ user: data }),
  delUser: () => set({ user: {} }),
}));

const initialValue: TaskData[] | [] = [];
const initialTeamValue: TeamData[] | [] = [];

interface TaskStore {
  tasks: TaskData[];
  setTask: (data: TaskData) => void;
  saveTasks: (tasks: TaskData[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialValue,
  saveTasks: (newTasks: TaskData[]) => set({ tasks: newTasks }),
  setTask: (task: TaskData) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));

interface TeamStore {
  teams: TeamData[];
  tasks: TaskData[];
  saveTasksTeam: (newTasks: TaskData[]) => void;

  saveTeams: (newTeam: TeamData[]) => void;
  setTeam: (team: TeamData) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: initialTeamValue,
  tasks: [],
  saveTasksTeam: (newTasks: TaskData[]) => set({ tasks: newTasks }),
  saveTeams: (newTeams: TeamData[]) => set({ teams: newTeams }),
  setTeam: (team: TeamData) =>
    set((state) => ({
      teams: [...state.teams, team],
    })),
}));
