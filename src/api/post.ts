import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/post';

const getPostList = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getPostDetail = async (postId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/detail/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const createPost = async (formData: FormData) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(`${BASE_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const togglePostLike = async (postId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.patch(
    `${BASE_URL}/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const PostAPI = {
  getPostList,
  getPostDetail,
  createPost,
  togglePostLike,
};
