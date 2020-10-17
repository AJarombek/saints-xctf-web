/**
 * Reusable axios instance for making API requests to api.saintsxctf.com.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import { Store } from "redux";
import {SIGNOUT} from "../redux/modules/auth";

export const api = axios.create({
  baseURL: '/api/v2/',
  timeout: 1000,
  responseType: 'json'
});

export const interceptor = (store: Store) => {
  api.interceptors.request.use(
    (req: AxiosRequestConfig) => {
      const token = localStorage.getItem('token') ?? '';

      req.headers = {
        Authorization: `Bearer ${token}`
      };

      return req;
    },
    (error: AxiosError) => error
  );

  api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError) => {
      if (error.response.status === 403) {
        store.dispatch({
          type: SIGNOUT
        });
      } else {
        return error;
      }
    }
  );
};
