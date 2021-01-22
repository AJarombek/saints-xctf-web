/**
 * Types for the Redux store.
 * @author Andrew Jarombek
 * @since 7/23/2020
 */

import moment from 'moment';

export type RootState = {
  auth: AuthState;
  logs: LogsState;
  memberships: MembershipsState;
  notifications: NotificationsState;
  profile: ProfileState;
  rangeView: RangeViewState;
  registration: RegistrationState;
  teams: TeamState;
  groups: GroupState;
};

export type LogsState = {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated: number;
  items: Logs;
  feeds: LogFeeds;
  newLog: NewLog;
  updateLogs: UpdateLogs;
  deletedLogs: DeletedLogs;
  newComments: NewComments;
};

export type AuthState = {
  auth: Auth;
  user: Users;
  createActivationCode: CreateActivationCodes;
};

export type MembershipsState = {
  groups: GroupMembers;
  updateMemberships: UpdateGroupMemberships;
  deleteMemberships: DeleteGroupMemberships;
};

export type NotificationsState = {
  isFetching?: boolean;
  lastUpdated?: number;
  serverError?: string;
  items?: Notification[];
};

export type ProfileState = {
  users?: Users;
};

export type RegistrationState = {
  isFetching?: boolean;
  lastUpdated?: number;
  serverError?: string;
  stage?: number;
  valid?: boolean;
  status?: string;
  first?: string;
  last?: string;
  email?: string;
  username?: string;
  password?: string;
  activation_code?: string;
  teams?: TeamRegistration;
};

export type RangeViewState = Record<RangeViewFilter, RangeViewBuckets>;

export type GroupState = {
  group: Record<string, GroupMeta>;
  members: Record<string, MemberDetailsMeta>;
  stats: Record<string, StatsMeta>;
  leaderboards: Record<string, Leaderboards>;
  team: Record<string, TeamMeta>;
};

export type TeamState = {
  team: Record<string, TeamMeta>;
  search: Record<string, TeamsInfo>;
};

export interface Meta {
  isFetching?: boolean;
  lastUpdated?: number;
  didInvalidate?: boolean;
  serverError?: string;
}

export type Auth = {
  isFetching?: boolean;
  lastUpdated?: number;
  signedInUser?: string;
  status?: string;
};

export type CreateActivationCodes = Record<string, CreateActivationCode>;

export interface CreateActivationCode extends Meta {
  created?: boolean;
}

export type Users = {
  [key: string]: {
    user?: UserMeta;
    flair?: FlairMeta;
    stats?: StatsMeta;
    memberships?: Memberships;
    updateMemberships?: UpdateMemberships;
    updating?: UpdateUser;
    uploadingProfilePicture?: UploadingProfilePicture;
  };
};

export interface UserMeta extends User, Meta {}

export interface User {
  activation_code?: string;
  class_year?: number;
  deleted?: string;
  description?: string;
  email?: string;
  profilepic_name?: string;
  favorite_event?: string;
  first?: string;
  last?: string;
  last_signin?: string;
  location?: string;
  member_since?: string;
  password?: string;
  salt?: string;
  subscribed?: string;
  username?: string;
  week_start?: string;
}

export interface UpdateUser extends Meta {
  updated?: boolean;
}

export interface UploadingProfilePicture extends Meta {
  uploaded?: boolean;
  uploadedSize?: number;
  totalSize?: number;
}

enum LogType {
  RUN = 'run',
  BIKE = 'bike',
  SWIM = 'swim',
  OTHER = 'other'
}
enum Metric {
  MILES = 'miles',
  KILOMETERS = 'kilometers',
  METERS = 'meters'
}

export type Log = {
  log_id?: number;
  username?: string;
  first?: string;
  last?: string;
  name?: string;
  date?: string;
  type?: LogType;
  distance?: number;
  metric?: Metric;
  miles?: number;
  time?: string;
  pace?: string;
  feel?: number;
  location?: string;
  description?: string;
  time_created?: string;
  comments?: Comment[];
};

export type Logs = {
  [key: string]: LogMeta;
};

export interface LogMeta extends Log, Meta {}

export type LogFeeds = {
  [key: string]: {
    filterBy: string;
    bucket: string;
    pages: LogFeedPages;
  };
};

export type LogFeedPages = {
  [key: string]: LogFeedPage;
};

export type LogFeedPage = {
  isFetching: boolean;
  lastUpdated: number;
  items: Log[];
  pages: number;
  serverError: string;
};

export type Comment = {
  comment_id: number;
  username: string;
  first: string;
  last: string;
  log_id: number;
  time: string;
  content: string;
};

export type NewLog = {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  created?: boolean;
  serverError?: string;
};

// I hope you are having a fun holiday weekend.
// Make sure to tell yourself that you are wonderful and kind.
export type UpdateLogs = {
  [key: string]: UpdateLog;
};

export type UpdateLog = {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  updated?: boolean;
  serverError?: string;
};

export type DeletedLogs = {
  [key: string]: DeletedLog;
};

export type DeletedLog = {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  deleted?: boolean;
  serverError?: string;
};

export type NewComments = {
  [key: string]: {
    isFetching: boolean;
    lastUpdated: number;
    created?: boolean;
    serverError?: string;
  };
};

export interface Memberships extends Meta {
  teams?: TeamMembership[];
}

export interface UpdateMemberships extends Meta {
  updated?: boolean;
}

export interface TeamMembership extends TeamMember {
  groups?: GroupMember[];
}

export type Team = {
  name?: string;
  title?: string;
  picture_name?: string;
  description?: string;
  week_start?: string;
};

export interface TeamMeta extends Team, Meta {
  groups?: Groups;
}

export type TeamInfo = {
  name?: string;
  title?: string;
};

export type TeamsInfo = {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items?: TeamInfo[];
};

export type Group = {
  id?: number;
  group_name?: string;
  group_title?: string;
  grouppic_name?: string;
  description?: string;
  week_start?: string;
};

export type Groups = {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items?: GroupMeta[];
};

export interface GroupMeta extends Group, Meta {}

export type TeamGroupMapping = {
  team_name: string;
  group_name: string;
};

export type TeamMember = {
  team_name: string;
  title: string;
  status: string;
  user: string;
};

export type GroupMember = {
  group_name: string;
  group_title: string;
  group_id: number;
  newest_log?: string;
  newest_message?: string;
  status: string;
  user: string;
};

export type GroupMembers = {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items: GroupMember[];
};

export type UpdateGroupMemberships = Record<string, Record<string, UpdateGroupMembership>>;

export interface UpdateGroupMembership extends Meta {
  updated?: boolean;
}

export type DeleteGroupMemberships = Record<string, Record<string, DeleteGroupMembership>>;

export interface DeleteGroupMembership extends Meta {
  deleted?: boolean;
}

export interface MemberDetailsMeta extends Meta {
  items?: MemberDetails[];
}

export type MemberDetails = {
  username: string;
  first: string;
  last: string;
  member_since: string;
  user: string;
  status: string;
};

export type Notification = {
  notification_id: number;
  username: string;
  time: string;
  link?: string;
  viewed: string;
  description?: string;
};

export interface FlairMeta extends Flairs, Meta {}

export type Flairs = {
  items?: Flair[];
};

export type Flair = {
  flair?: string;
  flair_id?: number;
  username?: string;
};

export interface StatsMeta extends Stats, Meta {}

export type Stats = {
  miles_all_time?: number;
  miles_past_year?: number;
  miles_past_month?: number;
  miles_past_week?: number;
  run_miles_all_time?: number;
  run_miles_past_year?: number;
  run_miles_past_month?: number;
  run_miles_past_week?: number;
  feel_all_time?: number;
  feel_past_year?: number;
  feel_past_month?: number;
  feel_past_week?: number;
};

export type LeaderboardInterval = 'all' | 'year' | 'month' | 'week';

export type Leaderboards = {
  all?: LeaderboardItemMeta;
  year?: LeaderboardItemMeta;
  month?: LeaderboardItemMeta;
  week?: LeaderboardItemMeta;
};

export interface LeaderboardItemMeta extends Meta {
  items: LeaderboardItem[];
  serverWarning: string;
}

export type LeaderboardItem = {
  username: string;
  first: string;
  last: string;
  miles: number;
  miles_run: number;
  miles_biked: number;
  miles_swam: number;
  miles_other: number;
};

export type RangeViewFilter = 'users' | 'groups';

export type RangeViewExerciseType =
  | 'r'
  | 'b'
  | 's'
  | 'o'
  | 'rb'
  | 'rs'
  | 'ro'
  | 'bs'
  | 'bo'
  | 'so'
  | 'rbs'
  | 'rbo'
  | 'rso'
  | 'bso'
  | 'rbso';

export type RangeViewBuckets = Record<string, RangeViewExerciseTypeFilters>;
export type RangeViewExerciseTypeFilters = Record<RangeViewExerciseType, RangeViews>;

export type RangeViews = {
  [key: string]: RangeViewItemsMeta;
};

export interface RangeViewItemsMeta extends RangeViewItems, Meta {}

export type RangeViewItems = {
  items?: RangeViewItem[];
};

export type RangeViewItem = {
  date: string;
  feel: number;
  miles: number;
};

export type RangeViewItemMoment = {
  date: moment.Moment;
  feel: number;
  miles: number;
};

export type TeamRegistration = {
  [key: string]: {
    status: string;
    groups: GroupRegistration;
  };
};

export type GroupRegistration = {
  [key: string]: {
    status: string;
  };
};

export type ExerciseFilters = {
  run: boolean;
  bike: boolean;
  swim: boolean;
  other: boolean;
};
