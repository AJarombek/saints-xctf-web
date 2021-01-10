/**
 * Groups redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 11/7/2021
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Group, GroupState, MemberDetails, StatsMeta } from '../types';
import { Dispatch } from 'redux';

// Actions
const GET_GROUP_REQUEST = 'saints-xctf-web/groups/GET_GROUP_REQUEST';
const GET_GROUP_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_SUCCESS';
const GET_GROUP_FAILURE = 'saints-xctf-web/groups/GET_GROUP_FAILURE';
const GET_GROUP_MEMBERS_REQUEST = 'saints-xctf-web/groups/GET_GROUP_MEMBERS_REQUEST';
const GET_GROUP_MEMBERS_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_MEMBERS_SUCCESS';
const GET_GROUP_MEMBERS_FAILURE = 'saints-xctf-web/groups/GET_GROUP_MEMBERS_FAILURE';
const GET_GROUP_STATS_REQUEST = 'saints-xctf-web/groups/GET_GROUP_STATS_REQUEST';
const GET_GROUP_STATS_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_STATS_SUCCESS';
const GET_GROUP_STATS_FAILURE = 'saints-xctf-web/groups/GET_GROUP_STATS_FAILURE';

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

interface GetGroupMembersRequestAction {
  type: typeof GET_GROUP_MEMBERS_REQUEST;
  groupId: number;
}

interface GetGroupMembersSuccessAction {
  type: typeof GET_GROUP_MEMBERS_SUCCESS;
  members: MemberDetails[];
  groupId: number;
}

interface GetGroupMembersFailureAction {
  type: typeof GET_GROUP_MEMBERS_FAILURE;
  serverError: string;
  groupId: number;
}

interface GetGroupStatsRequestAction {
  type: typeof GET_GROUP_STATS_REQUEST;
  groupId: number;
}

interface GetGroupStatsSuccessAction {
  type: typeof GET_GROUP_STATS_SUCCESS;
  stats: StatsMeta;
  groupId: number;
}

interface GetGroupStatsFailureAction {
  type: typeof GET_GROUP_STATS_FAILURE;
  serverError: string;
  groupId: number;
}

type GroupActionTypes =
  | GetGroupRequestAction
  | GetGroupSuccessAction
  | GetGroupFailureAction
  | GetGroupMembersRequestAction
  | GetGroupMembersSuccessAction
  | GetGroupMembersFailureAction
  | GetGroupStatsRequestAction
  | GetGroupStatsSuccessAction
  | GetGroupStatsFailureAction;

// Reducer
const initialState: GroupState = {
  group: {},
  members: {},
  stats: {}
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

function getGroupMembersRequestReducer(state: GroupState, action: GetGroupMembersRequestAction): GroupState {
  const existingGroupMembersState = state.members[action.groupId] ?? {};

  return {
    ...state,
    members: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupMembersState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getGroupMembersSuccessReducer(state: GroupState, action: GetGroupMembersSuccessAction): GroupState {
  const existingGroupMembersState = state.group[action.groupId] ?? {};

  return {
    ...state,
    members: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupMembersState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: null,
        items: action.members
      }
    }
  };
}

function getGroupMembersFailureReducer(state: GroupState, action: GetGroupMembersFailureAction): GroupState {
  const existingGroupMembersState = state.group[action.groupId] ?? {};

  return {
    ...state,
    members: {
      ...state.group,
      [action.groupId]: {
        ...existingGroupMembersState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError
      }
    }
  };
}

function getGroupStatsRequestReducer(state: GroupState, action: GetGroupStatsRequestAction): GroupState {
  const existingGroupStatsState = state.stats[action.groupId] ?? {};

  return {
    ...state,
    stats: {
      ...state.stats,
      [action.groupId]: {
        ...existingGroupStatsState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getGroupStatsSuccessReducer(state: GroupState, action: GetGroupStatsSuccessAction): GroupState {
  const existingGroupStatsState = state.stats[action.groupId] ?? {};

  return {
    ...state,
    stats: {
      ...state.stats,
      [action.groupId]: {
        ...existingGroupStatsState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: null,
        ...action.stats
      }
    }
  };
}

function getGroupStatsFailureReducer(state: GroupState, action: GetGroupStatsFailureAction): GroupState {
  const existingGroupStatsState = state.stats[action.groupId] ?? {};

  return {
    ...state,
    stats: {
      ...state.stats,
      [action.groupId]: {
        ...existingGroupStatsState,
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
    case GET_GROUP_MEMBERS_REQUEST:
      return getGroupMembersRequestReducer(state, action);
    case GET_GROUP_MEMBERS_SUCCESS:
      return getGroupMembersSuccessReducer(state, action);
    case GET_GROUP_MEMBERS_FAILURE:
      return getGroupMembersFailureReducer(state, action);
    case GET_GROUP_STATS_REQUEST:
      return getGroupStatsRequestReducer(state, action);
    case GET_GROUP_STATS_SUCCESS:
      return getGroupStatsSuccessReducer(state, action);
    case GET_GROUP_STATS_FAILURE:
      return getGroupStatsFailureReducer(state, action);
    default:
      return state;
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

export function getGroupMembersRequest(groupId: number): GetGroupMembersRequestAction {
  return {
    type: GET_GROUP_MEMBERS_REQUEST,
    groupId
  };
}

export function getGroupMembersSuccess(members: MemberDetails[], groupId: number): GetGroupMembersSuccessAction {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    members,
    groupId
  };
}

export function getGroupMembersFailure(serverError: string, groupId: number): GetGroupMembersFailureAction {
  return {
    type: GET_GROUP_MEMBERS_FAILURE,
    serverError,
    groupId
  };
}

export function getGroupStatsRequest(groupId: number): GetGroupStatsRequestAction {
  return {
    type: GET_GROUP_STATS_REQUEST,
    groupId
  };
}

export function getGroupStatsSuccess(stats: StatsMeta, groupId: number): GetGroupStatsSuccessAction {
  return {
    type: GET_GROUP_STATS_SUCCESS,
    stats,
    groupId
  };
}

export function getGroupStatsFailure(serverError: string, groupId: number): GetGroupStatsFailureAction {
  return {
    type: GET_GROUP_STATS_FAILURE,
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

export function getGroupMembers(groupId: number) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupMembersRequest(groupId));

    try {
      const response = await api.get(`groups/members/${groupId}`);
      const { group_members } = response.data;

      dispatch(getGroupMembersSuccess(group_members, groupId));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getGroupMembersFailure(serverError, groupId));
    }
  };
}

export function getGroupStats(groupId: number) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupStatsRequest(groupId));

    try {
      const response = await api.get(`groups/statistics/${groupId}`);
      const { stats } = response.data;

      dispatch(getGroupStatsSuccess(stats, groupId));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getGroupStatsFailure(serverError, groupId));
    }
  };
}