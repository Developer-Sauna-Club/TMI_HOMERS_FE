import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { CommentParams, createComment } from '@/api/common/Comment';
import { createNotification } from '@/api/common/Notification';
import { fetchPost } from '@/api/common/Post';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useToastContext } from './useToastContext';

export const useArticleDetail = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const postId = params.postId as string;
  const { showToast } = useToastContext();

  const { data, isLoading } = useQuery<Post>(
    ['article', postId],
    async () => {
      const response = await fetchPost(postId);
      return response;
    },
    {
      staleTime: 1000 * 5,
    },
  );

  const commentMutation = useMutation(createComment, {
    onSuccess: (returnData, variables) => {
      queryClient.invalidateQueries(['article', postId]);
      const { userId } = variables;

      const commentId = returnData._id;
      createNotification({
        notificationType: 'COMMENT',
        notificationTypeId: commentId,
        userId,
        postId,
      });
    },
    onError: () => {
      showToast(TOAST_MESSAGES.POST_FAILED, 'error');
    },
  });

  const addComment = (newComment: CommentParams) => {
    commentMutation.mutate(newComment);
  };

  return { data, isLoading, addComment };
};
