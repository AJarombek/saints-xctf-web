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
  groupName: string;
}

interface GetGroupSuccessAction {
  type: typeof GET_GROUP_SUCCESS;
  group: Group;
  groupName: string;
}

interface GetGroupFailureAction {
  type: typeof GET_GROUP_FAILURE;
  serverError: string;
  groupName: string;
}

type GroupActionTypes = GetGroupRequestAction | GetGroupSuccessAction | GetGroupFailureAction;

// Reducer
const initialState: GroupState = {
  group: {}
};

function getGroupRequestReducer(state: GroupState, action: GetGroupRequestAction): GroupState {
  const existingGroupState = state.group[action.groupName] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupName]: {
        ...existingGroupState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getGroupSuccessReducer(state: GroupState, action: GetGroupSuccessAction): GroupState {
  const existingGroupState = state.group[action.groupName] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupName]: {
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
  const existingGroupState = state.group[action.groupName] ?? {};

  return {
    ...state,
    group: {
      ...state.group,
      [action.groupName]: {
        ...existingGroupState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError
      }
    }
  };
}
