import { axiosIntance } from "@/intance/axios";

export const notesServices = () => {
  const { voiceNote } = axiosIntance();

  const audioSrc = async (_id: string) => {
    const response = await voiceNote.get(`/voice-notes/${_id}`, {
      withCredentials: true,
    });
    return response;
  };

  return { audioSrc };
};
