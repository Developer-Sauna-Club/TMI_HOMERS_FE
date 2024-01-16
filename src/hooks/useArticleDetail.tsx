import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { CommentParams, createComment, deleteComment } from '@/api/Comment';
import { createNotification } from '@/api/Notification';
import { deletePost, fetchPost } from '@/api/Post';
import { TOAST_MESSAGES } from '@constants/Messages';
import { useToastContext } from './useToastContext';

export const useArticleDetail = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const postId = params.postId as string;
  const { showToast } = useToastContext();
  const navigate = useNavigate();

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

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['article', postId]);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['userArticles']);
      queryClient.invalidateQueries(['likedArticles']);
      queryClient.invalidateQueries(['newestArticles']);
      queryClient.invalidateQueries(['followingArticles']);
      showToast('게시물이 삭제되었습니다', 'success');
      navigate(-1);
    },
  });

  const deletePostArticle = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  const commentMutation = useMutation(createComment, {
    onSuccess: (returnData, variables) => {
      queryClient.invalidateQueries(['article', postId]);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['userInfo', returnData.author._id]);
      queryClient.invalidateQueries(['userArticles']);
      queryClient.invalidateQueries(['likedArticles']);
      queryClient.invalidateQueries(['newestArticles']);
      queryClient.invalidateQueries(['followingArticles']);

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

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: (returnData) => {
      queryClient.invalidateQueries(['article', postId]);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['userInfo', returnData.author]);
      queryClient.invalidateQueries(['userArticles']);
      queryClient.invalidateQueries(['likedArticles']);
      queryClient.invalidateQueries(['newestArticles']);
      queryClient.invalidateQueries(['followingArticles']);
      showToast('댓글이 삭제되었습니다', 'success');
    },
  });

  const deleteMyComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  return { data, isLoading, addComment, deletePostArticle, deleteMyComment };
};
