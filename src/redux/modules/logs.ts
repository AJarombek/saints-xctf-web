/**
 * Exercise log redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import { api } from '../../datasources/apiRequest';
import {Comment, Log, LogFeedPage, LogFeeds, Logs, LogsState, NewComments} from "../types";
import {Dispatch} from "redux";
import moment from "moment";

// Actions
const GET_LOG_REQUEST = 'saints-xctf-web/logs/GET_LOG_REQUEST';
const GET_LOG_SUCCESS = 'saints-xctf-web/logs/GET_LOG_SUCCESS';
const GET_LOG_FAILURE = 'saints-xctf-web/logs/GET_LOG_FAILURE';
const LOG_FEED_REQUEST = 'saints-xctf-web/logs/LOG_FEED_REQUEST';
const LOG_FEED_SUCCESS = 'saints-xctf-web/logs/LOG_FEED_SUCCESS';
const LOG_FEED_FAILURE = 'saints-xctf-web/logs/LOG_FEED_FAILURE';
const POST_COMMENT_REQUEST = 'saints-xctf-web/logs/POST_COMMENT_REQUEST';
const POST_COMMENT_SUCCESS = 'saints-xctf-web/logs/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'saints-xctf-web/logs/POST_COMMENT_FAILURE';
const ADD_COMMENT = 'saints-xctf-web/logs/ADD_COMMENT';

// Action Types
interface GetLogRequestAction {
    type: typeof GET_LOG_REQUEST;
    id: number;
}

interface GetLogSuccessAction {
    type: typeof GET_LOG_SUCCESS;
    log: Log;
    comments: Comment[];
}

interface GetLogFailureAction {
    type: typeof GET_LOG_FAILURE;
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
}

interface LogFeedFailureAction {
    type: typeof LOG_FEED_FAILURE;
    filterBy: string;
    bucket: string;
    serverError: string;
    page: number;
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
    filterBy: string;
    bucket: string;
    page: number;
    index: number;
}

type LogsActionTypes =
    GetLogRequestAction |
    GetLogSuccessAction |
    GetLogFailureAction |
    LogFeedRequestAction |
    LogFeedSuccessAction |
    LogFeedFailureAction |
    PostCommentRequestAction |
    PostCommentSuccessAction |
    PostCommentFailureAction |
    AddCommentAction;

// Reducer
const initialState: LogsState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: {} as Logs,
    feeds: {} as LogFeeds,
    newComments: {} as NewComments
};

export default function reducer(state: LogsState = initialState, action: LogsActionTypes) {
    switch (action.type) {
        case LOG_FEED_REQUEST:
            return logFeedRequestReducer(state, action);
        case LOG_FEED_SUCCESS:
            return logFeedSuccessReducer(state, action);
        case LOG_FEED_FAILURE:
            return logFeedFailureReducer(state, action);
        case GET_LOG_REQUEST:
            return state;
        case GET_LOG_SUCCESS:
            return state;
        case GET_LOG_FAILURE:
            return state;
        case POST_COMMENT_REQUEST:
            return postCommentRequestReducer(state, action);
        case POST_COMMENT_SUCCESS:
            return postCommentSuccessReducer(state, action);
        case POST_COMMENT_FAILURE:
            return postCommentFailureReducer(state, action);
        case ADD_COMMENT:
            return addCommentReducer(state, action);
        default:
            return state;
    }
}

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
                    }
                }
            }
        }
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
                        serverError: null
                    }
                }
            }
        }
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
                        serverError: action.serverError
                    }
                }
            }
        }
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
            }
        }
    }
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
                error: null
            }
        }
    }
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
                serverError: action.serverError
            }
        }
    }
}

function addCommentReducer(state: LogsState, action: AddCommentAction): LogsState {
    const feedName = `${action.filterBy}-${action.bucket}`;
    const existingPages = state.feeds[feedName]?.pages ?? {};
    const existingPage = existingPages[action.page] ?? {} as LogFeedPage;

    const newItems = [ ...existingPage.items];
    newItems[action.index].comments.push({
        comment_id: -1,
        username: action.username,
        first: action.first,
        last: action.last,
        log_id: action.logId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        content: action.content
    });

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
                        items: newItems
                    }
                }
            }
        }
    };
}

// Action Creators
export function getLogRequest(id: number): GetLogRequestAction {
    return {
        type: GET_LOG_REQUEST,
        id
    }
}

export function getLogSuccess(log: Log, comments: Comment[]): GetLogSuccessAction {
    return {
        type: GET_LOG_SUCCESS,
        log,
        comments
    }
}

export function getLogFailure(serverError: string): GetLogFailureAction {
    return {
        type: GET_LOG_FAILURE,
        serverError
    }
}

export function logFeedRequest(page: number, filterBy: string, bucket: string): LogFeedRequestAction {
    return {
        type: LOG_FEED_REQUEST,
        filterBy,
        bucket,
        page
    }
}

export function logFeedSuccess(page: number, filterBy: string, bucket: string, logs: Log[],
                               next: string): LogFeedSuccessAction {
    return {
        type: LOG_FEED_SUCCESS,
        filterBy,
        bucket,
        logs,
        next,
        page
    }
}

export function logFeedFailure(page: number, filterBy: string, bucket: string,
                               serverError: string): LogFeedFailureAction {
    return {
        type: LOG_FEED_FAILURE,
        filterBy,
        bucket,
        serverError,
        page
    }
}

export function postCommentRequest(logId: number) {
    return {
        type: POST_COMMENT_REQUEST,
        logId
    }
}

export function postCommentSuccess(logId: number) {
    return {
        type: POST_COMMENT_SUCCESS,
        logId
    }
}

export function postCommentFailure(logId: number, serverError: string) {
    return {
        type: POST_COMMENT_FAILURE,
        logId,
        serverError
    }
}

export function addComment(
    logId: number,
    content: string,
    username: string,
    first: string,
    last: string,
    filterBy: string,
    bucket: string,
    page: number,
    index: number
) {
    return {
        type: ADD_COMMENT,
        logId,
        content,
        username,
        first,
        last,
        filterBy,
        bucket,
        page,
        index
    }
}

export function getLog(id: number) {
    return async function (dispatch: Dispatch) {
        dispatch(getLogRequest(id));

        try {
            const response = await api.get(`logs/${id}`);
            const { log, comments } = response.data;

            dispatch(getLogSuccess(log, comments));
        } catch (error) {
            const { response } = error;
            const serverError = response?.data?.error ?? 'An unexpected error occurred.';
            dispatch(getLogFailure(serverError));
        }
    }
}

export function logFeed(filterBy: string, bucket: string, limit: number, offset: number) {
    return async function (dispatch: Dispatch) {
        const page = (offset / limit) + 1;
        dispatch(logFeedRequest(page, filterBy, bucket));

        try {
            const response = await api.get(`log_feed/${filterBy}/${bucket}/${limit}/${offset}`);
            const { logs, next } = response.data;

            dispatch(logFeedSuccess(page, filterBy, bucket, logs, next));
        } catch (error) {
            const { response } = error;
            const serverError = response?.data?.error ?? 'An unexpected error occurred.';
            dispatch(logFeedFailure(page, filterBy, bucket, serverError));
        }
    }
}

export function postComment(logId: number, username: string, first: string, last: string, content: string) {
    return async function (dispatch: Dispatch) {
        dispatch(postCommentRequest(logId));

        try {
            await api.post(`comments/`, {
                username,
                first,
                last,
                log_id: logId,
                content,
                time: moment().format("YYYY-MM-DD HH:mm:ss")
            });

            dispatch(postCommentSuccess(logId));
        } catch (error) {
            const { response } = error;
            const serverError = response?.data?.error ?? 'An unexpected error occurred.';
            dispatch(postCommentFailure(logId, serverError));
        }
    }
}
