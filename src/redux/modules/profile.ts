/**
 * Profile redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 9/9/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import {Dispatch} from 'redux';
import {Flair, ProfileState, User} from '../types';

// Actions
const GET_USER_REQUEST = 'saints-xctf-web/profile/GET_USER_REQUEST';
const GET_USER_SUCCESS = 'saints-xctf-web/profile/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'saints-xctf-web/profile/GET_USER_FAILURE';
const SET_USER = 'saints-xctf-web/profile/SET_USER';
const GET_USER_FLAIR_REQUEST = 'saints-xctf-web/profile/GET_USER_FLAIR_REQUEST';
const GET_USER_FLAIR_SUCCESS = 'saints-xctf-web/profile/GET_USER_FLAIR_SUCCESS';
const GET_USER_FLAIR_FAILURE = 'saints-xctf-web/profile/GET_USER_FLAIR_FAILURE';

// Action Types

interface GetUserRequestAction {
    type: typeof GET_USER_REQUEST;
    username: string;
}

interface GetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    username: string;
    user: User;
}

interface GetUserFailureAction {
    type: typeof GET_USER_FAILURE;
    username: string;
    serverError: string;
}

interface SetUserAction {
    type: typeof SET_USER;
    user: User;
}

interface GetUserFlairRequestAction {
    type: typeof GET_USER_FLAIR_REQUEST;
    username: string;
}

interface GetUserFlairSuccessAction {
    type: typeof GET_USER_FLAIR_SUCCESS;
    username: string;
    flair: Flair[];
}

interface GetUserFlairFailureAction {
    type: typeof GET_USER_FLAIR_FAILURE;
    username: string;
    serverError: string;
}

type ProfileActionTypes =
    GetUserRequestAction |
    GetUserSuccessAction |
    GetUserFailureAction |
    SetUserAction |
    GetUserFlairRequestAction |
    GetUserFlairSuccessAction |
    GetUserFlairFailureAction;

// Reducer
const initialState: ProfileState = {
  users: {}
};

export default function reducer(state = initialState, action: ProfileActionTypes): ProfileState {
  switch (action.type) {
  case GET_USER_REQUEST:
    return getUserRequestReducer(state, action);
  case GET_USER_SUCCESS:
    return getUserSuccessReducer(state, action);
  case GET_USER_FAILURE:
    return getUserFailureReducer(state, action);
  case SET_USER:
    return setUserReducer(state, action);
  case GET_USER_FLAIR_REQUEST:
    return getUserFlairRequestReducer(state, action);
  case GET_USER_FLAIR_SUCCESS:
    return getUserFlairSuccessReducer(state, action);
  case GET_USER_FLAIR_FAILURE:
    return getUserFlairFailureReducer(state, action);
  default:
    return state;
  }
}

function getUserRequestReducer(state: ProfileState, action: GetUserRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: true,
          lastUpdated: moment().unix(),
        }
      }
    },
  }
}

function getUserSuccessReducer(state: ProfileState, action: GetUserSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: false,
          lastUpdated: moment().unix(),
          ...action.user
        }
      }
    },
  }
}

function getUserFailureReducer(state: ProfileState, action: GetUserFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    },
  }
}

function setUserReducer(state: ProfileState, action: SetUserAction): ProfileState {
  const user = state.users[action.user.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.user.username]: {
        ...user,
        user: {
          ...action.user,
          isFetching: false,
          lastUpdated: moment().unix()
        }
      }
    }
  }
}

function getUserFlairRequestReducer(state: ProfileState, action: GetUserFlairRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: true,
          lastUpdated: moment().unix(),
        }
      }
    }
  }
}

function getUserFlairSuccessReducer(state: ProfileState, action: GetUserFlairSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: false,
          lastUpdated: moment().unix(),
          items: action.flair
        }
      }
    }
  }
}

function getUserFlairFailureReducer(state: ProfileState, action: GetUserFlairFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  }
}

// Action Creators
export function getUserRequest(username: string): GetUserRequestAction {
  return {
    type: GET_USER_REQUEST,
    username
  }
}

export function getUserSuccess(username: string, user: User): GetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    username,
    user
  }
}

export function getUserFailure(username: string, serverError: string): GetUserFailureAction {
  return {
    type: GET_USER_FAILURE,
    username,
    serverError
  }
}

export function setUser(user: User): SetUserAction {
  return {
    type: SET_USER,
    user
  }
}

export function getUserFlairRequest(username: string): GetUserFlairRequestAction {
  return {
    type: GET_USER_FLAIR_REQUEST,
    username,
  }
}

export function getUserFlairSuccess(username: string, flair: Flair[]): GetUserFlairSuccessAction {
  return {
    type: GET_USER_FLAIR_SUCCESS,
    username,
    flair
  }
}

export function getUserFlairFailure(username: string, serverError: string): GetUserFlairFailureAction {
  return {
    type: GET_USER_FLAIR_FAILURE,
    username,
    serverError
  }
}

export function getUser(username: string) {
  return async function (dispatch: Dispatch) {
    dispatch(getUserRequest(username));

    try {
      const response = await api.get(`users/${username}`);
      const { user } = response.data;

      dispatch(getUserSuccess(username, user));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserFailure(username, serverError));
    }
  }
}

export function getUserFlair(username: string) {
  return async function (dispatch: Dispatch) {
    dispatch(getUserFlairRequest(username));

    try {
      const response = await api.get(`users/flair/${username}`);
      const { flair } = response.data;

      dispatch(getUserFlairSuccess(username, flair));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserFlairFailure(username, serverError));
    }
  }
}
