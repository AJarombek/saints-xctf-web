/**
 * Group and team membership redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 8/11/2020
 */

import { api } from '../../datasources/apiRequest';
import { Dispatch } from 'redux';
import { GroupMember, GroupMembers, MembershipsState } from '../types';
import moment from 'moment';
import { AppThunk } from '../store';

// Actions
const GET_GROUP_MEMBERSHIPS_REQUEST = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_REQUEST';
const GET_GROUP_MEMBERSHIPS_SUCCESS = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_SUCCESS';
const GET_GROUP_MEMBERSHIPS_FAILURE = 'saints-xctf-web/memberships/GET_GROUP_MEMBERSHIPS_FAILURE';
const PUT_GROUP_MEMBERSHIP_REQUEST = 'saints-xctf-web/memberships/PUT_GROUP_MEMBERSHIP_REQUEST';
const PUT_GROUP_MEMBERSHIP_SUCCESS = 'saints-xctf-web/memberships/PUT_GROUP_MEMBERSHIP_SUCCESS';
const PUT_GROUP_MEMBERSHIP_FAILURE = 'saints-xctf-web/memberships/PUT_GROUP_MEMBERSHIP_FAILURE';
const DELETE_GROUP_MEMBERSHIP_REQUEST = 'saints-xctf-web/memberships/DELETE_GROUP_MEMBERSHIP_REQUEST';
const DELETE_GROUP_MEMBERSHIP_SUCCESS = 'saints-xctf-web/memberships/DELETE_GROUP_MEMBERSHIP_SUCCESS';
const DELETE_GROUP_MEMBERSHIP_FAILURE = 'saints-xctf-web/memberships/DELETE_GROUP_MEMBERSHIP_FAILURE';

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

interface PutGroupMembershipRequestAction {
  type: typeof PUT_GROUP_MEMBERSHIP_REQUEST;
  groupId: number;
  username: string;
}

interface PutGroupMembershipSuccessAction {
  type: typeof PUT_GROUP_MEMBERSHIP_SUCCESS;
  groupId: number;
  username: string;
}

interface PutGroupMembershipFailureAction {
  type: typeof PUT_GROUP_MEMBERSHIP_FAILURE;
  groupId: number;
  username: string;
  serverError: string;
}

interface DeleteGroupMembershipRequestAction {
  type: typeof DELETE_GROUP_MEMBERSHIP_REQUEST;
  groupId: number;
  username: string;
}

interface DeleteGroupMembershipSuccessAction {
  type: typeof DELETE_GROUP_MEMBERSHIP_SUCCESS;
  groupId: number;
  username: string;
}

interface DeleteGroupMembershipFailureAction {
  type: typeof DELETE_GROUP_MEMBERSHIP_FAILURE;
  groupId: number;
  username: string;
  serverError: string;
}

type MembershipsActionTypes =
  | GetGroupMembershipsRequestAction
  | GetGroupMembershipsSuccessAction
  | GetGroupMembershipsFailureAction
  | PutGroupMembershipRequestAction
  | PutGroupMembershipSuccessAction
  | PutGroupMembershipFailureAction
  | DeleteGroupMembershipRequestAction
  | DeleteGroupMembershipSuccessAction
  | DeleteGroupMembershipFailureAction;

// Reducer
const initialState: MembershipsState = {
  groups: {} as GroupMembers,
  updateMemberships: {},
  deleteMemberships: {}
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
      isFetching: false,
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
      isFetching: false,
      lastUpdated: moment().unix(),
      items: [],
      serverError: action.serverError
    }
  };
}

function putGroupMembershipRequestReducer(
  state: MembershipsState,
  action: PutGroupMembershipRequestAction
): MembershipsState {
  const existingGroupIdState = state.updateMemberships[action.groupId] ?? {};

  return {
    ...state,
    updateMemberships: {
      ...state.updateMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function putGroupMembershipSuccessReducer(
  state: MembershipsState,
  action: PutGroupMembershipSuccessAction
): MembershipsState {
  const existingGroupIdState = state.updateMemberships[action.groupId] ?? {};

  return {
    ...state,
    updateMemberships: {
      ...state.updateMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          updated: true
        }
      }
    }
  };
}

function putGroupMembershipFailureReducer(
  state: MembershipsState,
  action: PutGroupMembershipFailureAction
): MembershipsState {
  const existingGroupIdState = state.updateMemberships[action.groupId] ?? {};

  return {
    ...state,
    updateMemberships: {
      ...state.updateMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          updated: false,
          serverError: action.serverError
        }
      }
    }
  };
}

function deleteGroupMembershipRequestReducer(
  state: MembershipsState,
  action: DeleteGroupMembershipRequestAction
): MembershipsState {
  const existingGroupIdState = state.deleteMemberships[action.groupId] ?? {};

  return {
    ...state,
    deleteMemberships: {
      ...state.deleteMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function deleteGroupMembershipSuccessReducer(
  state: MembershipsState,
  action: DeleteGroupMembershipSuccessAction
): MembershipsState {
  const existingGroupIdState = state.deleteMemberships[action.groupId] ?? {};

  return {
    ...state,
    deleteMemberships: {
      ...state.deleteMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          deleted: true
        }
      }
    }
  };
}

function deleteGroupMembershipFailureReducer(
  state: MembershipsState,
  action: DeleteGroupMembershipFailureAction
): MembershipsState {
  const existingGroupIdState = state.deleteMemberships[action.groupId] ?? {};

  return {
    ...state,
    deleteMemberships: {
      ...state.deleteMemberships,
      [action.groupId]: {
        ...existingGroupIdState,
        [action.username]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          deleted: false,
          serverError: action.serverError
        }
      }
    }
  };
}

export default function reducer(
  state: MembershipsState = initialState,
  action: MembershipsActionTypes
): MembershipsState {
  switch (action.type) {
    case GET_GROUP_MEMBERSHIPS_REQUEST:
      return getGroupMembershipsRequestReducer(state, action);
    case GET_GROUP_MEMBERSHIPS_SUCCESS:
      return getGroupMembershipsSuccessReducer(state, action);
    case GET_GROUP_MEMBERSHIPS_FAILURE:
      return getGroupMembershipsFailureReducer(state, action);
    case PUT_GROUP_MEMBERSHIP_REQUEST:
      return putGroupMembershipRequestReducer(state, action);
    case PUT_GROUP_MEMBERSHIP_SUCCESS:
      return putGroupMembershipSuccessReducer(state, action);
    case PUT_GROUP_MEMBERSHIP_FAILURE:
      return putGroupMembershipFailureReducer(state, action);
    case DELETE_GROUP_MEMBERSHIP_REQUEST:
      return deleteGroupMembershipRequestReducer(state, action);
    case DELETE_GROUP_MEMBERSHIP_SUCCESS:
      return deleteGroupMembershipSuccessReducer(state, action);
    case DELETE_GROUP_MEMBERSHIP_FAILURE:
      return deleteGroupMembershipFailureReducer(state, action);
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

export function putGroupMembershipRequest(groupId: number, username: string): PutGroupMembershipRequestAction {
  return {
    type: PUT_GROUP_MEMBERSHIP_REQUEST,
    groupId,
    username
  };
}

export function putGroupMembershipSuccess(groupId: number, username: string): PutGroupMembershipSuccessAction {
  return {
    type: PUT_GROUP_MEMBERSHIP_SUCCESS,
    groupId,
    username
  };
}

export function putGroupMembershipFailure(
  groupId: number,
  username: string,
  serverError: string
): PutGroupMembershipFailureAction {
  return {
    type: PUT_GROUP_MEMBERSHIP_FAILURE,
    groupId,
    username,
    serverError
  };
}

export function deleteGroupMembershipRequest(groupId: number, username: string): DeleteGroupMembershipRequestAction {
  return {
    type: DELETE_GROUP_MEMBERSHIP_REQUEST,
    groupId,
    username
  };
}

export function deleteGroupMembershipSuccess(groupId: number, username: string): DeleteGroupMembershipSuccessAction {
  return {
    type: DELETE_GROUP_MEMBERSHIP_SUCCESS,
    groupId,
    username
  };
}

export function deleteGroupMembershipFailure(
  groupId: number,
  username: string,
  serverError: string
): DeleteGroupMembershipFailureAction {
  return {
    type: DELETE_GROUP_MEMBERSHIP_FAILURE,
    groupId,
    username,
    serverError
  };
}

export function getGroupMemberships(username: string): AppThunk<Promise<void>, MembershipsState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupMembershipsRequest());

    try {
      const response = await api.get(`users/groups/${username}`);
      const { groups } = response.data;

      dispatch(getGroupMembershipsSuccess(groups));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status !== 403) {
        dispatch(getGroupMembershipsFailure(serverError));
      }
    }
  };
}

export function updateGroupMembership(
  groupMember: { user: string; status: string },
  groupId: number,
  username: string
): AppThunk<Promise<boolean>, MembershipsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(putGroupMembershipRequest(groupId, username));

    try {
      await api.put(`groups/members/${groupId}/${username}`, groupMember);
      dispatch(putGroupMembershipSuccess(groupId, username));
      return true;
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status !== 403) {
        dispatch(putGroupMembershipFailure(groupId, username, serverError));
      }

      return false;
    }
  };
}

export function deleteGroupMembership(groupId: number, username: string): AppThunk<Promise<boolean>, MembershipsState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(deleteGroupMembershipRequest(groupId, username));

    try {
      await api.delete(`groups/members/${groupId}/${username}`);
      dispatch(deleteGroupMembershipSuccess(groupId, username));
      return true;
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response.status !== 403) {
        dispatch(deleteGroupMembershipFailure(groupId, username, serverError));
      }

      return false;
    }
  };
}
