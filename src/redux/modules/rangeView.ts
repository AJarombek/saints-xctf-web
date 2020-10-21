/**
 * Range view redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 10/20/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import {Dispatch} from "redux";
import {ProfileState, RangeViewItem, RangeViewState} from "../types";

// Actions
const GET_RANGE_VIEW_REQUEST = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_REQUEST';
const GET_RANGE_VIEW_SUCCESS = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_SUCCESS';
const GET_RANGE_VIEW_FAILURE = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_FAILURE';

// Action Types

interface GetRangeViewRequestAction {
    type: typeof GET_RANGE_VIEW_REQUEST;
    filterBy: string;
    bucket: string;
    exerciseTypes: string;
    start: string;
    end: string;
}

interface GetRangeViewSuccessAction {
    type: typeof GET_RANGE_VIEW_SUCCESS;
    filterBy: string;
    bucket: string;
    exerciseTypes: string;
    start: string;
    end: string;
    items: RangeViewItem[];
}

interface GetRangeViewFailureAction {
    type: typeof GET_RANGE_VIEW_FAILURE;
    filterBy: string;
    bucket: string;
    exerciseTypes: string;
    start: string;
    end: string;
    serverError: string;
}

type RangeViewActionTypes = GetRangeViewRequestAction | GetRangeViewSuccessAction | GetRangeViewFailureAction;

// Reducer
const initialState: RangeViewState = {
    users: {},
    groups: {},
};

export default function reducer(state = initialState, action : RangeViewActionTypes) {
    switch (action.type) {
        case GET_RANGE_VIEW_REQUEST:
            return getRangeViewRequestReducer(state, action);
        case GET_RANGE_VIEW_SUCCESS:
            return getRangeViewSuccessReducer(state, action);
        case GET_RANGE_VIEW_FAILURE:
            return getRangeViewFailureReducer(state, action);
        default:
            return state;
    }
}

function getRangeViewRequestReducer(state: RangeViewState, action: GetRangeViewRequestAction): RangeViewState {
    return {

    };
}

function getRangeViewSuccessReducer(state: RangeViewState, action: GetRangeViewSuccessAction): RangeViewState {
    return {

    };
}

function getRangeViewFailureReducer(state: RangeViewState, action: GetRangeViewFailureAction): RangeViewState {
    return {

    };
}
