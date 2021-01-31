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

export default function reducer(state = initialState, action: RangeViewActionTypes): RangeViewState {
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

export function getRangeView(
  filterBy: string,
  bucket: string,
  exerciseTypes: string,
  start: string,
  end: string
): AppThunk<Promise<void>, RangeViewState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getRangeViewRequest(filterBy, bucket, exerciseTypes, start, end));

    try {
      const response = await api.get(`range_view/${filterBy}/${bucket}/${exerciseTypes}/${start}/${end}`);
      const { range_view: rangeView } = response.data;

      dispatch(getRangeViewSuccess(filterBy, bucket, exerciseTypes, start, end, rangeView));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getRangeViewFailure(filterBy, bucket, exerciseTypes, start, end, serverError));
    }
  };
}
