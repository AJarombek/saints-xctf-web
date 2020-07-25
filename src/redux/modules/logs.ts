/**
 * Exercise log redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import { api } from '../../datasources/apiRequest';
import {Log, LogsState} from "../types";
import {Dispatch} from "redux";

// Actions
const GET_LOG_REQUEST = 'saints-xctf-web/logs/GET_LOG_REQUEST';
const GET_LOG_SUCCESS = 'saints-xctf-web/logs/GET_LOG_SUCCESS';
const GET_LOG_FAILURE = 'saints-xctf-web/logs/GET_LOG_FAILURE';
const LOG_FEED_REQUEST = 'saints-xctf-web/logs/LOG_FEED_REQUEST';
const LOG_FEED_SUCCESS = 'saints-xctf-web/logs/LOG_FEED_SUCCESS';
const LOG_FEED_FAILURE = 'saints-xctf-web/logs/LOG_FEED_FAILURE';

// Action Types
interface GetLogRequestAction {
    type: typeof GET_LOG_REQUEST;
    id: number;
}

interface GetLogSuccessAction {
    type: typeof GET_LOG_SUCCESS;
}

interface GetLogFailureAction {
    type: typeof GET_LOG_FAILURE;
}

interface LogFeedRequestAction {
    type: typeof LOG_FEED_REQUEST;
    filterBy: string;
    bucket: string;
}

interface LogFeedSuccessAction {
    type: typeof LOG_FEED_SUCCESS;
    logs: Log[];
    next: string;
}

interface LogFeedFailureAction {
    type: typeof LOG_FEED_FAILURE;
    serverError: string;
}

type LogsActionTypes =
    GetLogRequestAction |
    GetLogSuccessAction |
    GetLogFailureAction |
    LogFeedRequestAction |
    LogFeedSuccessAction |
    LogFeedFailureAction;

// Reducer
const initialState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: [] as Log[]
};

export default function reducer(state: LogsState = initialState, action: LogsActionTypes) {
    switch (action.type) {
        case LOG_FEED_REQUEST:
            return state;
        case LOG_FEED_SUCCESS:
            return state;
        case LOG_FEED_FAILURE:
            return state;
        case GET_LOG_REQUEST:
            return state;
        case GET_LOG_SUCCESS:
            return state;
        case GET_LOG_FAILURE:
            return state;
        default:
            return state;
    }
}

// Action Creators
export function getLogRequest(id: number): GetLogRequestAction {
    return {
        type: GET_LOG_REQUEST,
        id
    }
}

export function getLogSuccess(): GetLogSuccessAction {
    return {
        type: GET_LOG_SUCCESS
    }
}

export function getLogFailure(): GetLogFailureAction {
    return {
        type: GET_LOG_FAILURE
    }
}

export function logFeedRequest(filterBy: string, bucket: string): LogFeedRequestAction {
    return {
        type: LOG_FEED_REQUEST,
        filterBy,
        bucket
    }
}

export function logFeedSuccess(logs: Log[], next: string): LogFeedSuccessAction {
    return {
        type: LOG_FEED_SUCCESS,
        logs,
        next
    }
}

export function logFeedFailure(serverError: string): LogFeedFailureAction {
    return {
        type: LOG_FEED_FAILURE,
        serverError
    }
}

export function getLog(id: number) {
    return async function (dispatch: Dispatch) {
        dispatch(getLogRequest(id))
    }
}

export function logFeed(filterBy: string, bucket: string, limit: number, offset: number) {
    return async function (dispatch: Dispatch) {
        dispatch(logFeedRequest(filterBy, bucket));

        try {
            const response = await api.get(`log_feed/${filterBy}/${bucket}/${limit}/${offset}`);
            const { logs, next } = response.data;

            dispatch(logFeedSuccess(logs, next));
        } catch (error) {
            const { response } = error;
            const serverError = response?.data?.error ?? 'An unexpected error occurred.';
            dispatch(logFeedFailure(serverError));
        }
    }
}
