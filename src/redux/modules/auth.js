/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { api } from '../../datasources/apiRequest';

// Actions
const SIGNIN_REQUEST = 'saints-xctf-web/auth/SIGNIN_REQUEST';
const SIGNIN_FAILURE = 'saints-xctf-web/auth/SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'saints-xctf-web/auth/SIGNIN_SUCCESS';
const INVALIDATE_USER = 'saints-xctf-web/auth/INVALIDATE_USER';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return state;
    case SIGNIN_SUCCESS:
      return { ...state, auth: { signedIn: true } };
    case SIGNIN_FAILURE:
      return state;
    case INVALIDATE_USER:
      return {
        ...state,
        user: {
          [action.username]: {
            didInvalidate: true
          }
        }
      };
    default:
      return state;
  }
}

// Action Creators
export function signInRequest(username) {
  return {
    type: SIGNIN_REQUEST,
    username
  }
}

export function signIn(username, password) {
  return async function (dispatch) {
    dispatch(signInRequest(username));

    const response = await api.get(`v2/users/${username}`);
    console.info(response);
  }
}
