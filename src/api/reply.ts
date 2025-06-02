import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/reply';

interface createCommentDto {
  content: string;
}

const createReply = async (postId: string, dto: createCommentDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(`${BASE_URL}/${postId}`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const toggleReplyLike = async (replyId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.patch(
    `${BASE_URL}/like/${replyId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const ReplyAPI = {
  createReply,
  toggleReplyLike,
};
