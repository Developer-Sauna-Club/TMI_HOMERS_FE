import axios from 'axios';
import { getItemFromStorage } from '@/utils/localStorage';

const REQUEST_TIME = 3000;

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: REQUEST_TIME,
});

const getAuthHeader = () => `bearer ${getItemFromStorage('token')}`;

axiosClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = getAuthHeader();
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
