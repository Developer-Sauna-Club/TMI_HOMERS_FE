import { createContext, ReactNode, useEffect, useState } from 'react';
import Toast from '@components/Toast';

type ToastContextValues = {
  showToast: (message: string, mode?: 'info' | 'success' | 'error', onClick?: () => void) => void;
  hideToast: () => void;
};

type ToastStateTypes = {
  message: string;
  mode?: 'info' | 'success' | 'error';
  onClick?: () => void;
};

export const ToastContext = createContext<ToastContextValues | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const TIME_OUT = 3000;
  const [toast, setToast] = useState<ToastStateTypes | null>(null);

  const showToast = (
    message: string,
    mode?: 'info' | 'success' | 'error',
    onClick?: () => void,
  ) => {
    setToast({ message, mode, onClick });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timeoutId = setTimeout(() => {
        setToast(null);
      }, TIME_OUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast mode={toast.mode} message={toast.message} onClick={toast.onClick} />}
    </ToastContext.Provider>
  );
};
