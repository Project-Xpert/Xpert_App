import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/stock';

type Sort =
  | 'PRICE_DESC'
  | 'PRICE_ASC'
  | 'RATE_DESC'
  | 'RATE_ASC'
  | 'RATE_ABS_DESC';

const getStockData = async (keyword: String, sort: Sort) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/search?keyword=${keyword}&sort=${sort}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getStockDetail = async (stockCode: String) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/detail/${stockCode}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const StockAPI = {
  getStockData,
  getStockDetail,
};
