import { Toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Ban, CircleAlert, CircleCheck, CircleX, Clock } from "lucide-react";
import React from "react";

interface ToastProps {
  dismiss: (id: string) => void;
  toasts: Toast[];
  className?: string;
}

const ToastAlert = ({ dismiss, toasts, className }: ToastProps) => {
  const getStatusColor = (variant: string | undefined) => {
    switch (variant) {
      case "error":
        return " rounded-[5px] border-l-[20px] border-l-red-600 bg-sidebar/70 text-red-600";
      case "success":
        return " rounded-[5px] border-l-[20px] border-l-green-600 bg-sidebar/70 text-green-600 ";
      case "warning":
        return " rounded-[5px] border-l-[20px] border-l-red-800 bg-sidebar/70 text-foreground";
      case "destructive":
        return " rounded-[5px] border-l-[20px] border-l-red-950 bg-sidebar/70 text-foreground";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (variant: string | undefined) => {
    switch (variant) {
      case "error":
        return <CircleX className="h-8 w-8 text-red-500" />;
      case "success":
        return <CircleCheck className="h-8 w-8 text-green-700" />;
      case "warning":
        return <CircleAlert className="h-8 w-8 text-red-800" />;
      case "destructive":
        return <Ban className="h-8 w-8 text-red-950" />;
      default:
        return <Clock className="h-8 w-8" />;
    }
  };

  return (
    <div className="fade-in rounded-[5px] fixed top-4 right-4 space-y-2 text-accent">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            `${getStatusColor(
              toast.variant
            )} fade-in min-w-[150px] h-[60px] py-1 px-3 flex gap-4 items-center `,
            className
          )}
          onClick={() => dismiss(toast.id)}
        >
          {getStatusIcon(toast.variant)}
          <div>
            <p>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastAlert;
