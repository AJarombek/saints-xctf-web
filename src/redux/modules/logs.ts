/**
 * Exercise log redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import { api } from '../../datasources/apiRequest';
import {Log, LogsState} from "../types";

// Actions
const GET_LOGS_REQUEST = 'saints-xctf-web/logs/GET_LOGS_REQUEST';
const GET_LOGS_SUCCESS = 'saints-xctf-web/logs/GET_LOGS_SUCCESS';
const GET_LOGS_FAILURE = 'saints-xctf-web/logs/GET_LOGS_FAILURE';

// Action Types
interface GetLogsRequestAction {
    type: typeof GET_LOGS_REQUEST
}

interface GetLogsSuccessAction {
    type: typeof GET_LOGS_SUCCESS
}

interface GetLogsFailureAction {
    type: typeof GET_LOGS_FAILURE
}

type LogsActionTypes = GetLogsRequestAction | GetLogsSuccessAction | GetLogsFailureAction;

// Reducer
const initialState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: [] as Log[]
};

export default function reducer(state: LogsState = initialState, action: LogsActionTypes) {
    switch (action.type) {
        case GET_LOGS_REQUEST:
            return state;
        case GET_LOGS_SUCCESS:
            return state;
        case GET_LOGS_FAILURE:
            return state;
        default:
            return state;
    }
}

// Action Creators
export function getLogsRequest(): GetLogsRequestAction {
    return {
        type: GET_LOGS_REQUEST
    }
}

export function getLogsSuccess(): GetLogsSuccessAction {
    return {
        type: GET_LOGS_SUCCESS
    }
}

export function getLogsFailure(): GetLogsFailureAction {
    return {
        type: GET_LOGS_FAILURE
    }
}
