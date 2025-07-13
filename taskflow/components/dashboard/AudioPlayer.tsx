import { API_URL } from "@/config";
import { FC } from "react";

interface AudioPlayerProps {
  url: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ url }) => {
  if (!url) return <div>Cargando audio...</div>;

  return (
    <div className="flex flex-col gap-2 ">
      <audio controls className="w-full">
        <source src={`${API_URL}${url}`} type="audio/wav" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};
