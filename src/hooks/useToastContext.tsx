import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';

export const useToastContext = () => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error('useToast must be used whthin a ToastProvider');
  }

  return toastContext;
};
