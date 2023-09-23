import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchMessageList,
  fetchMessages,
  createMessage as createChatting,
  readMessage as readChatting,
} from '@/api/common/Chatting';

const useChattingQuery = ({
  userId,
  talkingUserId,
}: {
  userId: string;
  talkingUserId?: string;
}) => {
  const chattingListQuery = useQuery(['chattingList', userId || ''], fetchMessageList, {
    enabled: !!userId,
  });

  const chattingQuery = useQuery(
    ['chattings', userId || '', talkingUserId || ''],
    () => {
      fetchMessages(talkingUserId || '');
    },
    {
      enabled: !!userId && !!talkingUserId,
    },
  );

  const createMessage = useMutation(createChatting);

  const readMessage = useMutation(readChatting);

  return {
    chattingListQuery,
    chattingQuery,
    createMessage,
    readMessage,
  };
};

export default useChattingQuery;
