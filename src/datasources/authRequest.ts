/**
 * Reusable axios instance for making API requests to auth.saintsxctf.com.
 * @author Andrew Jarombek
 * @since 10/17/2020
 */

import axios from 'axios';

export const auth = axios.create({
    baseURL: '/auth/',
    timeout: 1000,
    responseType: 'json'
});