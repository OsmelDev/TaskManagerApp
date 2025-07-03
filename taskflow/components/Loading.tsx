import { Target } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Target className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
