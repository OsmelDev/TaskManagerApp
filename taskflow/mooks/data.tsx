import { CheckCircle, Star, Target, Users, Zap } from "lucide-react";

export const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
    title: "Gestión Intuitiva",
    description:
      "Crea, edita y elimina tareas con una interfaz simple y elegante.",
  },
  {
    icon: <Target className="h-6 w-6 text-purple-600" />,
    title: "Priorización Clara",
    description: `Clasifica tus tareas por importancia: alta, media o baja 
      prioridad.`,
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    title: "Trabajo en Equipo",
    description: "Crea equipos, asigna tareas y colabora de manera efectiva.",
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: "Estados de Progreso",
    description: "Marca tus tareas como pendientes, en proceso o terminadas.",
  },
  {
    icon: <Star className="h-6 w-6 text-red-600" />,
    title: "Vista Detallada",
    description: "Selecciona cualquier tarea para ver su información completa.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
    title: "Fácil de Usar",
    description: "Interfaz intuitiva que no requiere curva de aprendizaje.",
  },
];
