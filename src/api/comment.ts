import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/comment';

interface createCommentDto {
  content: string;
}

const createComment = async (postId: string, dto: createCommentDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(`${BASE_URL}/${postId}`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const CommentAPI = {
  createComment,
};
