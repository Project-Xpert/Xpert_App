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

const getFxDetail = async (
  fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP',
) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/detail/${fxType}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getFxTradeData = async (
  fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP',
) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/trade/${fxType}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

interface buyFxDto {
  type: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP';
  amount: number;
}

const buyFx = async (dto: buyFxDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(`${BASE_URL}`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const FxAPI = {
  getFxDataList,
  getFxDetail,
  getFxTradeData,
  buyFx,
};
