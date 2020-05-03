/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

// Actions
const SIGNIN_REQUEST = 'saints-xctf-web/auth/SIGNIN_REQUEST';
const SIGNIN_FAILURE = 'saints-xctf-web/auth/SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'saints-xctf-web/auth/SIGNIN_SUCCESS';

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
    default:
      return state;
  }
}

// Action Creators
export function signIn(username) {
  return {
    type: SIGNIN,
    username
  }
}
