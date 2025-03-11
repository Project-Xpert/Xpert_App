import {axios} from './util/axios';

const BASE_PATH = '/user';

interface LoginRequestDto {
  userId: String;
  password: String;
}

const Login = async (dto: LoginRequestDto) => {
  return await axios.post(`${BASE_PATH}/login`, dto);
};

interface CheckAttributeIsUniqueRequestDto {
  userId: String;
  email: String;
}

const CheckAttributeIsUnique = async (dto: CheckAttributeIsUniqueRequestDto) => {
  return await axios.post(`${BASE_PATH}/attribute`, dto);
};

export const UserAPI = {Login, CheckAttributeIsUnique};
