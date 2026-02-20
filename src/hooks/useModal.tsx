import React, { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "components";

interface ModalOptions {
  title: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: number;
  maxHeight?: number;
  bgcolor?: string;
  desktopBodyPadding?: string;
  mobileBodyPadding?: string;
}

interface ModalContextValue {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalOptions | null>(null);

  const openModal = useCallback((options: ModalOptions) => {
    setModalState(options);
  }, []);

  const closeModal = useCallback(() => {
    setModalState(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        open={!!modalState}
        onClose={closeModal}
        title={modalState?.title ?? ""}
        body={modalState?.body}
        footer={modalState?.footer}
        maxWidth={modalState?.maxWidth}
        maxHeight={modalState?.maxHeight}
        bgcolor={modalState?.bgcolor}
        desktopBodyPadding={modalState?.desktopBodyPadding}
        mobileBodyPadding={modalState?.mobileBodyPadding}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
