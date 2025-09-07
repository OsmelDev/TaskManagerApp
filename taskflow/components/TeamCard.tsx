"use client";
import { TaskData, TeamData } from "@/store/user.store";
import { Edit, MoreVertical, Trash2, User, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
    className="p-2 rounded-[5px] shadow-xs shadow-accent/20 bg-accent-foreground/30  text-foreground hover:bg-gray-900  transition-colors cursor-pointer"
    onClick={() => {
      setSelected(false);
      setSelectedTeam(team);
      setSelectedTask(null);
      setTaskSelected(null);
    }}
  >
    <div className="flex items-center justify-between gap-5 ">
      <div className="flex justify-between w-full">
        <div className="flex space-x-2">
          <Users className="h-3 w-3 " />
          <span className="text-xs font-medium ">{team.name}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <User className="h-3 w-3 " />
          <span className="text-[10px] font-medium">{team.members.length}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical
            className="h-4 w-4 hover:border rounded-[2px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-background border-border/20"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRemoveMember(false);
              openAddDialog();
            }}
            className="text-xs focus:bg-accent-foreground/40 rounded-[5px] cursor-pointer flex items-center justify-center hover:bg-gray-400/30"
          >
            <Edit className="h-1 w-1 " />
            {/* Add Menber */}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRemoveMember(true);
              openAddDialog();
            }}
            className="text-xs focus:bg-accent-foreground/40 rounded-[5px] cursor-pointer flex items-center justify-center"
          >
            <Trash2 className="h-1 w-1" />
            {/* Remove Member */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    {team.description && (
      <p className="text-[10px]  mt-1 ml-6">{team.description}</p>
    )}
  </div>
);
export default TeamCard;
