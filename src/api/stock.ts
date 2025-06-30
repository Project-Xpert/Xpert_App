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

const getOwnStocks = async (keyword: String, sort: Sort) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/owned?keyword=${keyword}&sort=${sort}`, {
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

interface BuyStockRequestDto {
  option: 'MANUAL_PRICE' | 'MARKET_PRICE';
  stockCode: string;
  amount: number;
  price: number;
}

const buyStock = async (request: BuyStockRequestDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.put(`${BASE_URL}/buy`, request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

interface SellStockRequestDto {
  option: 'MANUAL_PRICE' | 'MARKET_PRICE';
  stockCode: string;
  amount: number;
  price: number;
}

const sellStock = async (request: SellStockRequestDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.put(`${BASE_URL}/sell`, request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getStockHolding = async (stockCode: String) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/holding/${stockCode}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const StockAPI = {
  getStockData,
  getStockDetail,
  buyStock,
  sellStock,
  getStockHolding,
  getOwnStocks,
};
