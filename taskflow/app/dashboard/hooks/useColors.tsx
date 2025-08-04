import { CheckCircle2, Circle, Clock } from "lucide-react";

export const useColors = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baja":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "en_proceso":
        return "En Proceso";
      case "terminada":
        return "Terminada";
      default:
        return "Selecciona el estado";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "text-gray-500";
      case "en_proceso":
        return "text-blue-500";
      case "terminada":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Circle className="h-4 w-4" />;
      case "en_proceso":
        return <Clock className="h-4 w-4" />;
      case "terminada":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return { getPriorityColor, getStatusText, getStatusColor, getStatusIcon };
};
