import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from './util/axios';

const BASE_URL = '/account';

const getAccountList = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getAccountInfoList = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

interface CreateAccountDto {
  productName: string;
  companyName: string;
  money: number;
  accountType: 'FIXED_SAVINGS' | 'FREE_SAVINGS' | 'DEPOSIT';
  interestType: 'SIMPLE' | 'COMPOUND';
  rate: number;
  autoTransfer: boolean;
  expirePeriod: number;
}

const createAccount = async (dto: CreateAccountDto) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.post(`${BASE_URL}`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getAccountDetail = async (accountId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.get(`${BASE_URL}/${accountId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteAccount = async (accountId: string) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.delete(`${BASE_URL}/${accountId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

interface updateAutoTransferSettingDto {
  autoTransfer: boolean;
  autoTransferAmount: number;
}

const updateAutoTransferSetting = async (
  accountId: string,
  body: updateAutoTransferSettingDto,
) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return await axios.patch(`${BASE_URL}/auto-transfer/${accountId}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const AccountAPI = {
  getAccountInfoList,
  getAccountList,
  createAccount,
  getAccountDetail,
  deleteAccount,
  updateAutoTransferSetting,
};
