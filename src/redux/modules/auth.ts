/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { api } from '../../datasources/apiRequest';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import { AuthState, User } from '../types';
import { Dispatch } from 'redux';
import { auth } from '../../datasources/authRequest';
import { fn } from '../../datasources/fnRequest';
import { AppThunk } from '../store';

// Actions
const SIGNIN_REQUEST = 'saints-xctf-web/auth/SIGNIN_REQUEST';
const SIGNIN_FAILURE = 'saints-xctf-web/auth/SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'saints-xctf-web/auth/SIGNIN_SUCCESS';
export const SIGNOUT = 'saints-xctf-web/auth/SIGNOUT';
const GET_FORGOT_PASSWORD_CODE_VALIDATION_REQUEST = 'saints-xctf-web/auth/GET_FORGOT_PASSWORD_CODE_VALIDATION_REQUEST';
const GET_FORGOT_PASSWORD_CODE_VALIDATION_FAILURE = 'saints-xctf-web/auth/GET_FORGOT_PASSWORD_CODE_VALIDATION_FAILURE';
const GET_FORGOT_PASSWORD_CODE_VALIDATION_SUCCESS = 'saints-xctf-web/auth/GET_FORGOT_PASSWORD_CODE_VALIDATION_SUCCESS';
const POST_FORGOT_PASSWORD_REQUEST = 'saints-xctf-web/auth/POST_FORGOT_PASSWORD_REQUEST';
const POST_FORGOT_PASSWORD_FAILURE = 'saints-xctf-web/auth/POST_FORGOT_PASSWORD_FAILURE';
const POST_FORGOT_PASSWORD_SUCCESS = 'saints-xctf-web/auth/POST_FORGOT_PASSWORD_SUCCESS';
const SET_USER_FROM_STORAGE = 'saints-xctf-web/auth/SET_USER_FROM_STORAGE';
const POST_ACTIVATION_CODE_REQUEST = 'saints-xctf-web/auth/POST_ACTIVATION_CODE_REQUEST';
const POST_ACTIVATION_CODE_FAILURE = 'saints-xctf-web/auth/POST_ACTIVATION_CODE_FAILURE';
const POST_ACTIVATION_CODE_SUCCESS = 'saints-xctf-web/auth/POST_ACTIVATION_CODE_SUCCESS';
const ACTIVATION_CODE_EMAIL_REQUEST = 'saints-xctf-web/auth/ACTIVATION_CODE_EMAIL_REQUEST';
const ACTIVATION_CODE_EMAIL_FAILURE = 'saints-xctf-web/auth/ACTIVATION_CODE_EMAIL_FAILURE';
const ACTIVATION_CODE_EMAIL_SUCCESS = 'saints-xctf-web/auth/ACTIVATION_CODE_EMAIL_SUCCESS';
const CHANGE_USER_PASSWORD_REQUEST = 'saints-xctf-web/auth/CHANGE_USER_PASSWORD_REQUEST';
const CHANGE_USER_PASSWORD_FAILURE = 'saints-xctf-web/auth/CHANGE_USER_PASSWORD_FAILURE';
const CHANGE_USER_PASSWORD_SUCCESS = 'saints-xctf-web/auth/CHANGE_USER_PASSWORD_SUCCESS';

// Action Types

interface SignInRequestAction {
  type: typeof SIGNIN_REQUEST;
  status: string;
  username: string;
}

interface SignInSuccessAction {
  type: typeof SIGNIN_SUCCESS;
  status: string;
  username: string;
  user: User;
}

interface SignInFailureAction {
  type: typeof SIGNIN_FAILURE;
  status: string;
}

export interface SignOutAction {
  type: typeof SIGNOUT;
}

interface GetForgotPasswordCodeValidationRequestAction {
  type: typeof GET_FORGOT_PASSWORD_CODE_VALIDATION_REQUEST;
  code: string;
}

interface GetForgotPasswordCodeValidationSuccessAction {
  type: typeof GET_FORGOT_PASSWORD_CODE_VALIDATION_SUCCESS;
  code: string;
  isValid: boolean;
  username: string;
}

interface GetForgotPasswordCodeValidationFailureAction {
  type: typeof GET_FORGOT_PASSWORD_CODE_VALIDATION_FAILURE;
  code: string;
  serverError: string;
}

interface PostForgotPasswordRequestAction {
  type: typeof POST_FORGOT_PASSWORD_REQUEST;
  email: string;
}

interface PostForgotPasswordSuccessAction {
  type: typeof POST_FORGOT_PASSWORD_SUCCESS;
  email: string;
}

interface PostForgotPasswordFailureAction {
  type: typeof POST_FORGOT_PASSWORD_FAILURE;
  email: string;
  serverError: string;
}

interface SetUserFromStorageAction {
  type: typeof SET_USER_FROM_STORAGE;
  user: User;
}

interface PostActivationCodeRequestAction {
  type: typeof POST_ACTIVATION_CODE_REQUEST;
  email: string;
}

interface PostActivationCodeSuccessAction {
  type: typeof POST_ACTIVATION_CODE_SUCCESS;
  email: string;
}

interface PostActivationCodeFailureAction {
  type: typeof POST_ACTIVATION_CODE_FAILURE;
  email: string;
  serverError: string;
}

interface ActivationCodeEmailRequestAction {
  type: typeof ACTIVATION_CODE_EMAIL_REQUEST;
  email: string;
  code: string;
}

interface ActivationCodeEmailSuccessAction {
  type: typeof ACTIVATION_CODE_EMAIL_SUCCESS;
  email: string;
  code: string;
}

interface ActivationCodeEmailFailureAction {
  type: typeof ACTIVATION_CODE_EMAIL_FAILURE;
  email: string;
  code: string;
  serverError: string;
}

interface ChangeUserPasswordRequestAction {
  type: typeof CHANGE_USER_PASSWORD_REQUEST;
  username: string;
}

interface ChangeUserPasswordSuccessAction {
  type: typeof CHANGE_USER_PASSWORD_SUCCESS;
  username: string;
}

interface ChangeUserPasswordFailureAction {
  type: typeof CHANGE_USER_PASSWORD_FAILURE;
  username: string;
  serverError: string;
}

type AuthActionTypes =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutAction
  | GetForgotPasswordCodeValidationRequestAction
  | GetForgotPasswordCodeValidationSuccessAction
  | GetForgotPasswordCodeValidationFailureAction
  | PostForgotPasswordRequestAction
  | PostForgotPasswordSuccessAction
  | PostForgotPasswordFailureAction
  | SetUserFromStorageAction
  | PostActivationCodeRequestAction
  | PostActivationCodeSuccessAction
  | PostActivationCodeFailureAction
  | ActivationCodeEmailRequestAction
  | ActivationCodeEmailSuccessAction
  | ActivationCodeEmailFailureAction
  | ChangeUserPasswordRequestAction
  | ChangeUserPasswordSuccessAction
  | ChangeUserPasswordFailureAction;

// Reducer
const initialState: AuthState = {
  auth: {},
  user: {},
  createActivationCode: {},
  emailActivationCode: {},
  createForgotPasswordCode: {},
  validateForgotPasswordCode: {},
  changePassword: {}
};

function signInRequestReducer(state: AuthState, action: SignInRequestAction): AuthState {
  const existingUser = state.user[action.username] ?? {};

  return {
    ...state,
    auth: {
      isFetching: true,
      lastUpdated: moment().unix(),
      signedInUser: action.username,
      status: action.status
    },
    user: {
      [action.username]: {
        ...existingUser,
        user: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function signInSuccessReducer(state: AuthState, action: SignInSuccessAction): AuthState {
  const existingUser = state.user[action.username] ?? {};

  return {
    ...state,
    auth: {
      isFetching: false,
      lastUpdated: moment().unix(),
      signedInUser: action.username,
      status: action.status
    },
    user: {
      [action.username]: {
        ...existingUser,
        user: {
          isFetching: false,
          didInvalidate: false,
          lastUpdated: moment().unix(),
          ...action.user
        }
      }
    }
  };
}

function signInFailureReducer(state: AuthState, action: SignInFailureAction): AuthState {
  return {
    ...state,
    auth: {
      isFetching: false,
      lastUpdated: moment().unix(),
      signedInUser: null,
      status: action.status
    },
    user: {}
  };
}

function getForgotPasswordCodeValidationRequestReducer(
  state: AuthState,
  action: GetForgotPasswordCodeValidationRequestAction
): AuthState {
  return {
    ...state,
    validateForgotPasswordCode: {
      ...state.validateForgotPasswordCode,
      [action.code]: {
        isFetching: true,
        lastUpdated: moment().unix()
      }
    }
  };
}

function getForgotPasswordCodeValidationSuccessReducer(
  state: AuthState,
  action: GetForgotPasswordCodeValidationSuccessAction
): AuthState {
  return {
    ...state,
    validateForgotPasswordCode: {
      ...state.validateForgotPasswordCode,
      [action.code]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        isValid: action.isValid,
        username: action.username
      }
    }
  };
}

function getForgotPasswordCodeValidationFailureReducer(
  state: AuthState,
  action: GetForgotPasswordCodeValidationFailureAction
): AuthState {
  return {
    ...state,
    validateForgotPasswordCode: {
      ...state.validateForgotPasswordCode,
      [action.code]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError,
        isValid: false
      }
    }
  };
}

function postForgotPasswordRequestReducer(state: AuthState, action: PostForgotPasswordRequestAction): AuthState {
  return {
    ...state,
    createForgotPasswordCode: {
      ...state.createForgotPasswordCode,
      [action.email]: {
        isFetching: true,
        lastUpdated: moment().unix()
      }
    }
  };
}

function postForgotPasswordSuccessReducer(state: AuthState, action: PostForgotPasswordSuccessAction): AuthState {
  return {
    ...state,
    createForgotPasswordCode: {
      ...state.createForgotPasswordCode,
      [action.email]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        created: true
      }
    }
  };
}

function postForgotPasswordFailureReducer(state: AuthState, action: PostForgotPasswordFailureAction): AuthState {
  return {
    ...state,
    createForgotPasswordCode: {
      ...state.createForgotPasswordCode,
      [action.email]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError,
        created: false
      }
    }
  };
}

function signOutReducer(): AuthState {
  return {
    auth: {
      isFetching: false,
      lastUpdated: moment().unix(),
      signedInUser: null,
      status: 'SIGNED OUT'
    },
    user: {},
    changePassword: {},
    createActivationCode: {},
    createForgotPasswordCode: {},
    emailActivationCode: {},
    validateForgotPasswordCode: {}
  };
}

function setUserFromStorageReducer(state: AuthState, action: SetUserFromStorageAction): AuthState {
  const existingUser = state.user[action.user.username] ?? {};

  return {
    ...state,
    user: {
      [action.user.username]: {
        ...existingUser,
        user: {
          ...action.user,
          isFetching: false,
          didInvalidate: false,
          lastUpdated: moment().unix()
        }
      }
    },
    auth: {
      isFetching: false,
      lastUpdated: moment().unix(),
      signedInUser: action.user.username,
      status: 'SUCCESS'
    }
  };
}

function postActivationCodeRequestReducer(state: AuthState, action: PostActivationCodeRequestAction): AuthState {
  return {
    ...state,
    createActivationCode: {
      ...state.createActivationCode,
      [action.email]: {
        isFetching: true,
        lastUpdated: moment().unix()
      }
    }
  };
}

function postActivationCodeSuccessReducer(state: AuthState, action: PostActivationCodeSuccessAction): AuthState {
  return {
    ...state,
    createActivationCode: {
      ...state.createActivationCode,
      [action.email]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        created: true
      }
    }
  };
}

function postActivationCodeFailureReducer(state: AuthState, action: PostActivationCodeFailureAction): AuthState {
  return {
    ...state,
    createActivationCode: {
      ...state.createActivationCode,
      [action.email]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError,
        created: false
      }
    }
  };
}

function emailActivationCodeRequestReducer(state: AuthState, action: ActivationCodeEmailRequestAction): AuthState {
  return {
    ...state,
    emailActivationCode: {
      ...state.emailActivationCode,
      [action.email]: {
        isFetching: true,
        code: action.code,
        lastUpdated: moment().unix()
      }
    }
  };
}

function emailActivationCodeSuccessReducer(state: AuthState, action: ActivationCodeEmailSuccessAction): AuthState {
  return {
    ...state,
    emailActivationCode: {
      ...state.emailActivationCode,
      [action.email]: {
        isFetching: false,
        code: action.code,
        lastUpdated: moment().unix(),
        emailed: true
      }
    }
  };
}

function emailActivationCodeFailureReducer(state: AuthState, action: ActivationCodeEmailFailureAction): AuthState {
  return {
    ...state,
    emailActivationCode: {
      ...state.emailActivationCode,
      [action.email]: {
        isFetching: false,
        code: action.code,
        lastUpdated: moment().unix(),
        serverError: action.serverError,
        emailed: false
      }
    }
  };
}

function changeUserPasswordRequestReducer(state: AuthState, action: ChangeUserPasswordRequestAction): AuthState {
  return {
    ...state,
    changePassword: {
      isFetching: true,
      lastUpdated: moment().unix(),
      username: action.username
    }
  };
}

function changeUserPasswordSuccessReducer(state: AuthState, action: ChangeUserPasswordSuccessAction): AuthState {
  return {
    ...state,
    changePassword: {
      isFetching: false,
      lastUpdated: moment().unix(),
      changed: true,
      username: action.username
    }
  };
}

function changeUserPasswordFailureReducer(state: AuthState, action: ChangeUserPasswordFailureAction): AuthState {
  return {
    ...state,
    changePassword: {
      isFetching: false,
      lastUpdated: moment().unix(),
      changed: false,
      username: action.username,
      serverError: action.serverError
    }
  };
}

export default function reducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return signInRequestReducer(state, action);
    case SIGNIN_SUCCESS:
      return signInSuccessReducer(state, action);
    case SIGNIN_FAILURE:
      return signInFailureReducer(state, action);
    case SIGNOUT:
      return signOutReducer();
    case GET_FORGOT_PASSWORD_CODE_VALIDATION_REQUEST:
      return getForgotPasswordCodeValidationRequestReducer(state, action);
    case GET_FORGOT_PASSWORD_CODE_VALIDATION_SUCCESS:
      return getForgotPasswordCodeValidationSuccessReducer(state, action);
    case GET_FORGOT_PASSWORD_CODE_VALIDATION_FAILURE:
      return getForgotPasswordCodeValidationFailureReducer(state, action);
    case POST_FORGOT_PASSWORD_REQUEST:
      return postForgotPasswordRequestReducer(state, action);
    case POST_FORGOT_PASSWORD_SUCCESS:
      return postForgotPasswordSuccessReducer(state, action);
    case POST_FORGOT_PASSWORD_FAILURE:
      return postForgotPasswordFailureReducer(state, action);
    case SET_USER_FROM_STORAGE:
      return setUserFromStorageReducer(state, action);
    case POST_ACTIVATION_CODE_REQUEST:
      return postActivationCodeRequestReducer(state, action);
    case POST_ACTIVATION_CODE_SUCCESS:
      return postActivationCodeSuccessReducer(state, action);
    case POST_ACTIVATION_CODE_FAILURE:
      return postActivationCodeFailureReducer(state, action);
    case ACTIVATION_CODE_EMAIL_REQUEST:
      return emailActivationCodeRequestReducer(state, action);
    case ACTIVATION_CODE_EMAIL_SUCCESS:
      return emailActivationCodeSuccessReducer(state, action);
    case ACTIVATION_CODE_EMAIL_FAILURE:
      return emailActivationCodeFailureReducer(state, action);
    case CHANGE_USER_PASSWORD_REQUEST:
      return changeUserPasswordRequestReducer(state, action);
    case CHANGE_USER_PASSWORD_SUCCESS:
      return changeUserPasswordSuccessReducer(state, action);
    case CHANGE_USER_PASSWORD_FAILURE:
      return changeUserPasswordFailureReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function signInRequest(username: string, status: string): SignInRequestAction {
  return {
    type: SIGNIN_REQUEST,
    username,
    status
  };
}

export function signInSuccess(username: string, user: User, status: string): SignInSuccessAction {
  return {
    type: SIGNIN_SUCCESS,
    username,
    user,
    status
  };
}

export function signInFailure(status: string): SignInFailureAction {
  return {
    type: SIGNIN_FAILURE,
    status
  };
}

export function signOut(): SignOutAction {
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  return {
    type: SIGNOUT
  };
}

export function getForgotPasswordCodeValidationRequest(code: string): GetForgotPasswordCodeValidationRequestAction {
  return {
    type: GET_FORGOT_PASSWORD_CODE_VALIDATION_REQUEST,
    code
  };
}

export function getForgotPasswordCodeValidationSuccess(
  code: string,
  isValid: boolean,
  username: string
): GetForgotPasswordCodeValidationSuccessAction {
  return {
    type: GET_FORGOT_PASSWORD_CODE_VALIDATION_SUCCESS,
    code,
    isValid,
    username
  };
}

export function getForgotPasswordCodeValidationFailure(
  code: string,
  serverError: string
): GetForgotPasswordCodeValidationFailureAction {
  return {
    type: GET_FORGOT_PASSWORD_CODE_VALIDATION_FAILURE,
    code,
    serverError
  };
}

export function postForgotPasswordRequest(email: string): PostForgotPasswordRequestAction {
  return {
    type: POST_FORGOT_PASSWORD_REQUEST,
    email
  };
}

export function postForgotPasswordSuccess(email: string): PostForgotPasswordSuccessAction {
  return {
    type: POST_FORGOT_PASSWORD_SUCCESS,
    email
  };
}

export function postForgotPasswordFailure(email: string, serverError: string): PostForgotPasswordFailureAction {
  return {
    type: POST_FORGOT_PASSWORD_FAILURE,
    email,
    serverError
  };
}

export function setUserFromStorage(user: User): SetUserFromStorageAction {
  return {
    type: SET_USER_FROM_STORAGE,
    user
  };
}

export function postActivationCodeRequest(email: string): PostActivationCodeRequestAction {
  return {
    type: POST_ACTIVATION_CODE_REQUEST,
    email
  };
}

export function postActivationCodeSuccess(email: string): PostActivationCodeSuccessAction {
  return {
    type: POST_ACTIVATION_CODE_SUCCESS,
    email
  };
}

export function postActivationCodeFailure(email: string, serverError: string): PostActivationCodeFailureAction {
  return {
    type: POST_ACTIVATION_CODE_FAILURE,
    email,
    serverError
  };
}

export function activationCodeEmailRequest(email: string, code: string): ActivationCodeEmailRequestAction {
  return {
    type: ACTIVATION_CODE_EMAIL_REQUEST,
    email,
    code
  };
}

export function activationCodeEmailSuccess(email: string, code: string): ActivationCodeEmailSuccessAction {
  return {
    type: ACTIVATION_CODE_EMAIL_SUCCESS,
    email,
    code
  };
}

export function activationCodeEmailFailure(
  email: string,
  code: string,
  serverError: string
): ActivationCodeEmailFailureAction {
  return {
    type: ACTIVATION_CODE_EMAIL_FAILURE,
    email,
    code,
    serverError
  };
}

export function changeUserPasswordRequest(username: string): ChangeUserPasswordRequestAction {
  return {
    type: CHANGE_USER_PASSWORD_REQUEST,
    username
  };
}

export function changeUserPasswordSuccess(username: string): ChangeUserPasswordSuccessAction {
  return {
    type: CHANGE_USER_PASSWORD_SUCCESS,
    username
  };
}

export function changeUserPasswordFailure(username: string, serverError: string): ChangeUserPasswordFailureAction {
  return {
    type: CHANGE_USER_PASSWORD_FAILURE,
    username,
    serverError
  };
}

export function signIn(username: string, password: string): AppThunk<Promise<void>, AuthState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(signInRequest(username, 'PENDING'));

    try {
      const authResponse = await auth.post('token', {
        clientId: username,
        clientSecret: password
      });

      const { result: token } = authResponse.data;

      if (!token) {
        dispatch(signInFailure('INVALID USER'));
        return;
      }

      localStorage.setItem('token', token);

      const response = await api.get(`users/${username}`);

      const { user } = response.data;
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        dispatch(signInSuccess(username, user, 'SUCCESS'));
      } else {
        dispatch(signInFailure('INVALID PASSWORD'));
      }
    } catch (error) {
      const { response } = error;
      if (response?.status === 400) {
        dispatch(signInFailure('INVALID USER'));
      } else {
        dispatch(signInFailure('INTERNAL ERROR'));
      }
    }
  };
}

export type ForgotPasswordCreationResult = {
  created?: boolean;
  error?: string;
};

export function createForgotPasswordCode(email: string): AppThunk<Promise<ForgotPasswordCreationResult>, AuthState> {
  return async function (dispatch: Dispatch): Promise<ForgotPasswordCreationResult> {
    dispatch(postForgotPasswordRequest(email));

    try {
      const response = await api.post(`forgot_password/${email}`);
      dispatch(postForgotPasswordSuccess(email));

      return {
        created: response.data.created
      };
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(postForgotPasswordFailure(email, serverError));
      return {
        error: serverError
      };
    }
  };
}

export type ValidateForgotPasswordResult = {
  isValid?: boolean;
  error?: string;
};

export function validateForgotPasswordCode(code: string): AppThunk<Promise<ValidateForgotPasswordResult>, AuthState> {
  return async function (dispatch: Dispatch): Promise<ValidateForgotPasswordResult> {
    dispatch(getForgotPasswordCodeValidationRequest(code));

    try {
      const response = await api.get(`forgot_password/validate/${code}`);
      const { is_valid: isValid, username } = response.data;

      dispatch(getForgotPasswordCodeValidationSuccess(code, isValid, username));

      return {
        isValid: true
      };
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getForgotPasswordCodeValidationFailure(code, serverError));
      return {
        error: serverError
      };
    }
  };
}

export function createActivationCode(email: string, groupId: number): AppThunk<Promise<string>, AuthState> {
  return async function (dispatch: Dispatch): Promise<string> {
    dispatch(postActivationCodeRequest(email));

    try {
      const response = await api.post('activation_code/', { email, group_id: groupId });
      const { activation_code } = response.data.activation_code;

      dispatch(postActivationCodeSuccess(email));
      return activation_code;
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(postActivationCodeFailure(email, serverError));
      return null;
    }
  };
}

export const sendActivationCodeEmail = (email: string, code: string): AppThunk<Promise<boolean>, AuthState> => async (
  dispatch: Dispatch
): Promise<boolean> => {
  dispatch(activationCodeEmailRequest(email, code));

  try {
    const response = await fn.post('email/activation-code', { email, code });
    const result: boolean = response.data.result;

    dispatch(activationCodeEmailSuccess(email, code));
    return result;
  } catch (error) {
    const serverError = 'An unexpected error occurred.';

    dispatch(activationCodeEmailFailure(email, code, serverError));
    return false;
  }
};

export type ChangePasswordResult = {
  passwordUpdated?: boolean;
  error?: string;
};

export function changeUserPassword(
  username: string,
  forgotPasswordCode: string,
  newPassword: string
): AppThunk<Promise<ChangePasswordResult>, AuthState> {
  return async function (dispatch: Dispatch): Promise<ChangePasswordResult> {
    dispatch(changeUserPasswordRequest(username));

    try {
      const response = await api.put(`users/${username}/change_password`, {
        forgot_password_code: forgotPasswordCode,
        new_password: newPassword
      });
      const { password_updated } = response.data;

      dispatch(changeUserPasswordSuccess(username));
      return {
        passwordUpdated: password_updated
      };
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(changeUserPasswordFailure(username, serverError));
      return {
        error: serverError
      };
    }
  };
}
