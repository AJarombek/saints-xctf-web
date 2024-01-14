/**
 * Reusable axios instance for making API requests to s3.amazonaws.com.
 * @author Andrew Jarombek
 * @since 8/22/2021
 */

import axios from 'axios';

export const s3 = axios.create({
  baseURL: '/s3/',
  timeout: 15000,
});
