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

// export const GET = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await axiosClient.get<T>(url, config);
//   return response.data;
// };
// export const POST = async <T,D>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await axiosClient.post<T,D>(url, data);
//   return response.data;
// };
// export const DELETE = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await axiosClient.delete<T>(url, config);
//   return response.data;
// };
// export const PUT = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await axiosClient.put<T>(url, config);
//   return response.data;
// };
