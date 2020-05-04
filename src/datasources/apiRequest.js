import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/',
  timeout: 1000
});
