/**
 * Range view redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 10/20/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Dispatch } from 'redux';
import {
  RangeViewBuckets,
  RangeViewExerciseType,
  RangeViewExerciseTypeFilters,
  RangeViewFilter,
  RangeViewItem,
  RangeViews,
  RangeViewState
} from '../types';
import { AppThunk } from '../store';
import { AxiosError } from 'axios';

// Actions
const GET_RANGE_VIEW_REQUEST = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_REQUEST';
const GET_RANGE_VIEW_SUCCESS = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_SUCCESS';
const GET_RANGE_VIEW_FAILURE = 'saints-xctf-web/rangeView/GET_RANGE_VIEW_FAILURE';
const REMOVE_USER_RANGE_VIEW = 'saints-xctf-web/rangeView/REMOVE_USER_RANGE_VIEW';

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

interface RemoveUserRangeViewAction {
  type: typeof REMOVE_USER_RANGE_VIEW;
  username: string;
}

type RangeViewActionTypes =
  | GetRangeViewRequestAction
  | GetRangeViewSuccessAction
  | GetRangeViewFailureAction
  | RemoveUserRangeViewAction;

// Reducer
const initialState: RangeViewState = {
  users: {},
  groups: {}
};

function getRangeViewRequestReducer(state: RangeViewState, action: GetRangeViewRequestAction): RangeViewState {
  const buckets = state[action.filterBy as RangeViewFilter] ?? ({} as RangeViewBuckets);
  const exerciseTypes = buckets[action.bucket] ?? ({} as RangeViewExerciseTypeFilters);
  const rangeViews = exerciseTypes[action.exerciseTypes as RangeViewExerciseType] ?? ({} as RangeViews);

  return {
    ...state,
    [action.filterBy]: {
      ...buckets,
      [action.bucket]: {
        ...exerciseTypes,
        [action.exerciseTypes]: {
          ...rangeViews,
          [`${action.start}:${action.end}`]: {
            isFetching: true,
            lastUpdated: moment().unix()
          }
        }
      }
    }
  };
}

function getRangeViewSuccessReducer(state: RangeViewState, action: GetRangeViewSuccessAction): RangeViewState {
  const buckets = state[action.filterBy as RangeViewFilter] ?? ({} as RangeViewBuckets);
  const exerciseTypes = buckets[action.bucket] ?? ({} as RangeViewExerciseTypeFilters);
  const rangeViews = exerciseTypes[action.exerciseTypes as RangeViewExerciseType] ?? ({} as RangeViews);

  return {
    ...state,
    [action.filterBy]: {
      ...buckets,
      [action.bucket]: {
        ...exerciseTypes,
        [action.exerciseTypes]: {
          ...rangeViews,
          [`${action.start}:${action.end}`]: {
            isFetching: false,
            lastUpdated: moment().unix(),
            items: action.items,
            serverError: null
          }
        }
      }
    }
  };
}

function getRangeViewFailureReducer(state: RangeViewState, action: GetRangeViewFailureAction): RangeViewState {
  const buckets = state[action.filterBy as RangeViewFilter] ?? ({} as RangeViewBuckets);
  const exerciseTypes = buckets[action.bucket] ?? ({} as RangeViewExerciseTypeFilters);
  const rangeViews = exerciseTypes[action.exerciseTypes as RangeViewExerciseType] ?? ({} as RangeViews);

  return {
    ...state,
    [action.filterBy]: {
      ...buckets,
      [action.bucket]: {
        ...exerciseTypes,
        [action.exerciseTypes]: {
          ...rangeViews,
          [`${action.start}:${action.end}`]: {
            isFetching: false,
            lastUpdated: moment().unix(),
            items: null,
            serverError: action.serverError
          }
        }
      }
    }
  };
}

function removeUserRangeViewReducer(state: RangeViewState, action: RemoveUserRangeViewAction): RangeViewState {
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {}
    }
  };
}

export default function reducer(state = initialState, action: RangeViewActionTypes): RangeViewState {
  switch (action.type) {
    case GET_RANGE_VIEW_REQUEST:
      return getRangeViewRequestReducer(state, action);
    case GET_RANGE_VIEW_SUCCESS:
      return getRangeViewSuccessReducer(state, action);
    case GET_RANGE_VIEW_FAILURE:
      return getRangeViewFailureReducer(state, action);
    case REMOVE_USER_RANGE_VIEW:
      return removeUserRangeViewReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function getRangeViewRequest(
  filterBy: string,
  bucket: string,
  exerciseTypes: string,
  start: string,
  end: string
): GetRangeViewRequestAction {
  return {
    type: GET_RANGE_VIEW_REQUEST,
    filterBy,
    bucket,
    exerciseTypes,
    start,
    end
  };
}

export function getRangeViewSuccess(
  filterBy: string,
  bucket: string,
  exerciseTypes: string,
  start: string,
  end: string,
  items: RangeViewItem[]
): GetRangeViewSuccessAction {
  return {
    type: GET_RANGE_VIEW_SUCCESS,
    filterBy,
    bucket,
    exerciseTypes,
    start,
    end,
    items
  };
}

export function getRangeViewFailure(
  filterBy: string,
  bucket: string,
  exerciseTypes: string,
  start: string,
  end: string,
  serverError: string
): GetRangeViewFailureAction {
  return {
    type: GET_RANGE_VIEW_FAILURE,
    filterBy,
    bucket,
    exerciseTypes,
    start,
    end,
    serverError
  };
}

export function removeUserRangeView(username: string): RemoveUserRangeViewAction {
  return {
    type: REMOVE_USER_RANGE_VIEW,
    username
  };
}

export function getRangeView(
  filterBy: string,
  bucket: string,
  exerciseTypes: string,
  start: string,
  end: string
): AppThunk<Promise<boolean>, RangeViewState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(getRangeViewRequest(filterBy, bucket, exerciseTypes, start, end));

    if (!exerciseTypes) {
      dispatch(getRangeViewSuccess(filterBy, bucket, exerciseTypes, start, end, []));
      return true;
    }

    try {
      const response = await api.get(`range_view/${filterBy}/${bucket}/${exerciseTypes}/${start}/${end}`);
      const { range_view: rangeView } = response.data;

      dispatch(getRangeViewSuccess(filterBy, bucket, exerciseTypes, start, end, rangeView));
      return true;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(getRangeViewFailure(filterBy, bucket, exerciseTypes, start, end, serverError));
      }

      return false;
    }
  };
}
