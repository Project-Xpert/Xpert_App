import {axios} from './util/axios';

const BASE_PATH = '/user';

interface LoginRequestDto {
  userId: String;
  password: String;
}

const Login = async (dto: LoginRequestDto) => {
  return await axios.post(`${BASE_PATH}/login`, dto);
};

const Signup = async (formdata: FormData) => {
  console.log(formdata);
  return await axios.post(`${BASE_PATH}/signup`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

interface CheckAttributeIsUniqueRequestDto {
  userId: String;
  email: String;
}

const CheckAttributeIsUnique = async (
  dto: CheckAttributeIsUniqueRequestDto,
) => {
  return await axios.post(`${BASE_PATH}/attribute`, dto);
};

interface SendCodeRequestDto {
  mail: String;
}

const SendCode = async (dto: SendCodeRequestDto) => {
  return await axios.post(`${BASE_PATH}/mail/code`, dto);
};

interface VerifyCodeRequestDto {
  mail: String;
  code: String;
}

const VerifyCode = async (dto: VerifyCodeRequestDto) => {
  return await axios.post(`${BASE_PATH}/verify/code`, dto);
};

export const UserAPI = {
  Login,
  Signup,
  SendCode,
  VerifyCode,
  CheckAttributeIsUnique,
};
