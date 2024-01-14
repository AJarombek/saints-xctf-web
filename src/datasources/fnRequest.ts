/**
 * Reusable axios instance for making API requests to fn.saintsxctf.com.
 * @author Andrew Jarombek
 * @since 12/22/2020
 */

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const fn = axios.create({
  baseURL: '/fn/',
  timeout: 15000,
  responseType: 'json',
});

fn.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token = localStorage.getItem('token') ?? '';

    req.headers = {
      authorization: token,
    };

    return req;
  },
  (error: AxiosError) => error,
);
