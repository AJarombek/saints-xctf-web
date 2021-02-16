/**
 * User notification redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 8/12/2020
 */

import { api } from '../../datasources/apiRequest';
import { Dispatch } from 'redux';
import { Notification, NotificationsState } from '../types';
import moment from 'moment';
import { AppThunk } from '../store';

// Actions
const GET_USER_NOTIFICATIONS_REQUEST = 'saints-xctf-web/notifications/GET_USER_NOTIFICATIONS_REQUEST';
const GET_USER_NOTIFICATIONS_SUCCESS = 'saints-xctf-web/notifications/GET_USER_NOTIFICATIONS_SUCCESS';
const GET_USER_NOTIFICATIONS_FAILURE = 'saints-xctf-web/notifications/GET_USER_NOTIFICATIONS_FAILURE';
const POST_USER_NOTIFICATIONS_REQUEST = 'saints-xctf-web/notifications/POST_USER_NOTIFICATIONS_REQUEST';
const POST_USER_NOTIFICATIONS_SUCCESS = 'saints-xctf-web/notifications/POST_USER_NOTIFICATIONS_SUCCESS';
const POST_USER_NOTIFICATIONS_FAILURE = 'saints-xctf-web/notifications/POST_USER_NOTIFICATIONS_FAILURE';
const PUT_USER_NOTIFICATIONS_REQUEST = 'saints-xctf-web/notifications/PUT_USER_NOTIFICATIONS_REQUEST';
const PUT_USER_NOTIFICATIONS_SUCCESS = 'saints-xctf-web/notifications/PUT_USER_NOTIFICATIONS_SUCCESS';
const PUT_USER_NOTIFICATIONS_FAILURE = 'saints-xctf-web/notifications/PUT_USER_NOTIFICATIONS_FAILURE';

// Action Types
interface GetUserNotificationsRequestAction {
  type: typeof GET_USER_NOTIFICATIONS_REQUEST;
}

interface GetUserNotificationsSuccessAction {
  type: typeof GET_USER_NOTIFICATIONS_SUCCESS;
  notifications: Notification[];
}

interface GetUserNotificationsFailureAction {
  type: typeof GET_USER_NOTIFICATIONS_FAILURE;
  serverError: string;
}

interface PostUserNotificationsRequestAction {
  type: typeof POST_USER_NOTIFICATIONS_REQUEST;
}

interface PostUserNotificationsSuccessAction {
  type: typeof POST_USER_NOTIFICATIONS_SUCCESS;
}

interface PostUserNotificationsFailureAction {
  type: typeof POST_USER_NOTIFICATIONS_FAILURE;
  serverError: string;
}

interface PutUserNotificationsRequestAction {
  type: typeof PUT_USER_NOTIFICATIONS_REQUEST;
  id: number;
}

interface PutUserNotificationsSuccessAction {
  type: typeof PUT_USER_NOTIFICATIONS_SUCCESS;
  id: number;
}

interface PutUserNotificationsFailureAction {
  type: typeof PUT_USER_NOTIFICATIONS_FAILURE;
  id: number;
  serverError: string;
}

type NotificationsActionTypes =
  | GetUserNotificationsRequestAction
  | GetUserNotificationsSuccessAction
  | GetUserNotificationsFailureAction
  | PostUserNotificationsRequestAction
  | PostUserNotificationsSuccessAction
  | PostUserNotificationsFailureAction
  | PutUserNotificationsRequestAction
  | PutUserNotificationsSuccessAction
  | PutUserNotificationsFailureAction;

// Reducer
const initialState: NotificationsState = {
  newNotification: {},
  updateNotifications: {}
};

function getUserNotificationsRequestReducer(state: NotificationsState): NotificationsState {
  return {
    ...state,
    isFetching: true,
    lastUpdated: moment().unix(),
    items: []
  };
}

function getUserNotificationsSuccessReducer(
  state: NotificationsState,
  action: GetUserNotificationsSuccessAction
): NotificationsState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    items: action.notifications,
    serverError: null
  };
}

function getUserNotificationsFailureReducer(
  state: NotificationsState,
  action: GetUserNotificationsFailureAction
): NotificationsState {
  return {
    ...state,
    isFetching: false,
    lastUpdated: moment().unix(),
    items: [],
    serverError: action.serverError
  };
}

function postUserNotificationsRequestReducer(state: NotificationsState): NotificationsState {
  return {
    ...state,
    newNotification: {
      isFetching: true,
      lastUpdated: moment().unix()
    }
  };
}

function postUserNotificationsSuccessReducer(state: NotificationsState): NotificationsState {
  return {
    ...state,
    newNotification: {
      isFetching: false,
      lastUpdated: moment().unix(),
      created: true
    }
  };
}

function postUserNotificationsFailureReducer(
  state: NotificationsState,
  action: PostUserNotificationsFailureAction
): NotificationsState {
  return {
    ...state,
    newNotification: {
      isFetching: false,
      lastUpdated: moment().unix(),
      created: false,
      serverError: action.serverError
    }
  };
}

function putUserNotificationsRequestReducer(
  state: NotificationsState,
  action: PutUserNotificationsRequestAction
): NotificationsState {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      [action.id]: {
        isFetching: true,
        lastUpdated: moment().unix()
      }
    }
  };
}

function putUserNotificationsSuccessReducer(
  state: NotificationsState,
  action: PutUserNotificationsSuccessAction
): NotificationsState {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        updated: true
      }
    }
  };
}

function putUserNotificationsFailureReducer(
  state: NotificationsState,
  action: PutUserNotificationsFailureAction
): NotificationsState {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        updated: false,
        serverError: action.serverError
      }
    }
  };
}

export default function reducer(
  state: NotificationsState = initialState,
  action: NotificationsActionTypes
): NotificationsState {
  switch (action.type) {
    case GET_USER_NOTIFICATIONS_REQUEST:
      return getUserNotificationsRequestReducer(state);
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return getUserNotificationsSuccessReducer(state, action);
    case GET_USER_NOTIFICATIONS_FAILURE:
      return getUserNotificationsFailureReducer(state, action);
    case POST_USER_NOTIFICATIONS_REQUEST:
      return postUserNotificationsRequestReducer(state);
    case POST_USER_NOTIFICATIONS_SUCCESS:
      return postUserNotificationsSuccessReducer(state);
    case POST_USER_NOTIFICATIONS_FAILURE:
      return postUserNotificationsFailureReducer(state, action);
    case PUT_USER_NOTIFICATIONS_REQUEST:
      return putUserNotificationsRequestReducer(state, action);
    case PUT_USER_NOTIFICATIONS_SUCCESS:
      return putUserNotificationsSuccessReducer(state, action);
    case PUT_USER_NOTIFICATIONS_FAILURE:
      return putUserNotificationsFailureReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function getUserNotificationsRequest(): GetUserNotificationsRequestAction {
  return {
    type: GET_USER_NOTIFICATIONS_REQUEST
  };
}

export function getUserNotificationsSuccess(notifications: Notification[]): GetUserNotificationsSuccessAction {
  return {
    type: GET_USER_NOTIFICATIONS_SUCCESS,
    notifications
  };
}

export function getUserNotificationsFailure(serverError: string): GetUserNotificationsFailureAction {
  return {
    type: GET_USER_NOTIFICATIONS_FAILURE,
    serverError
  };
}

export function postUserNotificationsRequest(): PostUserNotificationsRequestAction {
  return {
    type: POST_USER_NOTIFICATIONS_REQUEST
  };
}

export function postUserNotificationsSuccess(): PostUserNotificationsSuccessAction {
  return {
    type: POST_USER_NOTIFICATIONS_SUCCESS
  };
}

export function postUserNotificationsFailure(serverError: string): PostUserNotificationsFailureAction {
  return {
    type: POST_USER_NOTIFICATIONS_FAILURE,
    serverError
  };
}

export function putUserNotificationsRequest(id: number): PutUserNotificationsRequestAction {
  return {
    type: PUT_USER_NOTIFICATIONS_REQUEST,
    id
  };
}

export function putUserNotificationsSuccess(id: number): PutUserNotificationsSuccessAction {
  return {
    type: PUT_USER_NOTIFICATIONS_SUCCESS,
    id
  };
}

export function putUserNotificationsFailure(id: number, serverError: string): PutUserNotificationsFailureAction {
  return {
    type: PUT_USER_NOTIFICATIONS_FAILURE,
    id,
    serverError
  };
}

export function getUserNotifications(username: string): AppThunk<Promise<void>, NotificationsState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserNotificationsRequest());

    try {
      const response = await api.get(`users/notifications/${username}`);
      const { notifications } = response.data;

      dispatch(getUserNotificationsSuccess(notifications));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';
      dispatch(getUserNotificationsFailure(serverError));
    }
  };
}
