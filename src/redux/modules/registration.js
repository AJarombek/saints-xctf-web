/**
 * Registration redux module which follows the ducks pattern.
 * I had still hoped it was me.
 * @author Andrew Jarombek
 * @since 5/10/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';

// Actions
const REGISTER_PERSONAL_INFO_REQUEST = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_REQUEST';
const REGISTER_PERSONAL_INFO_FAILURE = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_FAILURE';
const REGISTER_PERSONAL_INFO_SUCCESS = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_SUCCESS';
const REGISTER_CREDENTIALS_REQUEST = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_REQUEST';
const REGISTER_CREDENTIALS_FAILURE = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_FAILURE';
const REGISTER_CREDENTIALS_SUCCESS = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_SUCCESS';
const REGISTER_TEAMS_REQUEST = 'saints-xctf-web/registration/REGISTER_TEAMS_REQUEST';
const REGISTER_TEAMS_FAILURE = 'saints-xctf-web/registration/REGISTER_TEAMS_FAILURE';
const REGISTER_TEAMS_SUCCESS = 'saints-xctf-web/registration/REGISTER_TEAMS_SUCCESS';
const REGISTER_GROUPS_REQUEST = 'saints-xctf-web/registration/REGISTER_GROUPS_REQUEST';
const REGISTER_GROUPS_FAILURE = 'saints-xctf-web/registration/REGISTER_GROUPS_FAILURE';
const REGISTER_GROUPS_SUCCESS = 'saints-xctf-web/registration/REGISTER_GROUPS_SUCCESS';
const REGISTER_BACK = 'saints-xctf-web/registration/REGISTER_BACK';

// Reducer
const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        lastUpdated: moment().unix(),
        stage: 0
      };
    case REGISTER_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        lastUpdated: moment().unix(),
        valid: false,
        status: action.status,
        stage: 0
      };
    case REGISTER_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: moment().unix(),
        valid: true,
        status: null,
        stage: 1,
        first: action.first,
        last: action.last,
        email: action.email
      };
    case REGISTER_CREDENTIALS_REQUEST:
      return {
        ...state,
        isFetching: true,
        lastUpdated: moment().unix(),
        stage: 1
      };
    case REGISTER_CREDENTIALS_FAILURE:
      return {
        ...state,
        isFetching: false,
        lastUpdated: moment().unix(),
        valid: false,
        status: action.status,
        stage: 1
      };
    case REGISTER_CREDENTIALS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: moment().unix(),
        valid: true,
        status: null,
        stage: 2,
        username: action.username
      };
    case REGISTER_TEAMS_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_TEAMS_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_TEAMS_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_REQUEST:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_FAILURE:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_GROUPS_SUCCESS:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    case REGISTER_BACK:
      return {
        ...state,
        register: {
          lastUpdated: moment().unix()
        }
      };
    default:
      return state;
  }
}

// Action Creators
export function registerPersonalInfoRequest() {
  return {
    type: REGISTER_PERSONAL_INFO_REQUEST
  };
}

export function registerPersonalInfoSuccess(email, first, last) {
  return {
    type: REGISTER_PERSONAL_INFO_SUCCESS,
    email,
    first,
    last
  };
}

export function registerPersonalInfoFailure(status) {
  return {
    type: REGISTER_PERSONAL_INFO_FAILURE,
    status
  };
}

export function registerCredentialsRequest() {
  return {
    type: REGISTER_CREDENTIALS_REQUEST
  };
}

export function registerCredentialsSuccess(username) {
  return {
    type: REGISTER_CREDENTIALS_SUCCESS,
    username
  };
}

export function registerCredentialsFailure(status) {
  return {
    type: REGISTER_CREDENTIALS_FAILURE,
    status
  };
}

export function registerPersonalInfo(first, last, email) {
  return async function(dispatch) {
    dispatch(registerPersonalInfoRequest());

    try {
      await api.get(`v2/users/${email}`);

      // If a user already exists with this email, registration should fail.
      dispatch(registerPersonalInfoFailure("USER ALREADY EXISTS"));
    } catch (error) {
      const { response } = error;
      if (response.status === 400) {
        // If a user does not exist with this email, registration should continue to the next stage.
        dispatch(registerPersonalInfoSuccess(email, last, first));
      } else {
        // If another error occurs, something unexpected happened on the server (no user error).
        dispatch(registerPersonalInfoFailure("INTERNAL ERROR"));
      }
    }
  }
}

export function registerCredentials(first, last, email, username, password, activationCode) {
  return async function(dispatch) {
    dispatch(registerCredentialsRequest());

    const usernameValid = validateUsername(dispatch, username);

    if (usernameValid) {
      try {
        await api.post(`v2/users`, {
          username,
          password,
          first,
          last,
          email,
          activation_code: activationCode
        });

        dispatch(registerCredentialsSuccess(username));
      } catch (error) {
        const { response } = error;
        console.info(response);
        if (response.error === "the activation code does not exist") {
          dispatch(registerCredentialsFailure("ACTIVATION CODE INVALID"));
        } else {
          dispatch(registerCredentialsFailure("INTERNAL ERROR"));
        }
      }
    }
  }
}

async function validateUsername(dispatch, username) {
  try {
    await api.get(`v2/users/${username}`);
    dispatch(registerCredentialsFailure("USERNAME ALREADY IN USE"));
  } catch (error) {
    const { response } = error;
    if (response.status === 400) {
      return true;
    } else {
      dispatch(registerCredentialsFailure("INTERNAL ERROR"));
    }
  }

  return false;
}
