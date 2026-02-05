import React, { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "../components/atoms";
import { ToastVariant } from "../components/atoms/Toast/Toast.types";

interface ToastOptions {
  variant?: ToastVariant;
  message: string;
  autoHideDuration?: number;
}

interface ToastState
  extends Required<Pick<ToastOptions, "variant" | "message">> {
  open: boolean;
  autoHideDuration: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const INITIAL_STATE: ToastState = {
  open: false,
  variant: "info",
  message: "",
  autoHideDuration: 3000,
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ToastState>(INITIAL_STATE);

  const showToast = useCallback((options: ToastOptions) => {
    setState({
      open: true,
      variant: options.variant ?? "info",
      message: options.message,
      autoHideDuration: options.autoHideDuration ?? 3000,
    });
  }, []);

  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        variant={state.variant}
        message={state.message}
        open={state.open}
        onClose={handleClose}
        autoHideDuration={state.autoHideDuration}
      />
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
