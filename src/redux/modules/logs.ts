/**
 * Exercise log redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import { api } from '../../datasources/apiRequest';
import {
  Comment,
  DeletedLogs,
  Log,
  LogFeedPage,
  LogFeeds,
  Logs,
  LogsState,
  NewComments,
  NewLog,
  UpdateLogs,
} from '../types';
import { Dispatch } from 'redux';
import moment from 'moment';
import { AppThunk } from '../store';
import { AxiosError } from 'axios';

// Actions
const GET_LOG_REQUEST = 'saints-xctf-web/logs/GET_LOG_REQUEST';
const GET_LOG_SUCCESS = 'saints-xctf-web/logs/GET_LOG_SUCCESS';
const GET_LOG_FAILURE = 'saints-xctf-web/logs/GET_LOG_FAILURE';
const LOG_FEED_REQUEST = 'saints-xctf-web/logs/LOG_FEED_REQUEST';
const LOG_FEED_SUCCESS = 'saints-xctf-web/logs/LOG_FEED_SUCCESS';
const LOG_FEED_FAILURE = 'saints-xctf-web/logs/LOG_FEED_FAILURE';
const POST_LOG_REQUEST = 'saints-xctf-web/logs/POST_LOG_REQUEST';
const POST_LOG_SUCCESS = 'saints-xctf-web/logs/POST_LOG_SUCCESS';
const POST_LOG_FAILURE = 'saints-xctf-web/logs/POST_LOG_FAILURE';
const INVALIDATE_LOG_CREATED = 'saints-xctf-web/logs/INVALIDATE_LOG_CREATED';
const PUT_LOG_REQUEST = 'saints-xctf-web/logs/PUT_LOG_REQUEST';
const PUT_LOG_SUCCESS = 'saints-xctf-web/logs/PUT_LOG_SUCCESS';
const PUT_LOG_FAILURE = 'saints-xctf-web/logs/PUT_LOG_FAILURE';
const INVALIDATE_LOG_UPDATED = 'saints-xctf-web/logs/INVALIDATE_LOG_UPDATED';
const DELETE_LOG_REQUEST = 'saints-xctf-web/logs/DELETE_LOG_REQUEST';
const DELETE_LOG_SUCCESS = 'saints-xctf-web/logs/DELETE_LOG_SUCCESS';
const DELETE_LOG_FAILURE = 'saints-xctf-web/logs/DELETE_LOG_FAILURE';
const POST_COMMENT_REQUEST = 'saints-xctf-web/logs/POST_COMMENT_REQUEST';
const POST_COMMENT_SUCCESS = 'saints-xctf-web/logs/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'saints-xctf-web/logs/POST_COMMENT_FAILURE';
const ADD_COMMENT_TO_FEED = 'saints-xctf-web/logs/ADD_COMMENT_TO_FEED';
const ADD_COMMENT = 'saints-xctf-web/logs/ADD_COMMENT';

// Action Types
interface GetLogRequestAction {
  type: typeof GET_LOG_REQUEST;
  id: number;
}

interface GetLogSuccessAction {
  type: typeof GET_LOG_SUCCESS;
  id: number;
  log: Log;
  comments: Comment[];
}

interface GetLogFailureAction {
  type: typeof GET_LOG_FAILURE;
  id: number;
  serverError: string;
}

interface LogFeedRequestAction {
  type: typeof LOG_FEED_REQUEST;
  filterBy: string;
  bucket: string;
  page: number;
}

interface LogFeedSuccessAction {
  type: typeof LOG_FEED_SUCCESS;
  filterBy: string;
  bucket: string;
  logs: Log[];
  next: string;
  page: number;
  pages: number;
}

interface LogFeedFailureAction {
  type: typeof LOG_FEED_FAILURE;
  filterBy: string;
  bucket: string;
  serverError: string;
  page: number;
}

interface PostLogRequestAction {
  type: typeof POST_LOG_REQUEST;
}

interface PostLogSuccessAction {
  type: typeof POST_LOG_SUCCESS;
}

interface PostLogFailureAction {
  type: typeof POST_LOG_FAILURE;
  serverError: string;
}

interface InvalidateLogCreatedAction {
  type: typeof INVALIDATE_LOG_CREATED;
}

interface PutLogRequestAction {
  type: typeof PUT_LOG_REQUEST;
  id: number;
}

interface PutLogSuccessAction {
  type: typeof PUT_LOG_SUCCESS;
  id: number;
}

interface PutLogFailureAction {
  type: typeof PUT_LOG_FAILURE;
  id: number;
  serverError: string;
}

interface InvalidateLogUpdatedAction {
  type: typeof INVALIDATE_LOG_UPDATED;
  id: number;
}

interface DeleteLogRequestAction {
  type: typeof DELETE_LOG_REQUEST;
  id: number;
}

interface DeleteLogSuccessAction {
  type: typeof DELETE_LOG_SUCCESS;
  id: number;
}

interface DeleteLogFailureAction {
  type: typeof DELETE_LOG_FAILURE;
  id: number;
  serverError: string;
}

/* I hope you are doing okay */
interface PostCommentRequestAction {
  type: typeof POST_COMMENT_REQUEST;
  logId: number;
}

interface PostCommentSuccessAction {
  type: typeof POST_COMMENT_SUCCESS;
  logId: number;
}

interface PostCommentFailureAction {
  type: typeof POST_COMMENT_FAILURE;
  logId: number;
  serverError: string;
}

interface AddCommentAction {
  type: typeof ADD_COMMENT;
  logId: number;
  content: string;
  username: string;
  first: string;
  last: string;
}

interface AddCommentToFeedAction {
  type: typeof ADD_COMMENT_TO_FEED;
  logId: number;
  content: string;
  username: string;
  first: string;
  last: string;
  filterBy: string;
  bucket: string;
  page: number;
  index: number;
}

type LogsActionTypes =
  | GetLogRequestAction
  | GetLogSuccessAction
  | GetLogFailureAction
  | LogFeedRequestAction
  | LogFeedSuccessAction
  | LogFeedFailureAction
  | PostLogRequestAction
  | PostLogSuccessAction
  | PostLogFailureAction
  | InvalidateLogCreatedAction
  | PutLogRequestAction
  | PutLogSuccessAction
  | PutLogFailureAction
  | InvalidateLogUpdatedAction
  | DeleteLogRequestAction
  | DeleteLogSuccessAction
  | DeleteLogFailureAction
  | PostCommentRequestAction
  | PostCommentSuccessAction
  | PostCommentFailureAction
  | AddCommentAction
  | AddCommentToFeedAction;

// Reducer
const initialState: LogsState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: -1,
  items: {} as Logs,
  feeds: {} as LogFeeds,
  newLog: {} as NewLog,
  updateLogs: {} as UpdateLogs,
  deletedLogs: {} as DeletedLogs,
  newComments: {} as NewComments,
};

function logFeedRequestReducer(state: LogsState, action: LogFeedRequestAction): LogsState {
  const feedName = `${action.filterBy}-${action.bucket}`;
  const existingPages = state.feeds[feedName]?.pages ?? {};
  const existingPage = existingPages[action.page] ?? {};

  return {
    ...state,
    feeds: {
      [feedName]: {
        filterBy: action.filterBy,
        bucket: action.bucket,
        pages: {
          ...existingPages,
          [action.page]: {
            ...existingPage,
            isFetching: true,
            lastUpdated: moment().unix(),
          },
        },
      },
    },
  };
}

function logFeedSuccessReducer(state: LogsState, action: LogFeedSuccessAction): LogsState {
  const feedName = `${action.filterBy}-${action.bucket}`;
  const existingPages = state.feeds[feedName]?.pages ?? {};
  const existingPage = existingPages[action.page] ?? {};

  return {
    ...state,
    feeds: {
      [feedName]: {
        filterBy: action.filterBy,
        bucket: action.bucket,
        pages: {
          ...existingPages,
          [action.page]: {
            ...existingPage,
            isFetching: false,
            lastUpdated: moment().unix(),
            items: action.logs,
            pages: action.pages,
            serverError: null,
          },
        },
      },
    },
  };
}

function logFeedFailureReducer(state: LogsState, action: LogFeedFailureAction): LogsState {
  const feedName = `${action.filterBy}-${action.bucket}`;
  const existingPages = state.feeds[feedName]?.pages ?? {};
  const existingPage = existingPages[action.page] ?? {};

  return {
    ...state,
    feeds: {
      [feedName]: {
        filterBy: action.filterBy,
        bucket: action.bucket,
        pages: {
          ...existingPages,
          [action.page]: {
            ...existingPage,
            isFetching: false,
            lastUpdated: moment().unix(),
            serverError: action.serverError,
          },
        },
      },
    },
  };
}

function getLogRequestReducer(state: LogsState, action: GetLogRequestAction): LogsState {
  return {
    ...state,
    items: {
      [action.id]: {
        isFetching: true,
        lastUpdated: moment().unix(),
      },
    },
  };
}

function getLogSuccessReducer(state: LogsState, action: GetLogSuccessAction): LogsState {
  return {
    ...state,
    items: {
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        ...action.log,
        comments: action.comments,
      },
    },
  };
}

function getLogFailureReducer(state: LogsState, action: GetLogFailureAction): LogsState {
  return {
    ...state,
    items: {
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError,
      },
    },
  };
}

function postLogRequestReducer(state: LogsState): LogsState {
  return {
    ...state,
    newLog: {
      isFetching: true,
      lastUpdated: moment().unix(),
    },
  };
}

function postLogSuccessReducer(state: LogsState): LogsState {
  return {
    ...state,
    newLog: {
      isFetching: false,
      lastUpdated: moment().unix(),
      created: true,
      serverError: null,
    },
  };
}

function postLogFailureReducer(state: LogsState, action: PostLogFailureAction): LogsState {
  return {
    ...state,
    newLog: {
      isFetching: false,
      lastUpdated: moment().unix(),
      created: false,
      serverError: action.serverError,
    },
  };
}

function invalidateLogCreatedReducer(state: LogsState): LogsState {
  return {
    ...state,
    newLog: {
      ...state.newLog,
      didInvalidate: true,
    },
  };
}

function putLogRequestReducer(state: LogsState, action: PutLogRequestAction): LogsState {
  return {
    ...state,
    updateLogs: {
      ...state.updateLogs,
      [action.id]: {
        isFetching: true,
        lastUpdated: moment().unix(),
      },
    },
  };
}

function putLogSuccessReducer(state: LogsState, action: PutLogSuccessAction): LogsState {
  return {
    ...state,
    updateLogs: {
      ...state.updateLogs,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        updated: true,
        serverError: null,
      },
    },
  };
}

function putLogFailureReducer(state: LogsState, action: PutLogFailureAction): LogsState {
  return {
    ...state,
    updateLogs: {
      ...state.updateLogs,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        updated: false,
        serverError: action.serverError,
      },
    },
  };
}

function invalidateLogUpdatedReducer(state: LogsState, action: InvalidateLogUpdatedAction): LogsState {
  const updateLog = state.updateLogs[action.id] ?? {};
  return {
    ...state,
    updateLogs: {
      ...state.updateLogs,
      [action.id]: {
        ...updateLog,
        didInvalidate: true,
      },
    },
  };
}

function deleteLogRequestReducer(state: LogsState, action: DeleteLogRequestAction): LogsState {
  return {
    ...state,
    deletedLogs: {
      ...state.deletedLogs,
      [action.id]: {
        isFetching: true,
        lastUpdated: moment().unix(),
      },
    },
  };
}

function deleteLogSuccessReducer(state: LogsState, action: DeleteLogSuccessAction): LogsState {
  return {
    ...state,
    deletedLogs: {
      ...state.deletedLogs,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        deleted: true,
        serverError: null,
      },
    },
  };
}

function deleteLogFailureReducer(state: LogsState, action: DeleteLogFailureAction): LogsState {
  return {
    ...state,
    deletedLogs: {
      ...state.deletedLogs,
      [action.id]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        deleted: false,
        serverError: action.serverError,
      },
    },
  };
}

function postCommentRequestReducer(state: LogsState, action: PostCommentRequestAction): LogsState {
  const existingNewComments = state.newComments ?? {};
  return {
    ...state,
    newComments: {
      ...existingNewComments,
      [action.logId]: {
        isFetching: true,
        lastUpdated: moment().unix(),
      },
    },
  };
}

function postCommentSuccessReducer(state: LogsState, action: PostCommentSuccessAction): LogsState {
  const existingNewComments = state.newComments ?? {};
  return {
    ...state,
    newComments: {
      ...existingNewComments,
      [action.logId]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        created: true,
        serverError: null,
      },
    },
  };
}

function postCommentFailureReducer(state: LogsState, action: PostCommentFailureAction): LogsState {
  const existingNewComments = state.newComments ?? {};
  return {
    ...state,
    newComments: {
      ...existingNewComments,
      [action.logId]: {
        isFetching: false,
        lastUpdated: moment().unix(),
        created: false,
        serverError: action.serverError,
      },
    },
  };
}

function addCommentToFeedReducer(state: LogsState, action: AddCommentToFeedAction): LogsState {
  const feedName = `${action.filterBy}-${action.bucket}`;
  const existingPages = state.feeds[feedName]?.pages ?? {};
  const existingPage = existingPages[action.page] ?? ({} as LogFeedPage);

  const newItems = [...existingPage.items];
  newItems[action.index].comments = [
    {
      comment_id: -1,
      username: action.username,
      first: action.first,
      last: action.last,
      log_id: action.logId,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      content: action.content,
    },
    ...newItems[action.index].comments,
  ];

  return {
    ...state,
    feeds: {
      [feedName]: {
        filterBy: action.filterBy,
        bucket: action.bucket,
        pages: {
          ...existingPages,
          [action.page]: {
            ...existingPage,
            isFetching: false,
            lastUpdated: moment().unix(),
            items: newItems,
          },
        },
      },
    },
  };
}

function addCommentReducer(state: LogsState, action: AddCommentAction): LogsState {
  const newComments = [
    {
      comment_id: -1,
      username: action.username,
      first: action.first,
      last: action.last,
      log_id: action.logId,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      content: action.content,
    },
    ...(state.items[action.logId].comments ?? []),
  ];

  return {
    ...state,
    items: {
      [action.logId]: {
        ...state.items[action.logId],
        comments: newComments,
      },
    },
  };
}

// Action Creators
export function getLogRequest(id: number): GetLogRequestAction {
  return {
    type: GET_LOG_REQUEST,
    id,
  };
}

export function getLogSuccess(id: number, log: Log, comments: Comment[]): GetLogSuccessAction {
  return {
    type: GET_LOG_SUCCESS,
    id,
    log,
    comments,
  };
}

export function getLogFailure(id: number, serverError: string): GetLogFailureAction {
  return {
    type: GET_LOG_FAILURE,
    id,
    serverError,
  };
}

export function logFeedRequest(page: number, filterBy: string, bucket: string): LogFeedRequestAction {
  return {
    type: LOG_FEED_REQUEST,
    filterBy,
    bucket,
    page,
  };
}

export function logFeedSuccess(
  page: number,
  filterBy: string,
  bucket: string,
  logs: Log[],
  next: string,
  pages: number
): LogFeedSuccessAction {
  return {
    type: LOG_FEED_SUCCESS,
    filterBy,
    bucket,
    logs,
    next,
    page,
    pages,
  };
}

export function logFeedFailure(
  page: number,
  filterBy: string,
  bucket: string,
  serverError: string
): LogFeedFailureAction {
  return {
    type: LOG_FEED_FAILURE,
    filterBy,
    bucket,
    serverError,
    page,
  };
}

export default function reducer(state: LogsState = initialState, action: LogsActionTypes): LogsState {
  switch (action.type) {
    case LOG_FEED_REQUEST:
      return logFeedRequestReducer(state, action);
    case LOG_FEED_SUCCESS:
      return logFeedSuccessReducer(state, action);
    case LOG_FEED_FAILURE:
      return logFeedFailureReducer(state, action);
    case GET_LOG_REQUEST:
      return getLogRequestReducer(state, action);
    case GET_LOG_SUCCESS:
      return getLogSuccessReducer(state, action);
    case GET_LOG_FAILURE:
      return getLogFailureReducer(state, action);
    case POST_LOG_REQUEST:
      return postLogRequestReducer(state);
    case POST_LOG_SUCCESS:
      return postLogSuccessReducer(state);
    case POST_LOG_FAILURE:
      return postLogFailureReducer(state, action);
    case INVALIDATE_LOG_CREATED:
      return invalidateLogCreatedReducer(state);
    case PUT_LOG_REQUEST:
      return putLogRequestReducer(state, action);
    case PUT_LOG_SUCCESS:
      return putLogSuccessReducer(state, action);
    case PUT_LOG_FAILURE:
      return putLogFailureReducer(state, action);
    case INVALIDATE_LOG_UPDATED:
      return invalidateLogUpdatedReducer(state, action);
    case DELETE_LOG_REQUEST:
      return deleteLogRequestReducer(state, action);
    case DELETE_LOG_SUCCESS:
      return deleteLogSuccessReducer(state, action);
    case DELETE_LOG_FAILURE:
      return deleteLogFailureReducer(state, action);
    case POST_COMMENT_REQUEST:
      return postCommentRequestReducer(state, action);
    case POST_COMMENT_SUCCESS:
      return postCommentSuccessReducer(state, action);
    case POST_COMMENT_FAILURE:
      return postCommentFailureReducer(state, action);
    case ADD_COMMENT_TO_FEED:
      return addCommentToFeedReducer(state, action);
    case ADD_COMMENT:
      return addCommentReducer(state, action);
    default:
      return state;
  }
}

export function postLogRequest(): PostLogRequestAction {
  return {
    type: POST_LOG_REQUEST,
  };
}

export function postLogSuccess(): PostLogSuccessAction {
  return {
    type: POST_LOG_SUCCESS,
  };
}

export function postLogFailure(serverError: string): PostLogFailureAction {
  return {
    type: POST_LOG_FAILURE,
    serverError,
  };
}

export function invalidateLogCreated(): InvalidateLogCreatedAction {
  return {
    type: INVALIDATE_LOG_CREATED,
  };
}

export function putLogRequest(id: number): PutLogRequestAction {
  return {
    type: PUT_LOG_REQUEST,
    id,
  };
}

export function putLogSuccess(id: number): PutLogSuccessAction {
  return {
    type: PUT_LOG_SUCCESS,
    id,
  };
}

export function putLogFailure(id: number, serverError: string): PutLogFailureAction {
  return {
    type: PUT_LOG_FAILURE,
    id,
    serverError,
  };
}

export function invalidateLogUpdated(id: number): InvalidateLogUpdatedAction {
  return {
    type: INVALIDATE_LOG_UPDATED,
    id,
  };
}

export function deleteLogRequest(id: number): DeleteLogRequestAction {
  return {
    type: DELETE_LOG_REQUEST,
    id,
  };
}

export function deleteLogSuccess(id: number): DeleteLogSuccessAction {
  return {
    type: DELETE_LOG_SUCCESS,
    id,
  };
}

export function deleteLogFailure(id: number, serverError: string): DeleteLogFailureAction {
  return {
    type: DELETE_LOG_FAILURE,
    id,
    serverError,
  };
}

export function postCommentRequest(logId: number): PostCommentRequestAction {
  return {
    type: POST_COMMENT_REQUEST,
    logId,
  };
}

export function postCommentSuccess(logId: number): PostCommentSuccessAction {
  return {
    type: POST_COMMENT_SUCCESS,
    logId,
  };
}

export function postCommentFailure(logId: number, serverError: string): PostCommentFailureAction {
  return {
    type: POST_COMMENT_FAILURE,
    logId,
    serverError,
  };
}

export function addCommentToFeed(
  logId: number,
  content: string,
  username: string,
  first: string,
  last: string,
  filterBy: string,
  bucket: string,
  page: number,
  index: number
): AddCommentToFeedAction {
  return {
    type: ADD_COMMENT_TO_FEED,
    logId,
    content,
    username,
    first,
    last,
    filterBy,
    bucket,
    page,
    index,
  };
}

export function addComment(
  logId: number,
  content: string,
  username: string,
  first: string,
  last: string
): AddCommentAction {
  return {
    type: ADD_COMMENT,
    logId,
    content,
    username,
    first,
    last,
  };
}

export function getLog(id: number): AppThunk<Promise<void>, LogsState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getLogRequest(id));

    try {
      const response = await api.get(`logs/${id}`);
      const { log, comments } = response.data;

      dispatch(getLogSuccess(id, log, comments));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(getLogFailure(id, serverError));
      }
    }
  };
}

export function logFeed(
  filterBy: string,
  bucket: string,
  limit: number,
  offset: number
): AppThunk<Promise<void>, LogsState> {
  return async function (dispatch: Dispatch): Promise<void> {
    const page = offset / limit + 1;
    dispatch(logFeedRequest(page, filterBy, bucket));

    try {
      const response = await api.get(`log_feed/${filterBy}/${bucket}/${limit}/${offset}`);
      const { logs, next, pages } = response.data;

      dispatch(logFeedSuccess(page, filterBy, bucket, logs, next, pages));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(logFeedFailure(page, filterBy, bucket, serverError));
      }
    }
  };
}

export function postLog(
  username: string,
  first: string,
  last: string,
  name: string,
  location: string,
  date: string,
  type: string,
  distance: number,
  metric: string,
  time: string,
  feel: number,
  description: string
): AppThunk<Promise<number>, LogsState> {
  return async function (dispatch: Dispatch): Promise<number> {
    dispatch(postLogRequest());

    try {
      const response = await api.post('logs/', {
        username,
        first,
        last,
        name,
        location,
        date,
        type,
        distance,
        metric,
        time,
        feel,
        description,
      });

      dispatch(postLogSuccess());

      const { log_id: logId } = response.data.log;
      return logId;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(postLogFailure(serverError));
      }

      return null;
    }
  };
}

export function putLog(
  id: number,
  name: string,
  location: string,
  date: string,
  type: string,
  distance: number,
  metric: string,
  time: string,
  feel: number,
  description: string
): AppThunk<Promise<boolean>, LogsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(putLogRequest(id));

    try {
      const response = await api.put(`logs/${id}`, {
        log_id: id,
        name,
        location,
        date,
        type,
        distance,
        metric,
        time,
        feel,
        description,
      });

      dispatch(putLogSuccess(id));
      const { updated } = response.data;
      return updated;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(putLogFailure(id, serverError));
      }

      return false;
    }
  };
}

export function deleteLog(id: number): AppThunk<Promise<void>, LogsState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(deleteLogRequest(id));

    try {
      await api.delete(`logs/${id}`);

      dispatch(deleteLogSuccess(id));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(deleteLogFailure(id, serverError));
      }
    }
  };
}

export function postComment(
  logId: number,
  username: string,
  first: string,
  last: string,
  content: string
): AppThunk<Promise<boolean>, LogsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(postCommentRequest(logId));

    try {
      const response = await api.post('comments/', {
        username,
        first,
        last,
        log_id: logId,
        content,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      dispatch(postCommentSuccess(logId));
      const { added } = response.data;
      return added;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(postCommentFailure(logId, serverError));
      }

      return false;
    }
  };
}
