/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { api } from '../../datasources/apiRequest';
import bcrypt from 'bcryptjs';
import moment from 'moment';

// Actions
const SIGNIN_REQUEST = 'saints-xctf-web/auth/SIGNIN_REQUEST';
const SIGNIN_FAILURE = 'saints-xctf-web/auth/SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'saints-xctf-web/auth/SIGNIN_SUCCESS';
const FORGOT_PASSWORD_EMAIL_REQUEST = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_REQUEST';
const FORGOT_PASSWORD_EMAIL_FAILURE = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_FAILURE';
const FORGOT_PASSWORD_EMAIL_SUCCESS = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_SUCCESS';
const CHANGE_EMAIL_REQUEST = 'saints-xctf-web/auth/CHANGE_EMAIL_REQUEST';
const CHANGE_EMAIL_FAILURE = 'saints-xctf-web/auth/CHANGE_EMAIL_FAILURE';
const CHANGE_EMAIL_SUCCESS = 'saints-xctf-web/auth/CHANGE_EMAIL_SUCCESS';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        auth: {
          isFetching: true,
          lastUpdated: moment().unix(),
          signedIn: false,
          status: action.status
        },
        user: {
          [action.username]: {
            isFetching: true,
            lastUpdated: moment().unix()
          }
        }
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          lastUpdated: moment().unix(),
          signedIn: true,
          status: action.status
        },
        user: {
          [action.username]: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: moment().unix(),
            ...action.user
          }
        }
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        auth: {
          isFetching: false,
          lastUpdated: moment().unix(),
          signedIn: false,
          status: action.status
        },
        user: {}
      };
    case FORGOT_PASSWORD_EMAIL_REQUEST:
      return {
        ...state
      };
    case FORGOT_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state
      };
    case FORGOT_PASSWORD_EMAIL_FAILURE:
      return {
        ...state
      };
    case CHANGE_EMAIL_REQUEST:
      return {
        ...state
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state
      };
    case CHANGE_EMAIL_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}

// Action Creators
export function signInRequest(username, status) {
  return {
    type: SIGNIN_REQUEST,
    username,
    status
  }
}

export function signInSuccess(username, user, status) {
  return {
    type: SIGNIN_SUCCESS,
    username,
    user,
    status
  }
}

export function signInFailure(status) {
  return {
    type: SIGNIN_FAILURE,
    status
  }
}

export function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_EMAIL_REQUEST
  }
}

export function forgotPasswordSuccess(status) {
  return {
    type: FORGOT_PASSWORD_EMAIL_SUCCESS,
    status
  }
}

export function forgotPasswordFailure(status, serverError) {
  return {
    type: FORGOT_PASSWORD_EMAIL_SUCCESS,
    status,
    serverError
  }
}

export function signIn(username, password) {
  return async function (dispatch) {
    dispatch(signInRequest(username, "PENDING"));

    try {
      const response = await api.get(`users/${username}`);

      const { user } = response.data;
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        dispatch(signInSuccess(username, user, "SUCCESS"));
      } else {
        dispatch(signInFailure("INVALID PASSWORD"));
      }
    } catch (error) {
      const { response } = error;
      if (response.status === 400) {
        dispatch(signInFailure("INVALID USER"));
      } else {
        dispatch(signInFailure("INTERNAL ERROR"));
      }
    }
  }
}

export function forgotPasswordEmail(email) {
  return async function (dispatch) {
    dispatch(forgotPasswordRequest());

    try {
      await api.post(`forgot_password/${email}`);
      dispatch(forgotPasswordSuccess("SUCCESS"));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status === 400) {
        dispatch(forgotPasswordFailure("INVALID USERNAME/EMAIL", serverError));
      } else {
        dispatch(forgotPasswordFailure("INTERNAL ERROR", serverError));
      }
    }
  }
}
