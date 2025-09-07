import { DropResult } from "@hello-pangea/dnd";
import { useToast } from "./use-toast";
import { TaskData, useTaskStore, useTeamStore } from "@/store/user.store";

const useDragAndDrop = (tasks: TaskData[]) => {
  const { saveTasks } = useTaskStore();
  const { saveTasksTeam } = useTeamStore();
  const { toast } = useToast();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, draggableId, source } = result;

    if (!destination || destination.index === source.index) return;

    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((t) => t._id === draggableId);
    const [movedTask] = newTasks.splice(taskIndex, 1);
    newTasks.splice(destination.index, 0, movedTask);

    saveTasks(newTasks);
  };

  const handleDragEndTeam = async (result: DropResult) => {
    const { destination, draggableId, source } = result;

    if (!destination || destination.index === source.index) return;

    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((t) => t._id === draggableId);
    const [movedTask] = newTasks.splice(taskIndex, 1);
    newTasks.splice(destination.index, 0, movedTask);

    saveTasksTeam(newTasks);
  };

  return { handleDragEnd, handleDragEndTeam };
};
export default useDragAndDrop;
