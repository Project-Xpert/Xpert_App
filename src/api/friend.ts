import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/friend';

const searchNonFriendUsers = async (keyword: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/new?keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getRequesters = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/request`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addFriend = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(
    `${BASE_URL}/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

const deleteFriend = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.delete(`${BASE_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const acceptFriendRequest = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.patch(
    `${BASE_URL}/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const FriendAPI = {
  searchNonFriendUsers,
  getRequesters,
  addFriend,
  deleteFriend,
  acceptFriendRequest,
};
