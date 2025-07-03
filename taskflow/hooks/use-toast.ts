"use client";

import { useToastStore } from "@/store/toast.store";
import { useCallback, useRef } from "react";

type ToastType = "default" | "success" | "error" | "warning" | "destructive";

interface Toast {
  id: string;
  description?: string;
  variant?: ToastType;
}

interface ToastOptions {
  description?: string;
  variant?: ToastType;
}

let toastCount = 0;

export function useToast() {
  const { saveToasts, dismissToast, toasts, dismissAllToast } = useToastStore();
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const toast = useCallback(
    ({ description, variant = "default" }: ToastOptions) => {
      const id = `toast-${++toastCount}`;
      const newToast: Toast = { id, description, variant };

      saveToasts(newToast);

      const timeout = setTimeout(() => {
        dismiss(id);
      }, 2000);

      timeoutsRef.current.set(id, timeout);

      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }

    const result = toasts.filter((toast) => toast.id !== id);
    dismissToast(result);
    if (toasts.length === 1) dismissAll();
  }, []);

  const dismissAll = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current.clear();

    dismissAllToast([]);
  }, []);

  return { toast, dismiss, dismissAll };
}

// Export types for components
export type { Toast, ToastOptions };
