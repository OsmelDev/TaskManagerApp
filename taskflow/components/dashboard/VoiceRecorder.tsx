"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ControllerRenderProps } from "react-hook-form";

interface VoiceNoteRecorderProps {
  field?: ControllerRenderProps;
  onRecordingComplete?: (audioBlob: Blob) => void;
}

export interface VoiceNoteRecorderHandle {
  getAudioBlob: () => Blob | null;
  getRecordingTime: () => number;
}

const VoiceNoteRecorder = forwardRef<
  VoiceNoteRecorderHandle,
  VoiceNoteRecorderProps
>(({ field, onRecordingComplete }, ref) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (field) {
      field.onChange({
        duration: recordingTime,
      });
    }
  }, [recordingTime]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setPermissionDenied(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);

        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          return prevTime + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      setPermissionDenied(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useImperativeHandle(ref, () => ({
    getAudioBlob: () => audioBlob,
    getRecordingTime: () => recordingTime,
  }));

  return (
    <div className="voice-recorder p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-3">Nota de Voz</h3>

      {permissionDenied && (
        <div className="text-red-500 text-sm mb-3">
          Permiso de micrófono denegado. Por favor, habilita los permisos.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            {audioUrl ? "Regrabar" : "Iniciar Grabación"}
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Detener Grabación
          </button>
        )}

        {audioUrl && !isRecording && (
          <div className="flex flex-col gap-2">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/wav" />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <p className="text-sm text-gray-600">
              Duración: {formatTime(recordingTime)}
            </p>
          </div>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center mt-3 text-red-500">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span>Grabando: {formatTime(recordingTime)}</span>
        </div>
      )}
    </div>
  );
});

export default VoiceNoteRecorder;
