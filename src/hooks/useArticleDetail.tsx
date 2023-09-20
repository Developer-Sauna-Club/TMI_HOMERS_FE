import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { CommentParams, createComment } from '@/api/common/Comment';
import { fetchPost } from '@/api/common/Post';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useToastContext } from './useToastContext';

export const useArticleDetail = () => {
  const queryClient = useQueryClient();
  const { pathname: url } = useLocation();
  const postId = url.split('/').pop() || '';
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
    onSuccess: () => {
      queryClient.invalidateQueries(['article', postId]);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.DELETE_COMMENT_FAILED, 'error');
    },
  });

  const addComment = (newComment: CommentParams) => {
    commentMutation.mutate({ ...newComment, postId });
  };

  return { data, isLoading, addComment };
};
