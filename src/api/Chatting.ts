import { Conversation, Message } from '@/type';
import { axiosClient } from './axiosClient';

export const fetchMessageList = async () => {
  const FETCH_MESSAGE_LIST_URL = '/messages/conversations';
  const { data } = await axiosClient.get<Conversation[]>(FETCH_MESSAGE_LIST_URL);
  return data;
};

export const fetchMessages = async (userId: string) => {
  const FETCH_MESSAGES_URL = '/messages';
  const { data } = await axiosClient.get<Message[]>(FETCH_MESSAGES_URL, {
    data: { userId },
  });

  return data;
};

export const createMessage = async ({
  message,
  receiver,
}: {
  message: string;
  receiver: string;
}) => {
  const CREATE_MESSAGE_URL = '/messages/create';
  const { data } = await axiosClient.post<Message>(CREATE_MESSAGE_URL, {
    message,
    receiver,
  });
  return data;
};

export const readMessage = async (sender: string) => {
  const READ_MESSAGE_URL = '/messages/update-seen';
  return await axiosClient.put(READ_MESSAGE_URL, { sender });
};
