import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/fx';

const getFxDataList = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/price`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const FxAPI = {
  getFxDataList,
};
