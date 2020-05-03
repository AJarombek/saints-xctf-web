/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

// Actions
const SIGNIN = 'saints-xctf-web/auth/SIGNIN';
const SIGNIN_SUCCESSFUL = 'saints-xctf-web/auth/SIGNIN_SUCCESSFUL';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNIN:
      return state;
    case SIGNIN_SUCCESSFUL:
      return { ...state, auth: { signedIn: true } };
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
