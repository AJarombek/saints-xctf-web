/**
 * Registration redux module which follows the ducks pattern.
 * I had still hoped it was me.
 * @author Andrew Jarombek
 * @since 5/10/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import {RegistrationState} from '../types';
import {Dispatch} from "redux";

// Actions
const REGISTER_PERSONAL_INFO_REQUEST = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_REQUEST';
const REGISTER_PERSONAL_INFO_FAILURE = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_FAILURE';
const REGISTER_PERSONAL_INFO_SUCCESS = 'saints-xctf-web/registration/REGISTER_PERSONAL_INFO_SUCCESS';
const REGISTER_CREDENTIALS_REQUEST = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_REQUEST';
const REGISTER_CREDENTIALS_FAILURE = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_FAILURE';
const REGISTER_CREDENTIALS_SUCCESS = 'saints-xctf-web/registration/REGISTER_CREDENTIALS_SUCCESS';
const REGISTER_BACK = 'saints-xctf-web/registration/REGISTER_BACK';

// Action Types

interface RegisterPersonalInfoRequestAction {
  type: typeof REGISTER_PERSONAL_INFO_REQUEST;
}

interface RegisterPersonalInfoSuccessAction {
  type: typeof REGISTER_PERSONAL_INFO_SUCCESS;
  email: string;
  first: string;
  last: string;
}

interface RegisterPersonalInfoFailureAction {
  type: typeof REGISTER_PERSONAL_INFO_FAILURE;
  status: string;
  serverError: string;
}

interface RegisterCredentialsRequestAction {
  type: typeof REGISTER_CREDENTIALS_REQUEST;
}

interface RegisterCredentialsSuccessAction {
  type: typeof REGISTER_CREDENTIALS_SUCCESS;
  username: string;
}

interface RegisterCredentialsFailureAction {
  type: typeof REGISTER_CREDENTIALS_FAILURE;
  status: string;
  serverError: string;
}

interface RegisterBackAction {
  type: typeof REGISTER_BACK;
}

type RegistrationActionTypes = 
  RegisterPersonalInfoRequestAction |
  RegisterPersonalInfoSuccessAction |
  RegisterPersonalInfoFailureAction |
  RegisterCredentialsRequestAction |
  RegisterCredentialsSuccessAction |
  RegisterCredentialsFailureAction |
  RegisterBackAction

// Reducer
const initialState: RegistrationState = {};

function registerPersonalInfoRequestReducer(state: RegistrationState): RegistrationState {
  return {
    ...state,
    isFetching: true,
    lastUpdated: moment().unix(),
    stage: 0
  };
}

function registerPersonalInfoSuccessReducer(
  state: RegistrationState,
  action: RegisterPersonalInfoSuccessAction
): RegistrationState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    valid: true,
    status: null,
    serverError: null,
    stage: 1,
    first: action.first,
    last: action.last,
    email: action.email
  };
}

function registerPersonalInfoFailureReducer(
  state: RegistrationState,
  action: RegisterPersonalInfoFailureAction
): RegistrationState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    valid: false,
    status: action.status,
    serverError: action.serverError,
    stage: 0
  };
}

function registerCredentialsRequestReducer(state: RegistrationState): RegistrationState {
  return {
    ...state,
    isFetching: true,
    lastUpdated: moment().unix(),
    stage: 1
  };
}

function registerCredentialsSuccessReducer(
  state: RegistrationState,
  action: RegisterCredentialsSuccessAction
): RegistrationState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    valid: true,
    status: null,
    serverError: null,
    stage: 2,
    username: action.username
  };
}

function registerCredentialsFailureReducer(
  state: RegistrationState,
  action: RegisterCredentialsFailureAction
): RegistrationState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    valid: false,
    status: action.status,
    serverError: action.serverError,
    stage: 1
  };
}

function registerBackReducer(state: RegistrationState): RegistrationState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    stage: 0
  };
}

export default function reducer(state = initialState, action: RegistrationActionTypes): RegistrationState {
  switch (action.type) {
  case REGISTER_PERSONAL_INFO_REQUEST:
    return registerPersonalInfoRequestReducer(state);
  case REGISTER_PERSONAL_INFO_SUCCESS:
    return registerPersonalInfoSuccessReducer(state, action);
  case REGISTER_PERSONAL_INFO_FAILURE:
    return registerPersonalInfoFailureReducer(state, action);
  case REGISTER_CREDENTIALS_REQUEST:
    return registerCredentialsRequestReducer(state);
  case REGISTER_CREDENTIALS_SUCCESS:
    return registerCredentialsSuccessReducer(state, action);
  case REGISTER_CREDENTIALS_FAILURE:
    return registerCredentialsFailureReducer(state, action);
  case REGISTER_BACK:
    return registerBackReducer(state);
  default:
    return state;
  }
}

// Action Creators
export function registerPersonalInfoRequest(): RegisterPersonalInfoRequestAction {
  return {
    type: REGISTER_PERSONAL_INFO_REQUEST
  };
}

export function registerPersonalInfoSuccess(
  email: string,
  first: string,
  last: string
): RegisterPersonalInfoSuccessAction {
  return {
    type: REGISTER_PERSONAL_INFO_SUCCESS,
    email,
    first,
    last
  };
}

export function registerPersonalInfoFailure(status: string, serverError: string): RegisterPersonalInfoFailureAction {
  return {
    type: REGISTER_PERSONAL_INFO_FAILURE,
    status,
    serverError
  };
}

export function registerCredentialsRequest(): RegisterCredentialsRequestAction {
  return {
    type: REGISTER_CREDENTIALS_REQUEST
  };
}

export function registerCredentialsSuccess(username: string): RegisterCredentialsSuccessAction {
  return {
    type: REGISTER_CREDENTIALS_SUCCESS,
    username
  };
}

export function registerCredentialsFailure(status: string, serverError: string): RegisterCredentialsFailureAction {
  return {
    type: REGISTER_CREDENTIALS_FAILURE,
    status,
    serverError
  };
}

export function registerBack(): RegisterBackAction {
  return {
    type: REGISTER_BACK
  };
}

/**
 * Perform Stage #1 of user registration.  This stage checks if the email a user selects already
 * belongs to a user.  If so, an error is provided.  Otherwise, the email, first name, and last
 * name are stored in redux state.
 * @param first First name of the new user.
 * @param last Last name of the new user.
 * @param email Email address associated with the new user.
 * @return {function(...[*]=)} Function which dispatches action creators.
 */
export function registerPersonalInfo(first: string, last: string, email: string) {
  return async function(dispatch: Dispatch): Promise<void> {
    dispatch(registerPersonalInfoRequest());

    try {
      await api.get(`users/${email}`);

      // If a user already exists with this email, registration should fail.
      dispatch(registerPersonalInfoFailure('USER ALREADY EXISTS', null));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status === 400) {
        // If a user does not exist with this email, registration should continue to the next stage.
        dispatch(registerPersonalInfoSuccess(email, last, first));
      } else {
        // If another error occurs, something unexpected happened on the server (no user error).
        dispatch(registerPersonalInfoFailure('INTERNAL ERROR', serverError));
      }
    }
  }
}

/**
 * Validate the username given during new user registration.  Ensure that it isn't already in use.
 * @param dispatch Function which dispatches action creators.
 * @param username Username which uniquely identifies the new user.
 * @return {Promise<boolean>} true if the username is valid, false otherwise.
 */
async function validateUsername(dispatch: Dispatch, username: string): Promise<boolean> {
  try {
    await api.get(`users/${username}`);
    dispatch(registerCredentialsFailure('USERNAME ALREADY IN USE', null));
  } catch (error) {
    const { response } = error;
    const serverError = response?.data?.error ?? 'An unexpected error occurred.';

    if (response.status !== 400) {
      dispatch(registerCredentialsFailure('INTERNAL ERROR', serverError));
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Perform Stage #2 of user registration.  Check that the username isn't already in user.  If the
 * username is available, attempt to create the new user.
 * @param first First name of the new user.
 * @param last Last name of the new user.
 * @param email Email address associated with the new user.
 * @param username Username which uniquely identifies the new user.
 * @param password Password for the new user.
 * @param activationCode Activation code for the new user.
 * @return {function(...[*]=)} Function which dispatches action creators.
 */
export function registerCredentials(
  first: string,
  last: string,
  email: string,
  username: string,
  password: string,
  activationCode: string
) {
  return async function(dispatch: Dispatch): Promise<void> {
    dispatch(registerCredentialsRequest());

    const usernameValid = await validateUsername(dispatch, username);

    if (usernameValid) {
      try {
        await api.post('users/', {
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
        const serverError = response?.data?.error ?? 'An unexpected error occurred.';

        if (response.status === 400) {
          dispatch(registerCredentialsFailure('VALIDATION ERROR', serverError));
        } else {
          dispatch(registerCredentialsFailure('INTERNAL ERROR', serverError));
        }
      }
    }
  }
}
