import { Target } from "lucide-react";
import React from "react";

const Info = () => {
  return (
    <div className="text-center py-12 fade-in">
      <Target className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110" />
      <h3 className="text-lg font-medium text-foreground/80 mb-2">
        Selecciona una tarea
      </h3>
      <p className="text-foreground/85">
        Haz clic en una tarea para ver sus detalles
      </p>
    </div>
  );
};

export default Info;
