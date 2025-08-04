"use client";
import { TaskData, TeamData } from "@/store/user.store";
import { Edit, MoreVertical, Trash2, User, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type TeamCardProps = {
  team: TeamData;
  setSelected: (value: React.SetStateAction<boolean>) => void;
  setSelectedTeam: (value: React.SetStateAction<TeamData | null>) => void;
  openAddDialog: () => void;
  setSelectedTask: (value: React.SetStateAction<TaskData | null>) => void;
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskSelected: (data: TaskData | null) => void;
};

const TeamCard = ({
  team,
  setSelected,
  setSelectedTeam,
  openAddDialog,
  setSelectedTask,
  setRemoveMember,
  setTaskSelected,
}: TeamCardProps) => (
  <div
    key={team._id}
    className="p-3 rounded-lg  bg-accent-foreground/60  text-foreground hover:bg-gray-900  transition-colors cursor-pointer"
    onClick={() => {
      setSelected(false);
      setSelectedTeam(team);
      setSelectedTask(null);
      setTaskSelected(null);
    }}
  >
    <div className="flex items-center justify-between ">
      <div className="flex justify-between w-[95%]">
        <div className="flex space-x-2">
          <Users className="h-4 w-4 " />
          <span className="text-sm font-medium ">{team.name}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <User className="h-3 w-3 " />
          <span className="text-[10px] font-medium">{team.members.length}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRemoveMember(false);
              openAddDialog();
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Add Menber
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRemoveMember(true);
              openAddDialog();
            }}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    {team.description && (
      <p className="text-xs  mt-1 ml-6">{team.description}</p>
    )}
  </div>
);
export default TeamCard;
