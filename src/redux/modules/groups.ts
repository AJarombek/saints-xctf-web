/**
 * Groups redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 11/7/2021
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Group, GroupState } from '../types';
import { Dispatch } from 'redux';

// Actions
const GET_GROUP_REQUEST = 'saints-xctf-web/groups/GET_GROUP_REQUEST';
const GET_GROUP_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_SUCCESS';
const GET_GROUP_FAILURE = 'saints-xctf-web/groups/GET_GROUP_FAILURE';

// Action Types

interface GetGroupRequestAction {
  type: typeof GET_GROUP_REQUEST;
  groupId: number;
}

interface GetGroupSuccessAction {
  type: typeof GET_GROUP_SUCCESS;
  group: Group;
  groupId: number;
}

interface GetGroupFailureAction {
  type: typeof GET_GROUP_FAILURE;
  serverError: string;
  groupId: number;
}

type GroupActionTypes = GetGroupRequestAction | GetGroupSuccessAction | GetGroupFailureAction;

// Reducer
const initialState: GroupState = {
  group: {}
};

function getGroupRequestReducer(state: GroupState, action: GetGroupRequestAction): GroupState {
  const existingGroupState = state.group[action.groupId] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getGroupSuccessReducer(state: GroupState, action: GetGroupSuccessAction): GroupState {
  const existingGroupState = state.group[action.groupId] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: null,
        ...action.group
      }
    }
  };
}

function getGroupFailureReducer(state: GroupState, action: GetGroupFailureAction): GroupState {
  const existingGroupState = state.group[action.groupId] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError
      }
    }
  };
}

export default function reducer(state = initialState, action: GroupActionTypes): GroupState {
  switch (action.type) {
    case GET_GROUP_REQUEST:
      return getGroupRequestReducer(state, action);
    case GET_GROUP_SUCCESS:
      return getGroupSuccessReducer(state, action);
    case GET_GROUP_FAILURE:
      return getGroupFailureReducer(state, action);
  }
}

// Action Creators
export function getGroupRequest(groupId: number): GetGroupRequestAction {
  return {
    type: GET_GROUP_REQUEST,
    groupId
  };
}

export function getGroupSuccess(group: Group, groupId: number): GetGroupSuccessAction {
  return {
    type: GET_GROUP_SUCCESS,
    group,
    groupId
  };
}

export function getGroupFailure(serverError: string, groupId: number): GetGroupFailureAction {
  return {
    type: GET_GROUP_FAILURE,
    serverError,
    groupId
  };
}

export function getGroup(groupId: number) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupRequest(groupId));

    try {
      const response = await api.get(`groups/${groupId}`);
      const { group } = response.data;

      dispatch(getGroupSuccess(group, groupId));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getGroupFailure(serverError, groupId));
    }
  };
}
