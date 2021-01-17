/**
 * Groups redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 11/7/2021
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Group, GroupState, LeaderboardInterval, LeaderboardItem, MemberDetails, Stats, Team } from '../types';
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
const GET_GROUP_LEADERBOARD_REQUEST = 'saints-xctf-web/groups/GET_GROUP_LEADERBOARD_REQUEST';
const GET_GROUP_LEADERBOARD_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_LEADERBOARD_SUCCESS';
const GET_GROUP_LEADERBOARD_FAILURE = 'saints-xctf-web/groups/GET_GROUP_LEADERBOARD_FAILURE';
const GET_GROUP_TEAM_REQUEST = 'saints-xctf-web/groups/GET_GROUP_TEAM_REQUEST';
const GET_GROUP_TEAM_SUCCESS = 'saints-xctf-web/groups/GET_GROUP_TEAM_SUCCESS';
const GET_GROUP_TEAM_FAILURE = 'saints-xctf-web/groups/GET_GROUP_TEAM_FAILURE';

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
  stats: Stats;
  groupId: number;
}

interface GetGroupStatsFailureAction {
  type: typeof GET_GROUP_STATS_FAILURE;
  serverError: string;
  groupId: number;
}

interface GetGroupLeaderboardRequestAction {
  type: typeof GET_GROUP_LEADERBOARD_REQUEST;
  groupId: number;
  interval?: LeaderboardInterval;
}

interface GetGroupLeaderboardSuccessAction {
  type: typeof GET_GROUP_LEADERBOARD_SUCCESS;
  leaderboardItems: LeaderboardItem[];
  serverWarning: string;
  groupId: number;
  interval?: LeaderboardInterval;
}

interface GetGroupLeaderboardFailureAction {
  type: typeof GET_GROUP_LEADERBOARD_FAILURE;
  serverError: string;
  groupId: number;
  interval?: LeaderboardInterval;
}

interface GetGroupTeamRequestAction {
  type: typeof GET_GROUP_TEAM_REQUEST;
  groupId: number;
}

interface GetGroupTeamSuccessAction {
  type: typeof GET_GROUP_TEAM_SUCCESS;
  team: Team;
  groupId: number;
}

interface GetGroupTeamFailureAction {
  type: typeof GET_GROUP_TEAM_FAILURE;
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
  | GetGroupStatsFailureAction
  | GetGroupLeaderboardRequestAction
  | GetGroupLeaderboardSuccessAction
  | GetGroupLeaderboardFailureAction
  | GetGroupTeamRequestAction
  | GetGroupTeamSuccessAction
  | GetGroupTeamFailureAction;

// Reducer
const initialState: GroupState = {
  group: {},
  members: {},
  stats: {},
  leaderboards: {},
  team: {}
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

function getGroupLeaderboardRequestReducer(state: GroupState, action: GetGroupLeaderboardRequestAction): GroupState {
  const existingLeaderboardStatsState = state.leaderboards[action.groupId] ?? {};

  return {
    ...state,
    leaderboards: {
      ...state.leaderboards,
      [action.groupId]: {
        ...existingLeaderboardStatsState,
        [action.interval]: {
          isFetching: true,
          lastUpdated: moment().unix(),
          serverError: null
        }
      }
    }
  };
}

function getGroupLeaderboardSuccessReducer(state: GroupState, action: GetGroupLeaderboardSuccessAction): GroupState {
  const existingGroupLeaderboardState = state.leaderboards[action.groupId] ?? {};

  return {
    ...state,
    leaderboards: {
      ...state.leaderboards,
      [action.groupId]: {
        ...existingGroupLeaderboardState,
        [action.interval]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: null,
          serverWarning: action.serverWarning,
          items: action.leaderboardItems
        }
      }
    }
  };
}

function getGroupLeaderboardFailureReducer(state: GroupState, action: GetGroupLeaderboardFailureAction): GroupState {
  const existingGroupLeaderboardState = state.leaderboards[action.groupId] ?? {};

  return {
    ...state,
    leaderboards: {
      ...state.leaderboards,
      [action.groupId]: {
        ...existingGroupLeaderboardState,
        [action.interval]: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

function getGroupTeamRequestReducer(state: GroupState, action: GetGroupTeamRequestAction): GroupState {
  const existingGroupTeamState = state.team[action.groupId] ?? {};

  return {
    ...state,
    team: {
      ...state.team,
      [action.groupId]: {
        ...existingGroupTeamState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getGroupTeamSuccessReducer(state: GroupState, action: GetGroupTeamSuccessAction): GroupState {
  const existingGroupTeamState = state.team[action.groupId] ?? {};

  return {
    ...state,
    team: {
      ...state.team,
      [action.groupId]: {
        ...existingGroupTeamState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: null,
        ...action.team
      }
    }
  };
}

function getGroupTeamFailureReducer(state: GroupState, action: GetGroupTeamFailureAction): GroupState {
  const existingGroupTeamState = state.team[action.groupId] ?? {};

  return {
    ...state,
    team: {
      ...state.team,
      [action.groupId]: {
        ...existingGroupTeamState,
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
    case GET_GROUP_LEADERBOARD_REQUEST:
      return getGroupLeaderboardRequestReducer(state, action);
    case GET_GROUP_LEADERBOARD_SUCCESS:
      return getGroupLeaderboardSuccessReducer(state, action);
    case GET_GROUP_LEADERBOARD_FAILURE:
      return getGroupLeaderboardFailureReducer(state, action);
    case GET_GROUP_TEAM_REQUEST:
      return getGroupTeamRequestReducer(state, action);
    case GET_GROUP_TEAM_SUCCESS:
      return getGroupTeamSuccessReducer(state, action);
    case GET_GROUP_TEAM_FAILURE:
      return getGroupTeamFailureReducer(state, action);
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

export function getGroupStatsSuccess(stats: Stats, groupId: number): GetGroupStatsSuccessAction {
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

export function getGroupLeaderboardRequest(
  groupId: number,
  interval: LeaderboardInterval
): GetGroupLeaderboardRequestAction {
  return {
    type: GET_GROUP_LEADERBOARD_REQUEST,
    groupId,
    interval
  };
}

export function getGroupLeaderboardSuccess(
  leaderboardItems: LeaderboardItem[],
  groupId: number,
  interval: LeaderboardInterval,
  serverWarning: string
): GetGroupLeaderboardSuccessAction {
  return {
    type: GET_GROUP_LEADERBOARD_SUCCESS,
    leaderboardItems,
    groupId,
    interval,
    serverWarning
  };
}

export function getGroupLeaderboardFailure(
  serverError: string,
  groupId: number,
  interval: LeaderboardInterval
): GetGroupLeaderboardFailureAction {
  return {
    type: GET_GROUP_LEADERBOARD_FAILURE,
    serverError,
    groupId,
    interval
  };
}

export function getGroupTeamRequest(groupId: number): GetGroupTeamRequestAction {
  return {
    type: GET_GROUP_TEAM_REQUEST,
    groupId
  };
}

export function getGroupTeamSuccess(team: Team, groupId: number): GetGroupTeamSuccessAction {
  return {
    type: GET_GROUP_TEAM_SUCCESS,
    team,
    groupId
  };
}

export function getGroupTeamFailure(serverError: string, groupId: number): GetGroupTeamFailureAction {
  return {
    type: GET_GROUP_TEAM_FAILURE,
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

export function getGroupLeaderboard(groupId: number, interval: LeaderboardInterval = null) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupLeaderboardRequest(groupId, interval));

    try {
      const response = await api.get(`groups/leaderboard/${groupId}${interval === 'all' ? '' : `/${interval}`}`);
      const { leaderboard: leaderboardItems, warning: serverWarning } = response.data;

      dispatch(getGroupLeaderboardSuccess(leaderboardItems, groupId, interval, serverWarning));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred while retrieving the leaderboard.';

      dispatch(getGroupLeaderboardFailure(serverError, groupId, interval));
    }
  };
}

export function getGroupTeam(groupId: number) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getGroupTeamRequest(groupId));

    try {
      const response = await api.get(`groups/team/${groupId}`);
      const { team } = response.data;

      dispatch(getGroupTeamSuccess(team, groupId));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getGroupTeamFailure(serverError, groupId));
    }
  };
}
