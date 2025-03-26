import {axios} from './util/axios';

const BASE_URL = '/gold';

const getGoldPriceData = async () => {
  return await axios.get(`${BASE_URL}/price`);
};

export const GoldAPI = {
  getGoldPriceData,
};
