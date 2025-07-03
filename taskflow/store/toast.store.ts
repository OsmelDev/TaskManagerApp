import { Toast } from "@/hooks/use-toast";
import { create } from "zustand";

const initialValue: Toast[] = [];

interface ToastStore {
  toasts: Toast[] | [];
  saveToasts: (toast: Toast) => void;
  dismissToast: (toast: Toast[]) => void;
  dismissAllToast: (toast: Toast[]) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: initialValue,
  saveToasts: (team: Toast) =>
    set((state) => ({
      toasts: [...state.toasts, team],
    })),
  dismissToast: (toast: Toast[]) => set({ toasts: toast }),
  dismissAllToast: (toast: Toast[]) => set({ toasts: [] }),
}));
