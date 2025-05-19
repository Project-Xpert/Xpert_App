import {axios} from './util/axios';

const BASE_URL = '/account';

const getAccountInfoList = async () => {
  return await axios.get(`${BASE_URL}/info`);
};

export const DepositAPI = {
  getAccountInfoList,
};
