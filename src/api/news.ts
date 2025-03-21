import {axios} from './util/axios';

const BASE_URL = '/news';

const getNewsList = async () => {
  return await axios.get(`${BASE_URL}/list`);
};

const getNewsDetail = async (link: string) => {
  return await axios.get(`${BASE_URL}/detail?link=${link}`);
};

export const NewsAPI = {
  getNewsList,
  getNewsDetail,
};
