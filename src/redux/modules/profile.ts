/**
 * Profile redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 9/9/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import {Dispatch} from "redux";
import {ProfileState, User} from "../types";

// Actions
const GET_USER_REQUEST = 'saints-xctf-web/profile/GET_USER_REQUEST';
const GET_USER_SUCCESS = 'saints-xctf-web/profile/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'saints-xctf-web/profile/GET_USER_FAILURE';

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

type ProfileActionTypes = GetUserRequestAction | GetUserSuccessAction | GetUserFailureAction;

// Reducer
const initialState: ProfileState = {
    user: {}
};

export default function reducer(state = initialState, action : ProfileActionTypes) {
    switch (action.type) {
        case GET_USER_REQUEST:
            return getUserRequestReducer(state, action);
        case GET_USER_SUCCESS:
            return getUserSuccessReducer(state, action);
        case GET_USER_FAILURE:
            return getUserFailureReducer(state, action);
        default:
            return state;
    }
}

function getUserRequestReducer(state: ProfileState, action: GetUserRequestAction): ProfileState {
    return {
        ...state
    }
}

function getUserSuccessReducer(state: ProfileState, action: GetUserSuccessAction): ProfileState {
    return {
        ...state
    }
}

function getUserFailureReducer(state: ProfileState, action: GetUserFailureAction): ProfileState {
    return {
        ...state
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
