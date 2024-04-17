import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@type/User';
import { updateProfileImage } from '@/api/User';
import { TOAST_MESSAGES } from '@constants/Messages';

type ImageMutationOptions = {
  queryKey: string[];
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
};

const useImageMutation = (options: ImageMutationOptions) => {
  const queryClient = useQueryClient();
  const { queryKey, showToast } = options;

  return useMutation({
    mutationFn: updateProfileImage,
    onMutate: async (newImage) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData: User | undefined = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: User) => {
        if (!old) {
          return;
        }
        return {
          ...old,
          image: URL.createObjectURL(newImage),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      showToast(TOAST_MESSAGES.CHANGE_PROFILE_IMAGE_SUCCESS, 'success');
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context);
      showToast(TOAST_MESSAGES.CHANGE_PROFILE_IMAGE_FAILED, 'error');
    },
  });
};

export default useImageMutation;
