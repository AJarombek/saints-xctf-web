/**
 * Reusable axios instance for making API requests to fn.saintsxctf.com.
 * @author Andrew Jarombek
 * @since 12/22/2020
 */

import axios from 'axios';

export const fn = axios.create({
  baseURL: '/fn/',
  timeout: 15000,
  responseType: 'json'
});
