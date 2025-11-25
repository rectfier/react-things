import * as React from 'react';
import { useState, createContext, useContext, useCallback } from 'react';
import Dialog from '../ui/Dialog/Dialog';

interface DialogContextType {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

interface DialogConfig {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);

  const openDialog = useCallback((config: DialogConfig) => {
    setDialogConfig(config);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    // Clear config after a short delay to allow animation
    setTimeout(() => {
      setDialogConfig(null);
    }, 300);
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogConfig && (
        <Dialog
          open={isOpen}
          title={dialogConfig.title}
          onClose={closeDialog}
          icon={dialogConfig.icon}
          className={dialogConfig.className}
          footer={dialogConfig.footer}
        >
          {dialogConfig.children}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

