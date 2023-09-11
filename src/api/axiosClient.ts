import axios from 'axios';

const REQUEST_TIME = 3000;

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: REQUEST_TIME,
});
