import { useMutation } from '@tanstack/react-query';
import { createNotification } from '@/api/Notification';

export const useNotification = () => {
  return useMutation({
    mutationFn: createNotification,
  });
};
