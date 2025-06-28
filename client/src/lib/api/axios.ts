import axios from 'axios';

const baseURL = 'http://localhost:4000';

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
