import axios from "axios";

export const axiosIntance = () => {
  const auth = axios.create({
    baseURL: "http://localhost:3000/auth/",
  });
  const task = axios.create({
    baseURL: "http://localhost:3000/task/",
  });
  const team = axios.create({
    baseURL: "http://localhost:3000/team/",
  });
  const voiceNote = axios.create({
    baseURL: "http://localhost:3000/notes/",
  });

  return { auth, task, team, voiceNote };
};
