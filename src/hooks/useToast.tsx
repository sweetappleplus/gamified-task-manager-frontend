import React, { createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastVariant } from "components";

interface ToastOptions {
  variant?: ToastVariant;
  message: string;
  autoHideDuration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_GAP = 64;
const TOAST_TOP_OFFSET = 24;

let toastIdCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [
      ...prev,
      {
        id,
        ...options,
      },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          open
          onClose={() => removeToast(toast.id)}
          autoHideDuration={toast.autoHideDuration}
          sx={{
            "&.MuiSnackbar-root": {
              top: `${TOAST_TOP_OFFSET + index * TOAST_GAP}px`,
            },
          }}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
