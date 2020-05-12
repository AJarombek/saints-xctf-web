/**
 * Reusable axios instance for making API requests.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/',
  timeout: 1000
});
