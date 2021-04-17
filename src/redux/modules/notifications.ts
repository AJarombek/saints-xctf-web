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
const POST_NOTIFICATION_REQUEST = 'saints-xctf-web/notifications/POST_NOTIFICATION_REQUEST';
const POST_NOTIFICATION_SUCCESS = 'saints-xctf-web/notifications/POST_NOTIFICATION_SUCCESS';
const POST_NOTIFICATION_FAILURE = 'saints-xctf-web/notifications/POST_NOTIFICATION_FAILURE';
const PUT_NOTIFICATION_REQUEST = 'saints-xctf-web/notifications/PUT_NOTIFICATION_REQUEST';
const PUT_NOTIFICATION_SUCCESS = 'saints-xctf-web/notifications/PUT_NOTIFICATION_SUCCESS';
const PUT_NOTIFICATION_FAILURE = 'saints-xctf-web/notifications/PUT_NOTIFICATION_FAILURE';
const VIEW_NOTIFICATION = 'saints-xctf-web/notifications/VIEW_NOTIFICATION';

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

interface PostNotificationRequestAction {
  type: typeof POST_NOTIFICATION_REQUEST;
}

interface PostNotificationSuccessAction {
  type: typeof POST_NOTIFICATION_SUCCESS;
  created: boolean;
}

interface PostNotificationFailureAction {
  type: typeof POST_NOTIFICATION_FAILURE;
  serverError: string;
}

interface PutNotificationRequestAction {
  type: typeof PUT_NOTIFICATION_REQUEST;
  id: number;
}

interface PutNotificationSuccessAction {
  type: typeof PUT_NOTIFICATION_SUCCESS;
  id: number;
  updated: boolean;
}

interface PutNotificationFailureAction {
  type: typeof PUT_NOTIFICATION_FAILURE;
  id: number;
  serverError: string;
}

interface ViewNotificationAction {
  type: typeof VIEW_NOTIFICATION;
  id: number;
}

type NotificationsActionTypes =
  | GetUserNotificationsRequestAction
  | GetUserNotificationsSuccessAction
  | GetUserNotificationsFailureAction
  | PostNotificationRequestAction
  | PostNotificationSuccessAction
  | PostNotificationFailureAction
  | PutNotificationRequestAction
  | PutNotificationSuccessAction
  | PutNotificationFailureAction
  | ViewNotificationAction;

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

function postNotificationRequestReducer(state: NotificationsState): NotificationsState {
  return {
    ...state,
    newNotification: {
      isFetching: true,
      lastUpdated: moment().unix()
    }
  };
}

function postNotificationSuccessReducer(
  state: NotificationsState,
  action: PostNotificationSuccessAction
): NotificationsState {
  return {
    ...state,
    newNotification: {
      isFetching: false,
      lastUpdated: moment().unix(),
      created: action.created
    }
  };
}

function postNotificationFailureReducer(
  state: NotificationsState,
  action: PostNotificationFailureAction
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
  action: PutNotificationRequestAction
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
  action: PutNotificationSuccessAction
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
  action: PutNotificationFailureAction
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

function viewNotificationReducer(state: NotificationsState, action: ViewNotificationAction): NotificationsState {
  return {
    ...state,
    items: state.items?.map((item: Notification) =>
      action.id === item.notification_id ? { ...item, viewed: 'Y' } : item
    )
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
    case POST_NOTIFICATION_REQUEST:
      return postNotificationRequestReducer(state);
    case POST_NOTIFICATION_SUCCESS:
      return postNotificationSuccessReducer(state, action);
    case POST_NOTIFICATION_FAILURE:
      return postNotificationFailureReducer(state, action);
    case PUT_NOTIFICATION_REQUEST:
      return putUserNotificationsRequestReducer(state, action);
    case PUT_NOTIFICATION_SUCCESS:
      return putUserNotificationsSuccessReducer(state, action);
    case PUT_NOTIFICATION_FAILURE:
      return putUserNotificationsFailureReducer(state, action);
    case VIEW_NOTIFICATION:
      return viewNotificationReducer(state, action);
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

export function postNotificationRequest(): PostNotificationRequestAction {
  return {
    type: POST_NOTIFICATION_REQUEST
  };
}

export function postNotificationSuccess(created: boolean): PostNotificationSuccessAction {
  return {
    type: POST_NOTIFICATION_SUCCESS,
    created
  };
}

export function postNotificationFailure(serverError: string): PostNotificationFailureAction {
  return {
    type: POST_NOTIFICATION_FAILURE,
    serverError
  };
}

export function putNotificationRequest(id: number): PutNotificationRequestAction {
  return {
    type: PUT_NOTIFICATION_REQUEST,
    id
  };
}

export function putNotificationSuccess(id: number, updated: boolean): PutNotificationSuccessAction {
  return {
    type: PUT_NOTIFICATION_SUCCESS,
    id,
    updated
  };
}

export function putNotificationFailure(id: number, serverError: string): PutNotificationFailureAction {
  return {
    type: PUT_NOTIFICATION_FAILURE,
    id,
    serverError
  };
}

export function viewNotification(id: number): ViewNotificationAction {
  return {
    type: VIEW_NOTIFICATION,
    id
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

      if (response.status !== 403) {
        dispatch(getUserNotificationsFailure(serverError));
      }
    }
  };
}

export function postNotification(
  username: string,
  description: string,
  link: string
): AppThunk<Promise<boolean>, NotificationsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(postNotificationRequest());

    try {
      const response = await api.post('notifications/', { username, description, link });
      const { added } = response.data;

      dispatch(postNotificationSuccess(added));
      return added;
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status !== 403) {
        dispatch(postNotificationFailure(serverError));
      }

      return false;
    }
  };
}

export function putNotification(notification: Notification): AppThunk<Promise<boolean>, NotificationsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(putNotificationRequest(notification.notification_id));

    try {
      const response = await api.put(`notifications/${notification.notification_id}`, notification);
      const { updated } = response.data;

      dispatch(putNotificationSuccess(notification.notification_id, updated));
      return updated;
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status !== 403) {
        dispatch(putNotificationFailure(notification.notification_id, serverError));
      }

      return false;
    }
  };
}
