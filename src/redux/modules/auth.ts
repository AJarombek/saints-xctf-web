/**
 * Authentication redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { api } from '../../datasources/apiRequest';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import {AuthState, User} from "../types";
import {Dispatch} from "redux";
import {auth} from "../../datasources/authRequest";

// Actions
const SIGNIN_REQUEST = 'saints-xctf-web/auth/SIGNIN_REQUEST';
const SIGNIN_FAILURE = 'saints-xctf-web/auth/SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'saints-xctf-web/auth/SIGNIN_SUCCESS';
export const SIGNOUT = 'saints-xctf-web/auth/SIGNOUT';
const FORGOT_PASSWORD_EMAIL_REQUEST = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_REQUEST';
const FORGOT_PASSWORD_EMAIL_FAILURE = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_FAILURE';
const FORGOT_PASSWORD_EMAIL_SUCCESS = 'saints-xctf-web/auth/FORGOT_PASSWORD_EMAIL_SUCCESS';
const CHANGE_EMAIL_REQUEST = 'saints-xctf-web/auth/CHANGE_EMAIL_REQUEST';
const CHANGE_EMAIL_FAILURE = 'saints-xctf-web/auth/CHANGE_EMAIL_FAILURE';
const CHANGE_EMAIL_SUCCESS = 'saints-xctf-web/auth/CHANGE_EMAIL_SUCCESS';
const SET_USER_FROM_STORAGE = 'saints-xctf-web/auth/SET_USER_FROM_STORAGE';

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

interface SignOutAction {
  type: typeof SIGNOUT;
}

interface ForgotPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_EMAIL_REQUEST;
}

interface ForgotPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_EMAIL_SUCCESS;
  status: string;
}

interface ForgotPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_EMAIL_FAILURE;
  status: string;
  serverError: string;
}

interface ChangeEmailRequestAction {
  type: typeof CHANGE_EMAIL_REQUEST;
}

interface ChangeEmailSuccessAction {
  type: typeof CHANGE_EMAIL_SUCCESS;
}

interface ChangeEmailFailureAction {
  type: typeof CHANGE_EMAIL_FAILURE;
}

interface SetUserFromStorageAction {
  type: typeof SET_USER_FROM_STORAGE;
  user: User;
}

type AuthActionTypes =
    SignInRequestAction |
    SignInSuccessAction |
    SignInFailureAction |
    SignOutAction |
    ForgotPasswordRequestAction |
    ForgotPasswordSuccessAction |
    ForgotPasswordFailureAction |
    ChangeEmailRequestAction |
    ChangeEmailSuccessAction |
    ChangeEmailFailureAction |
    SetUserFromStorageAction;

// Reducer
const initialState: AuthState = {
  auth: {},
  user: {}
};

export default function reducer(state = initialState, action : AuthActionTypes) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return signInRequestReducer(state, action);
    case SIGNIN_SUCCESS:
      return signInSuccessReducer(state, action);
    case SIGNIN_FAILURE:
      return signInFailureReducer(state, action);
    case SIGNOUT:
      return signOutReducer(state, action);
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
    case SET_USER_FROM_STORAGE:
      return setUserFromStorageReducer(state, action);
    default:
      return state;
  }
}

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

function signOutReducer(state: AuthState, action: SignOutAction): AuthState {
  return {
    ...state,
    auth: {
      isFetching: false,
      lastUpdated: moment().unix(),
      signedInUser: null,
      status: "SIGNED OUT"
    },
    user: {}
  }
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
      status: "SUCCESS"
    },
  }
}

// Action Creators
export function signInRequest(username: string, status: string): SignInRequestAction {
  return {
    type: SIGNIN_REQUEST,
    username,
    status
  }
}

export function signInSuccess(username: string, user: User, status: string): SignInSuccessAction {
  return {
    type: SIGNIN_SUCCESS,
    username,
    user,
    status
  }
}

export function signInFailure(status: string): SignInFailureAction {
  return {
    type: SIGNIN_FAILURE,
    status
  }
}

export function signOut(): SignOutAction {
  return {
    type: SIGNOUT
  }
}

export function forgotPasswordRequest(): ForgotPasswordRequestAction {
  return {
    type: FORGOT_PASSWORD_EMAIL_REQUEST
  }
}

export function forgotPasswordSuccess(status: string): ForgotPasswordSuccessAction {
  return {
    type: FORGOT_PASSWORD_EMAIL_SUCCESS,
    status
  }
}

export function forgotPasswordFailure(status: string, serverError: string): ForgotPasswordFailureAction {
  return {
    type: FORGOT_PASSWORD_EMAIL_FAILURE,
    status,
    serverError
  }
}

export function setUserFromStorage(user: User): SetUserFromStorageAction {
  return {
    type: SET_USER_FROM_STORAGE,
    user
  }
}

export function signIn(username: string, password: string) {
  return async function (dispatch: Dispatch) {
    dispatch(signInRequest(username, "PENDING"));

    try {
      const authResponse = await auth.post(`token`, {
        clientId: username,
        clientSecret: password
      });

      const { result: token } = authResponse.data;
      localStorage.setItem('token', token);

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
      if (response?.status === 400) {
        dispatch(signInFailure("INVALID USER"));
      } else {
        dispatch(signInFailure("INTERNAL ERROR"));
      }
    }
  }
}

export function forgotPasswordEmail(email: string) {
  return async function (dispatch: Dispatch) {
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
