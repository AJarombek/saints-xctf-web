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
const REGISTER_PERSONAL_INFO_REQUEST = 'saints-xctf-web/auth/REGISTER_PERSONAL_INFO_REQUEST';
const REGISTER_PERSONAL_INFO_FAILURE = 'saints-xctf-web/auth/REGISTER_PERSONAL_INFO_FAILURE';
const REGISTER_PERSONAL_INFO_SUCCESS = 'saints-xctf-web/auth/REGISTER_PERSONAL_INFO_SUCCESS';
const REGISTER_CREDENTIALS_REQUEST = 'saints-xctf-web/auth/REGISTER_CREDENTIALS_REQUEST';
const REGISTER_CREDENTIALS_FAILURE = 'saints-xctf-web/auth/REGISTER_CREDENTIALS_FAILURE';
const REGISTER_CREDENTIALS_SUCCESS = 'saints-xctf-web/auth/REGISTER_CREDENTIALS_SUCCESS';
const REGISTER_TEAMS_REQUEST = 'saints-xctf-web/auth/REGISTER_TEAMS_REQUEST';
const REGISTER_TEAMS_FAILURE = 'saints-xctf-web/auth/REGISTER_TEAMS_FAILURE';
const REGISTER_TEAMS_SUCCESS = 'saints-xctf-web/auth/REGISTER_TEAMS_SUCCESS';
const REGISTER_GROUPS_REQUEST = 'saints-xctf-web/auth/REGISTER_GROUPS_REQUEST';
const REGISTER_GROUPS_FAILURE = 'saints-xctf-web/auth/REGISTER_GROUPS_FAILURE';
const REGISTER_GROUPS_SUCCESS = 'saints-xctf-web/auth/REGISTER_GROUPS_SUCCESS';
const REGISTER_BACK = 'saints-xctf-web/auth/REGISTER_BACK';

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
    case REGISTER_PERSONAL_INFO_REQUEST:
    case REGISTER_PERSONAL_INFO_FAILURE:
    case REGISTER_PERSONAL_INFO_SUCCESS:
    case REGISTER_CREDENTIALS_REQUEST:
    case REGISTER_CREDENTIALS_FAILURE:
    case REGISTER_CREDENTIALS_SUCCESS:
    case REGISTER_TEAMS_REQUEST:
    case REGISTER_TEAMS_FAILURE:
    case REGISTER_TEAMS_SUCCESS:
    case REGISTER_GROUPS_REQUEST:
    case REGISTER_GROUPS_FAILURE:
    case REGISTER_GROUPS_SUCCESS:
    case REGISTER_BACK:
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

export function signIn(username, password) {
  return async function (dispatch) {
    dispatch(signInRequest(username, "PENDING"));

    try {
      const response = await api.get(`v2/users/${username}`);

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
