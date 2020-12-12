/**
 * Teams redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 12/9/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Group, Team, TeamState } from '../types';
import { Dispatch } from 'redux';

// Actions
const GET_TEAM_REQUEST = 'saints-xctf-web/teams/GET_TEAM_REQUEST';
const GET_TEAM_SUCCESS = 'saints-xctf-web/teams/GET_TEAM_SUCCESS';
const GET_TEAM_FAILURE = 'saints-xctf-web/teams/GET_TEAM_FAILURE';
const GET_TEAM_GROUPS_REQUEST = 'saints-xctf-web/teams/GET_TEAM_GROUPS_REQUEST';
const GET_TEAM_GROUPS_SUCCESS = 'saints-xctf-web/teams/GET_TEAM_GROUPS_SUCCESS';
const GET_TEAM_GROUPS_FAILURE = 'saints-xctf-web/teams/GET_TEAM_GROUPS_FAILURE';
const SEARCH_TEAMS_REQUEST = 'saints-xctf-web/teams/SEARCH_TEAMS_REQUEST';
const SEARCH_TEAMS_SUCCESS = 'saints-xctf-web/teams/SEARCH_TEAMS_SUCCESS';
const SEARCH_TEAMS_FAILURE = 'saints-xctf-web/teams/SEARCH_TEAMS_FAILURE';

// Action Types

interface GetTeamRequestAction {
  type: typeof GET_TEAM_REQUEST;
  teamName: string;
}

interface GetTeamSuccessAction {
  type: typeof GET_TEAM_SUCCESS;
  team: Team;
  teamName: string;
}

interface GetTeamFailureAction {
  type: typeof GET_TEAM_FAILURE;
  serverError: string;
  teamName: string;
}

interface GetTeamGroupsRequestAction {
  type: typeof GET_TEAM_GROUPS_REQUEST;
  teamName: string;
}

interface GetTeamGroupsSuccessAction {
  type: typeof GET_TEAM_GROUPS_SUCCESS;
  groups: Group[];
  teamName: string;
}

interface GetTeamGroupsFailureAction {
  type: typeof GET_TEAM_GROUPS_FAILURE;
  serverError: string;
  teamName: string;
}

type TeamActionTypes =
  | GetTeamRequestAction
  | GetTeamSuccessAction
  | GetTeamFailureAction
  | GetTeamGroupsRequestAction
  | GetTeamGroupsSuccessAction
  | GetTeamGroupsFailureAction;

// Reducer
const initialState: TeamState = {
  team: {}
};

function getTeamRequestReducer(state: TeamState, action: GetTeamRequestAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        isFetching: true,
        lastUpdated: moment().unix(),
        serverError: null
      }
    }
  };
}

function getTeamSuccessReducer(state: TeamState, action: GetTeamSuccessAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: null,
        ...action.team
      }
    }
  };
}

function getTeamFailureReducer(state: TeamState, action: GetTeamFailureAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        isFetching: false,
        lastUpdated: moment().unix(),
        serverError: action.serverError
      }
    }
  };
}

function getTeamGroupsRequestReducer(state: TeamState, action: GetTeamGroupsRequestAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        groups: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getTeamGroupsSuccessReducer(state: TeamState, action: GetTeamGroupsSuccessAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        groups: {
          isFetching: false,
          lastUpdated: moment().unix(),
          items: action.groups
        }
      }
    }
  };
}

function getTeamGroupsFailureReducer(state: TeamState, action: GetTeamGroupsFailureAction): TeamState {
  const existingTeamState = state.team[action.teamName] ?? {};

  return {
    ...state,
    team: {
      [action.teamName]: {
        ...existingTeamState,
        groups: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

export default function reducer(state = initialState, action: TeamActionTypes): TeamState {
  switch (action.type) {
    case GET_TEAM_REQUEST:
      return getTeamRequestReducer(state, action);
    case GET_TEAM_SUCCESS:
      return getTeamSuccessReducer(state, action);
    case GET_TEAM_FAILURE:
      return getTeamFailureReducer(state, action);
    case GET_TEAM_GROUPS_REQUEST:
      return getTeamGroupsRequestReducer(state, action);
    case GET_TEAM_GROUPS_SUCCESS:
      return getTeamGroupsSuccessReducer(state, action);
    case GET_TEAM_GROUPS_FAILURE:
      return getTeamGroupsFailureReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function getTeamRequest(teamName: string): GetTeamRequestAction {
  return {
    type: GET_TEAM_REQUEST,
    teamName
  };
}

export function getTeamSuccess(team: Team, teamName: string): GetTeamSuccessAction {
  return {
    type: GET_TEAM_SUCCESS,
    team,
    teamName
  };
}

export function getTeamFailure(serverError: string, teamName: string): GetTeamFailureAction {
  return {
    type: GET_TEAM_FAILURE,
    serverError,
    teamName
  };
}

export function getTeamGroupsRequest(teamName: string): GetTeamGroupsRequestAction {
  return {
    type: GET_TEAM_GROUPS_REQUEST,
    teamName
  };
}

export function getTeamGroupsSuccess(groups: Group[], teamName: string): GetTeamGroupsSuccessAction {
  return {
    type: GET_TEAM_GROUPS_SUCCESS,
    groups,
    teamName
  };
}

export function getTeamGroupsFailure(serverError: string, teamName: string): GetTeamGroupsFailureAction {
  return {
    type: GET_TEAM_GROUPS_FAILURE,
    serverError,
    teamName
  };
}

export function getTeam(teamName: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getTeamRequest(teamName));

    try {
      const response = await api.get(`teams/${teamName}`);
      const { team } = response.data;

      dispatch(getTeamSuccess(team, teamName));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getTeamFailure(serverError, teamName));
    }
  };
}

export function getTeamGroups(teamName: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getTeamGroupsRequest(teamName));

    try {
      const response = await api.get(`teams/groups/${teamName}`);
      const { team_groups } = response.data;

      dispatch(getTeamGroupsSuccess(team_groups, teamName));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getTeamGroupsFailure(serverError, teamName));
    }
  };
}
