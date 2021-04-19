/**
 * Profile redux module which follows the ducks pattern.
 * @author Andrew Jarombek
 * @since 9/9/2020
 */

import { api } from '../../datasources/apiRequest';
import { fn } from '../../datasources/fnRequest';
import moment from 'moment';
import { Dispatch } from 'redux';
import { Flair, ProfileState, TeamGroupMapping, TeamMembership, User, Stats } from '../types';
import { AppThunk } from '../store';
import { AxiosError } from 'axios';

// Actions
const GET_USER_REQUEST = 'saints-xctf-web/profile/GET_USER_REQUEST';
const GET_USER_SUCCESS = 'saints-xctf-web/profile/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'saints-xctf-web/profile/GET_USER_FAILURE';
const PUT_USER_REQUEST = 'saints-xctf-web/profile/PUT_USER_REQUEST';
const PUT_USER_SUCCESS = 'saints-xctf-web/profile/PUT_USER_SUCCESS';
const PUT_USER_FAILURE = 'saints-xctf-web/profile/PUT_USER_FAILURE';
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
const PUT_USER_MEMBERSHIPS_REQUEST = 'saints-xctf-web/profile/PUT_USER_MEMBERSHIPS_REQUEST';
const PUT_USER_MEMBERSHIPS_SUCCESS = 'saints-xctf-web/profile/PUT_USER_MEMBERSHIPS_SUCCESS';
const PUT_USER_MEMBERSHIPS_FAILURE = 'saints-xctf-web/profile/PUT_USER_MEMBERSHIPS_FAILURE';

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

interface PutUserRequestAction {
  type: typeof PUT_USER_REQUEST;
  username: string;
}

interface PutUserSuccessAction {
  type: typeof PUT_USER_SUCCESS;
  username: string;
  user: User;
}

interface PutUserFailureAction {
  type: typeof PUT_USER_FAILURE;
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
  stats: Stats[];
}

interface GetUserStatsFailureAction {
  type: typeof GET_USER_STATS_FAILURE;
  username: string;
  serverError: string;
}

interface PostProfilePictureRequestAction {
  type: typeof POST_PROFILE_PICTURE_REQUEST;
  username: string;
  totalSize: number;
}

interface PostProfilePictureProgressAction {
  type: typeof POST_PROFILE_PICTURE_PROGRESS;
  username: string;
  totalSize: number;
  uploadedSize: number;
}

interface PostProfilePictureSuccessAction {
  type: typeof POST_PROFILE_PICTURE_SUCCESS;
  username: string;
  totalSize: number;
}

interface PostProfilePictureFailureAction {
  type: typeof POST_PROFILE_PICTURE_FAILURE;
  username: string;
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

interface PutUserMembershipsRequestAction {
  type: typeof PUT_USER_MEMBERSHIPS_REQUEST;
  username: string;
}

interface PutUserMembershipsSuccessAction {
  type: typeof PUT_USER_MEMBERSHIPS_SUCCESS;
  username: string;
}

interface PutUserMembershipsFailureAction {
  type: typeof PUT_USER_MEMBERSHIPS_FAILURE;
  username: string;
  serverError: string;
}

type ProfileActionTypes =
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | PutUserRequestAction
  | PutUserSuccessAction
  | PutUserFailureAction
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
  | GetUserMembershipsFailureAction
  | PutUserMembershipsRequestAction
  | PutUserMembershipsSuccessAction
  | PutUserMembershipsFailureAction;

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

function putUserRequestReducer(state: ProfileState, action: PutUserRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updating: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function putUserSuccessReducer(state: ProfileState, action: PutUserSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updating: {
          isFetching: false,
          lastUpdated: moment().unix(),
          updated: true
        },
        user: {
          isFetching: false,
          lastUpdated: moment().unix(),
          ...action.user
        }
      }
    }
  };
}

function putUserFailureReducer(state: ProfileState, action: PutUserFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updating: {
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

function postProfilePictureRequestReducer(state: ProfileState, action: PostProfilePictureRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        uploadingProfilePicture: {
          isFetching: true,
          lastUpdated: moment().unix(),
          uploadedSize: 0,
          totalSize: action.totalSize
        }
      }
    }
  };
}

function postProfilePictureProgressReducer(
  state: ProfileState,
  action: PostProfilePictureProgressAction
): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        uploadingProfilePicture: {
          isFetching: true,
          lastUpdated: moment().unix(),
          uploadedSize: action.uploadedSize,
          totalSize: action.totalSize
        }
      }
    }
  };
}

function postProfilePictureSuccessReducer(state: ProfileState, action: PostProfilePictureSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        uploadingProfilePicture: {
          isFetching: false,
          lastUpdated: moment().unix(),
          uploaded: true,
          uploadedSize: action.totalSize,
          totalSize: action.totalSize
        }
      }
    }
  };
}

function postProfilePictureFailureReducer(state: ProfileState, action: PostProfilePictureFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        uploadingProfilePicture: {
          isFetching: false,
          lastUpdated: moment().unix(),
          uploaded: false,
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

function putUserMembershipsRequestReducer(state: ProfileState, action: PutUserMembershipsRequestAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updateMemberships: {
          isFetching: true,
          lastUpdated: moment().unix()
        }
      }
    }
  };
}

function putUserMembershipsSuccessReducer(state: ProfileState, action: PutUserMembershipsSuccessAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updateMemberships: {
          isFetching: false,
          lastUpdated: moment().unix(),
          updated: true
        }
      }
    }
  };
}

function putUserMembershipsFailureReducer(state: ProfileState, action: PutUserMembershipsFailureAction): ProfileState {
  const user = state.users[action.username] ?? {};
  return {
    ...state,
    users: {
      ...state.users,
      [action.username]: {
        ...user,
        updateMemberships: {
          isFetching: false,
          lastUpdated: moment().unix(),
          updated: false,
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
    case PUT_USER_REQUEST:
      return putUserRequestReducer(state, action);
    case PUT_USER_SUCCESS:
      return putUserSuccessReducer(state, action);
    case PUT_USER_FAILURE:
      return putUserFailureReducer(state, action);
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
    case POST_PROFILE_PICTURE_REQUEST:
      return postProfilePictureRequestReducer(state, action);
    case POST_PROFILE_PICTURE_PROGRESS:
      return postProfilePictureProgressReducer(state, action);
    case POST_PROFILE_PICTURE_SUCCESS:
      return postProfilePictureSuccessReducer(state, action);
    case POST_PROFILE_PICTURE_FAILURE:
      return postProfilePictureFailureReducer(state, action);
    case GET_USER_MEMBERSHIPS_REQUEST:
      return getUserMembershipsRequestReducer(state, action);
    case GET_USER_MEMBERSHIPS_SUCCESS:
      return getUserMembershipsSuccessReducer(state, action);
    case GET_USER_MEMBERSHIPS_FAILURE:
      return getUserMembershipsFailureReducer(state, action);
    case PUT_USER_MEMBERSHIPS_REQUEST:
      return putUserMembershipsRequestReducer(state, action);
    case PUT_USER_MEMBERSHIPS_SUCCESS:
      return putUserMembershipsSuccessReducer(state, action);
    case PUT_USER_MEMBERSHIPS_FAILURE:
      return putUserMembershipsFailureReducer(state, action);
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

export function putUserRequest(username: string): PutUserRequestAction {
  return {
    type: PUT_USER_REQUEST,
    username
  };
}

export function putUserSuccess(username: string, user: User): PutUserSuccessAction {
  return {
    type: PUT_USER_SUCCESS,
    username,
    user
  };
}

export function putUserFailure(username: string, serverError: string): PutUserFailureAction {
  return {
    type: PUT_USER_FAILURE,
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

export function getUserStatsSuccess(username: string, stats: Stats[]): GetUserStatsSuccessAction {
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

export function postProfilePictureRequest(username: string, totalSize: number): PostProfilePictureRequestAction {
  return {
    type: POST_PROFILE_PICTURE_REQUEST,
    username,
    totalSize
  };
}

export function postProfilePictureProgress(
  username: string,
  totalSize: number,
  uploadedSize: number
): PostProfilePictureProgressAction {
  return {
    type: POST_PROFILE_PICTURE_PROGRESS,
    username,
    totalSize,
    uploadedSize
  };
}

export function postProfilePictureSuccess(username: string, totalSize: number): PostProfilePictureSuccessAction {
  return {
    type: POST_PROFILE_PICTURE_SUCCESS,
    username,
    totalSize
  };
}

export function postProfilePictureFailure(username: string, serverError: string): PostProfilePictureFailureAction {
  return {
    type: POST_PROFILE_PICTURE_FAILURE,
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

export function putUserMembershipsRequest(username: string): PutUserMembershipsRequestAction {
  return {
    type: PUT_USER_MEMBERSHIPS_REQUEST,
    username
  };
}

export function putUserMembershipsSuccess(username: string): PutUserMembershipsSuccessAction {
  return {
    type: PUT_USER_MEMBERSHIPS_SUCCESS,
    username
  };
}

export function putUserMembershipsFailure(username: string, serverError: string): PutUserMembershipsFailureAction {
  return {
    type: PUT_USER_MEMBERSHIPS_FAILURE,
    username,
    serverError
  };
}

export function getUser(username: string): AppThunk<Promise<void>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserRequest(username));

    try {
      const response = await api.get(`users/${username}`);
      const { user } = response.data;

      dispatch(getUserSuccess(username, user));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(getUserFailure(username, serverError));
      }
    }
  };
}

export function putUser(user: User): AppThunk<Promise<User>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<User> {
    dispatch(putUserRequest(user.username));

    try {
      const response = await api.put(`users/${user.username}`, user);
      const { user: updatedUser } = response.data;

      dispatch(putUserSuccess(user.username, updatedUser));

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...updatedUser,
          password: null,
          salt: null
        })
      );

      return updatedUser;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(putUserFailure(user.username, serverError));
      }

      return null;
    }
  };
}

export function getUserFlair(username: string): AppThunk<Promise<void>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserFlairRequest(username));

    try {
      const response = await api.get(`users/flair/${username}`);
      const { flair } = response.data;

      dispatch(getUserFlairSuccess(username, flair));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(getUserFlairFailure(username, serverError));
      }
    }
  };
}

export function getUserStats(username: string): AppThunk<Promise<void>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch(getUserStatsRequest(username));

    try {
      const response = await api.get(`users/statistics/${username}`);
      const { stats } = response.data;

      dispatch(getUserStatsSuccess(username, stats));
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred retrieving user statistics.';

      if (response?.status !== 403) {
        dispatch(getUserStatsFailure(username, serverError));
      }
    }
  };
}

const toBase64 = (file: File): Promise<string | ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result);
    reader.onerror = (error): void => reject(error);
  });

export function uploadProfilePicture(username: string, file: File): AppThunk<Promise<boolean>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(postProfilePictureRequest(username, file.size));

    try {
      const data = {
        base64Image: await toBase64(file),
        fileName: file.name,
        username
      };

      const response = await fn.post('/uasset/user', data);
      const { result } = response.data;

      dispatch(postProfilePictureSuccess(username, file.size));
      return result;
    } catch (error) {
      const serverError = 'An unexpected error occurred.';

      dispatch(postProfilePictureFailure(username, serverError));
      return false;
    }
  };
}

export function getUserMemberships(username: string): AppThunk<Promise<TeamMembership[]>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<TeamMembership[]> {
    dispatch(getUserMembershipsRequest(username));

    try {
      const response = await api.get(`users/memberships/${username}`);
      const { memberships } = response.data;

      dispatch(getUserMembershipsSuccess(username, memberships));
      return memberships;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(getUserMembershipsFailure(username, serverError));
      }

      return null;
    }
  };
}

export function updateUserMemberships(
  username: string,
  teamsJoined: string[],
  teamsLeft: string[],
  groupsJoined: TeamGroupMapping[],
  groupsLeft: TeamGroupMapping[]
): AppThunk<Promise<boolean>, ProfileState> {
  return async function (dispatch: Dispatch): Promise<boolean> {
    dispatch(putUserMembershipsRequest(username));

    try {
      const response = await api.put(`users/memberships/${username}`, {
        teams_joined: teamsJoined,
        teams_left: teamsLeft,
        groups_joined: groupsJoined,
        groups_left: groupsLeft
      });

      dispatch(putUserMembershipsSuccess(username));
      return response.data.updated;
    } catch (error) {
      const { response } = error as AxiosError;
      const serverError = response?.data?.error ?? 'An unexpected error occurred.';

      if (response?.status !== 403) {
        dispatch(putUserMembershipsFailure(username, serverError));
      }
      return false;
    }
  };
}
