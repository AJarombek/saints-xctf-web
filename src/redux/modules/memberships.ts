/**
 * Group and team membership redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 8/11/2020
 */

import { api } from '../../datasources/apiRequest';
import { Dispatch } from 'redux';
import { GroupMember, GroupMembers, MembershipsState } from '../types';
import moment from 'moment';

// Actions
const GET_GROUP_MEMBERSHIPS_REQUEST = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_REQUEST';
const GET_GROUP_MEMBERSHIPS_SUCCESS = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_SUCCESS';
const GET_GROUP_MEMBERSHIPS_FAILURE = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_FAILURE';

// Action Types
interface GetGroupMembershipsRequestAction {
  type: typeof GET_GROUP_MEMBERSHIPS_REQUEST;
}

interface GetGroupMembershipsSuccessAction {
  type: typeof GET_GROUP_MEMBERSHIPS_SUCCESS;
  memberships: GroupMember[];
}

interface GetGroupMembershipsFailureAction {
  type: typeof GET_GROUP_MEMBERSHIPS_FAILURE;
  serverError: string;
}

type MembershipsActionTypes =
  | GetGroupMembershipsRequestAction
  | GetGroupMembershipsSuccessAction
  | GetGroupMembershipsFailureAction;

// Reducer
const initialState: MembershipsState = {
  groups: {} as GroupMembers
};

function getGroupMembershipsRequestReducer(
  state: MembershipsState,
  action: GetGroupMembershipsRequestAction
): MembershipsState {
  return {
    ...state,
    groups: {
      isFetching: true,
      lastUpdated: moment().unix(),
      items: []
    }
  };
}

function getGroupMembershipsSuccessReducer(
  state: MembershipsState,
  action: GetGroupMembershipsSuccessAction
): MembershipsState {
  return {
    ...state,
    groups: {
      isFetching: true,
      lastUpdated: moment().unix(),
      items: action.memberships,
      serverError: null
    }
  };
}

function getGroupMembershipsFailureReducer(
  state: MembershipsState,
  action: GetGroupMembershipsFailureAction
): MembershipsState {
  return {
    ...state,
    groups: {
      isFetching: true,
      lastUpdated: moment().unix(),
      items: [],
      serverError: action.serverError
    }
  };
}

export default function reducer(state: MembershipsState = initialState, action: MembershipsActionTypes) {
  switch (action.type) {
    case GET_GROUP_MEMBERSHIPS_REQUEST:
      return getGroupMembershipsRequestReducer(state, action);
    case GET_GROUP_MEMBERSHIPS_SUCCESS:
      return getGroupMembershipsSuccessReducer(state, action);
    case GET_GROUP_MEMBERSHIPS_FAILURE:
      return getGroupMembershipsFailureReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function getGroupMembershipsRequest(): GetGroupMembershipsRequestAction {
  return {
    type: GET_GROUP_MEMBERSHIPS_REQUEST
  };
}

export function getGroupMembershipsSuccess(memberships: GroupMember[]): GetGroupMembershipsSuccessAction {
  return {
    type: GET_GROUP_MEMBERSHIPS_SUCCESS,
    memberships
  };
}

export function getGroupMembershipsFailure(serverError: string): GetGroupMembershipsFailureAction {
  return {
    type: GET_GROUP_MEMBERSHIPS_FAILURE,
    serverError
  };
}

export function getGroupMemberships(username: string) {
  return async function (dispatch: Dispatch) {
    dispatch(getGroupMembershipsRequest());

    try {
      const response = await api.get(`users/groups/${username}`);
      const { groups } = response.data;

      dispatch(getGroupMembershipsSuccess(groups));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';
      dispatch(getGroupMembershipsFailure(serverError));
    }
  };
}
