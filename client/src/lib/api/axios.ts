import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASEURL;

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
