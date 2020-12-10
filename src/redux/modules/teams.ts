/**
 * Teams redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 12/9/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Group, Team, TeamState } from '../types';

// Actions
const GET_TEAM_REQUEST = 'saints-xctf-web/teams/GET_TEAM_REQUEST';
const GET_TEAM_SUCCESS = 'saints-xctf-web/teams/GET_TEAM_SUCCESS';
const GET_TEAM_FAILURE = 'saints-xctf-web/teams/GET_TEAM_FAILURE';
const GET_TEAM_GROUPS_REQUEST = 'saints-xctf-web/teams/GET_TEAM_GROUPS_REQUEST';
const GET_TEAM_GROUPS_SUCCESS = 'saints-xctf-web/teams/GET_TEAM_GROUPS_SUCCESS';
const GET_TEAM_GROUPS_FAILURE = 'saints-xctf-web/teams/GET_TEAM_GROUPS_FAILURE';

// Action Types

interface GetTeamRequestAction {
  type: typeof GET_TEAM_REQUEST;
}

interface GetTeamSuccessAction {
  type: typeof GET_TEAM_SUCCESS;
  team: Team;
}

interface GetTeamFailureAction {
  type: typeof GET_TEAM_FAILURE;
  serverError: string;
}

interface GetTeamGroupsRequestAction {
  type: typeof GET_TEAM_GROUPS_REQUEST;
}

interface GetTeamGroupsSuccessAction {
  type: typeof GET_TEAM_GROUPS_SUCCESS;
  groups: Group[];
  team_name: string;
}

interface GetTeamGroupsFailureAction {
  type: typeof GET_TEAM_GROUPS_FAILURE;
  serverError: string;
}

type TeamActionTypes =
  | GetTeamRequestAction
  | GetTeamSuccessAction
  | GetTeamFailureAction
  | GetTeamGroupsRequestAction
  | GetTeamGroupsSuccessAction
  | GetTeamGroupsFailureAction;

// Reducer
const initialState: TeamState = {};

function getTeamRequestReducer(state: TeamState): TeamState {
  return {
    ...state
  };
}

function getTeamSuccessReducer(state: TeamState, action: GetTeamSuccessAction): TeamState {
  return {
    ...state
  };
}

function getTeamFailureReducer(state: TeamState, action: GetTeamFailureAction): TeamState {
  return {
    ...state
  };
}

function getTeamGroupsRequestReducer(state: TeamState): TeamState {
  return {
    ...state
  };
}

function getTeamGroupsSuccessReducer(state: TeamState, action: GetTeamGroupsSuccessAction): TeamState {
  return {
    ...state
  };
}

function getTeamGroupsFailureReducer(state: TeamState, action: GetTeamGroupsFailureAction): TeamState {
  return {
    ...state
  };
}

export default function reducer(state = initialState, action: TeamActionTypes): TeamState {
  switch (action.type) {
    case GET_TEAM_REQUEST:
      return getTeamRequestReducer(state);
    case GET_TEAM_SUCCESS:
      return getTeamSuccessReducer(state, action);
    case GET_TEAM_FAILURE:
      return getTeamFailureReducer(state, action);
    case GET_TEAM_GROUPS_REQUEST:
      return getTeamGroupsRequestReducer(state);
    case GET_TEAM_GROUPS_SUCCESS:
      return getTeamGroupsSuccessReducer(state, action);
    case GET_TEAM_GROUPS_FAILURE:
      return getTeamGroupsFailureReducer(state, action);
    default:
      return state;
  }
}
