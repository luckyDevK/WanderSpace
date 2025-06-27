import axios from 'axios';

const baseURL = 'http://localhost:4000';

export default axios.create({
  baseURL,
});

export const apiPrivate = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
