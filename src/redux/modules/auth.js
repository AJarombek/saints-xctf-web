/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

// Actions
const SIGNIN = 'saints-xctf-web/auth/SIGNIN';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNIN:
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
