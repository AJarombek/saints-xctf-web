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

type NotificationsActionTypes =
  | GetUserNotificationsRequestAction
  | GetUserNotificationsSuccessAction
  | GetUserNotificationsFailureAction;

// Reducer
const initialState: NotificationsState = {};

function getUserNotificationsRequestReducer(
  state: NotificationsState,
  action: GetUserNotificationsRequestAction
): NotificationsState {
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

export default function reducer(
  state: NotificationsState = initialState,
  action: NotificationsActionTypes
): NotificationsState {
  switch (action.type) {
    case GET_USER_NOTIFICATIONS_REQUEST:
      return getUserNotificationsRequestReducer(state, action);
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return getUserNotificationsSuccessReducer(state, action);
    case GET_USER_NOTIFICATIONS_FAILURE:
      return getUserNotificationsFailureReducer(state, action);
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
