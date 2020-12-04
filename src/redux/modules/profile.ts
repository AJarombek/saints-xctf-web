/**
 * Profile redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 9/9/2020
 */

import { api } from '../../datasources/apiRequest';
import moment from 'moment';
import { Dispatch } from 'redux';
import { Flair, ProfileState, TeamMembership, User, UserStats } from '../types';

// Actions
const GET_USER_REQUEST = 'saints-xctf-web/profile/GET_USER_REQUEST';
const GET_USER_SUCCESS = 'saints-xctf-web/profile/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'saints-xctf-web/profile/GET_USER_FAILURE';
const SET_USER = 'saints-xctf-web/profile/SET_USER';
const GET_USER_FLAIR_REQUEST = 'saints-xctf-web/profile/GET_USER_FLAIR_REQUEST';
const GET_USER_FLAIR_SUCCESS = 'saints-xctf-web/profile/GET_USER_FLAIR_SUCCESS';
const GET_USER_FLAIR_FAILURE = 'saints-xctf-web/profile/GET_USER_FLAIR_FAILURE';
const GET_USER_STATS_REQUEST = 'saints-xctf-web/profile/GET_USER_STATS_REQUEST';
const GET_USER_STATS_SUCCESS = 'saints-xctf-web/profile/GET_USER_STATS_SUCCESS';
const GET_USER_STATS_FAILURE = 'saints-xctf-web/profile/GET_USER_STATS_FAILURE';
const POST_PROFILE_PICTURE_REQUEST = 'saints-xctf-web/profile/POST_PROFILE_PICTURE_REQUEST';
const POST_PROFILE_PICTURE_PROGRESS = 'saints-xctf-web/profile/POST_PROFILE_PICTURE_PROGRESS';
const POST_PROFILE_PICTURE_SUCCESS = 'saints-xctf-web/profile/POST_PROFILE_PICTURE_SUCCESS';
const POST_PROFILE_PICTURE_FAILURE = 'saints-xctf-web/profile/POST_PROFILE_PICTURE_FAILURE';
const GET_USER_MEMBERSHIPS_REQUEST = 'saints-xctf-web/profile/GET_USER_MEMBERSHIPS_REQUEST';
const GET_USER_MEMBERSHIPS_SUCCESS = 'saints-xctf-web/profile/GET_USER_MEMBERSHIPS_SUCCESS';
const GET_USER_MEMBERSHIPS_FAILURE = 'saints-xctf-web/profile/GET_USER_MEMBERSHIPS_FAILURE';

// Action Types

interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
  username: string;
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  username: string;
  user: User;
}

interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE;
  username: string;
  serverError: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  user: User;
}

interface GetUserFlairRequestAction {
  type: typeof GET_USER_FLAIR_REQUEST;
  username: string;
}

interface GetUserFlairSuccessAction {
  type: typeof GET_USER_FLAIR_SUCCESS;
  username: string;
  flair: Flair[];
}

interface GetUserFlairFailureAction {
  type: typeof GET_USER_FLAIR_FAILURE;
  username: string;
  serverError: string;
}

interface GetUserStatsRequestAction {
  type: typeof GET_USER_STATS_REQUEST;
  username: string;
}

interface GetUserStatsSuccessAction {
  type: typeof GET_USER_STATS_SUCCESS;
  username: string;
  stats: UserStats[];
}

interface GetUserStatsFailureAction {
  type: typeof GET_USER_STATS_FAILURE;
  username: string;
  serverError: string;
}

interface PostProfilePictureRequestAction {
  type: typeof POST_PROFILE_PICTURE_REQUEST;
}

interface PostProfilePictureProgressAction {
  type: typeof POST_PROFILE_PICTURE_PROGRESS;
  totalSize: number;
  uploadedSize: number;
}

interface PostProfilePictureSuccessAction {
  type: typeof POST_PROFILE_PICTURE_SUCCESS;
}

interface PostProfilePictureFailureAction {
  type: typeof POST_PROFILE_PICTURE_FAILURE;
  serverError: string;
}

interface GetUserMembershipsRequestAction {
  type: typeof GET_USER_MEMBERSHIPS_REQUEST;
  username: string;
}

interface GetUserMembershipsSuccessAction {
  type: typeof GET_USER_MEMBERSHIPS_SUCCESS;
  username: string;
  memberships: TeamMembership[];
}

interface GetUserMembershipsFailureAction {
  type: typeof GET_USER_MEMBERSHIPS_FAILURE;
  username: string;
  serverError: string;
}

type ProfileActionTypes =
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | SetUserAction
  | GetUserFlairRequestAction
  | GetUserFlairSuccessAction
  | GetUserFlairFailureAction
  | GetUserStatsRequestAction
  | GetUserStatsSuccessAction
  | GetUserStatsFailureAction
  | PostProfilePictureRequestAction
  | PostProfilePictureProgressAction
  | PostProfilePictureSuccessAction
  | PostProfilePictureFailureAction
  | GetUserMembershipsRequestAction
  | GetUserMembershipsSuccessAction
  | GetUserMembershipsFailureAction;

// Reducer
const initialState: ProfileState = {
  users: {}
};

function getUserRequestReducer(state: ProfileState, action: GetUserRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getUserSuccessReducer(state: ProfileState, action: GetUserSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: false,
          lastUpdated: moment().unix(),
          ...action.user
        }
      }
    }
  };
}

function getUserFailureReducer(state: ProfileState, action: GetUserFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        user: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

function setUserReducer(state: ProfileState, action: SetUserAction): ProfileState {
  const user = state.users[action.user.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.user.username]: {
        ...user,
        user: {
          ...action.user,
          isFetching: false,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getUserFlairRequestReducer(state: ProfileState, action: GetUserFlairRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getUserFlairSuccessReducer(state: ProfileState, action: GetUserFlairSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: false,
          lastUpdated: moment().unix(),
          items: action.flair
        }
      }
    }
  };
}

function getUserFlairFailureReducer(state: ProfileState, action: GetUserFlairFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        flair: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

function getUserStatsRequestReducer(state: ProfileState, action: GetUserStatsRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        stats: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getUserStatsSuccessReducer(state: ProfileState, action: GetUserStatsSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        stats: {
          isFetching: false,
          lastUpdated: moment().unix(),
          ...action.stats
        }
      }
    }
  };
}

function getUserStatsFailureReducer(state: ProfileState, action: GetUserStatsFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        stats: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

function getUserMembershipsRequestReducer(state: ProfileState, action: GetUserMembershipsRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        memberships: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function getUserMembershipsSuccessReducer(state: ProfileState, action: GetUserMembershipsSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        memberships: {
          isFetching: false,
          lastUpdated: moment().unix(),
          teams: action.memberships
        }
      }
    }
  };
}

function getUserMembershipsFailureReducer(state: ProfileState, action: GetUserMembershipsFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        memberships: {
          isFetching: false,
          lastUpdated: moment().unix(),
          serverError: action.serverError
        }
      }
    }
  };
}

export default function reducer(state = initialState, action: ProfileActionTypes): ProfileState {
  switch (action.type) {
    case GET_USER_REQUEST:
      return getUserRequestReducer(state, action);
    case GET_USER_SUCCESS:
      return getUserSuccessReducer(state, action);
    case GET_USER_FAILURE:
      return getUserFailureReducer(state, action);
    case SET_USER:
      return setUserReducer(state, action);
    case GET_USER_FLAIR_REQUEST:
      return getUserFlairRequestReducer(state, action);
    case GET_USER_FLAIR_SUCCESS:
      return getUserFlairSuccessReducer(state, action);
    case GET_USER_FLAIR_FAILURE:
      return getUserFlairFailureReducer(state, action);
    case GET_USER_STATS_REQUEST:
      return getUserStatsRequestReducer(state, action);
    case GET_USER_STATS_SUCCESS:
      return getUserStatsSuccessReducer(state, action);
    case GET_USER_STATS_FAILURE:
      return getUserStatsFailureReducer(state, action);
    case GET_USER_MEMBERSHIPS_REQUEST:
      return getUserMembershipsRequestReducer(state, action);
    case GET_USER_MEMBERSHIPS_SUCCESS:
      return getUserMembershipsSuccessReducer(state, action);
    case GET_USER_MEMBERSHIPS_FAILURE:
      return getUserMembershipsFailureReducer(state, action);
    default:
      return state;
  }
}

// Action Creators
export function getUserRequest(username: string): GetUserRequestAction {
  return {
    type: GET_USER_REQUEST,
    username
  };
}

export function getUserSuccess(username: string, user: User): GetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    username,
    user
  };
}

export function getUserFailure(username: string, serverError: string): GetUserFailureAction {
  return {
    type: GET_USER_FAILURE,
    username,
    serverError
  };
}

export function setUser(user: User): SetUserAction {
  return {
    type: SET_USER,
    user
  };
}

export function getUserFlairRequest(username: string): GetUserFlairRequestAction {
  return {
    type: GET_USER_FLAIR_REQUEST,
    username
  };
}

export function getUserFlairSuccess(username: string, flair: Flair[]): GetUserFlairSuccessAction {
  return {
    type: GET_USER_FLAIR_SUCCESS,
    username,
    flair
  };
}

export function getUserFlairFailure(username: string, serverError: string): GetUserFlairFailureAction {
  return {
    type: GET_USER_FLAIR_FAILURE,
    username,
    serverError
  };
}

export function getUserStatsRequest(username: string): GetUserStatsRequestAction {
  return {
    type: GET_USER_STATS_REQUEST,
    username
  };
}

export function getUserStatsSuccess(username: string, stats: UserStats[]): GetUserStatsSuccessAction {
  return {
    type: GET_USER_STATS_SUCCESS,
    username,
    stats
  };
}

export function getUserStatsFailure(username: string, serverError: string): GetUserStatsFailureAction {
  return {
    type: GET_USER_STATS_FAILURE,
    username,
    serverError
  };
}

export function getUserMembershipsRequest(username: string): GetUserMembershipsRequestAction {
  return {
    type: GET_USER_MEMBERSHIPS_REQUEST,
    username
  };
}

export function getUserMembershipsSuccess(
  username: string,
  memberships: TeamMembership[]
): GetUserMembershipsSuccessAction {
  return {
    type: GET_USER_MEMBERSHIPS_SUCCESS,
    username,
    memberships
  };
}

export function getUserMembershipsFailure(username: string, serverError: string): GetUserMembershipsFailureAction {
  return {
    type: GET_USER_MEMBERSHIPS_FAILURE,
    username,
    serverError
  };
}

export function getUser(username: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserRequest(username));

    try {
      const response = await api.get(`users/${username}`);
      const { user } = response.data;

      dispatch(getUserSuccess(username, user));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserFailure(username, serverError));
    }
  };
}

export function getUserFlair(username: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserFlairRequest(username));

    try {
      const response = await api.get(`users/flair/${username}`);
      const { flair } = response.data;

      dispatch(getUserFlairSuccess(username, flair));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserFlairFailure(username, serverError));
    }
  };
}

export function getUserStats(username: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserStatsRequest(username));

    try {
      const response = await api.get(`users/statistics/${username}`);
      const { stats } = response.data;

      dispatch(getUserStatsSuccess(username, stats));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserStatsFailure(username, serverError));
    }
  };
}

export function getUserMemberships(username: string) {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserMembershipsRequest(username));

    try {
      const response = await api.get(`users/memberships/${username}`);
      const { memberships } = response.data;

      dispatch(getUserMembershipsSuccess(username, memberships));
    } catch (error) {
      const { response } = error;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      dispatch(getUserMembershipsFailure(username, serverError));
    }
  };
}
