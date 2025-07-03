"use client";

import { useToast } from "@/hooks/use-toast";
import { useToastStore } from "@/store/toast.store";
import ToastAlert from "../Toast";

export function Toaster() {
  const { dismiss } = useToast();
  const { toasts } = useToastStore();

  return (
    <div className="w-[280px] h-[50px]  fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      <ToastAlert toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
