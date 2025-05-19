import {axios} from './util/axios';

const BASE_URL = '/deposit';

const getDepositInfoList = async () => {
  return await axios.get(`${BASE_URL}/info`);
};

export const DepositAPI = {
  getDepositInfoList,
};
