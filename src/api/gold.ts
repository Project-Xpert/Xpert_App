import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/gold';

const getGoldPriceData = async () => {
  return await axios.get(`${BASE_URL}/price`);
};

const getGoldOwnData = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/own`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

interface buyGoldRequestDto {
  goldType: string;
  price: number;
  cnt: number;
}

const buyGold = async (dto: buyGoldRequestDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.put(`${BASE_URL}/buy`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const GoldAPI = {
  getGoldPriceData,
  getGoldOwnData,
  buyGold,
};
