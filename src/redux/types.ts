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
};

export type MembershipsState = {
  groups: GroupMembers;
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

export type TeamState = Record<string, TeamMeta>;

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

export type Users = {
  [key: string]: {
    user?: UserMeta;
    flair?: FlairMeta;
    stats?: UserStatsMeta;
    memberships?: Memberships;
  };
};

export interface UserMeta extends User, Meta {}

export interface User {
  activation_code?: string;
  class_year?: number;
  deleted?: string;
  description?: string;
  email?: string;
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

export type TeamMember = {
  team_name: string;
  title: string;
  status: string;
  user: string;
};

export type GroupMember = {
  group_name: string;
  group_title: string;
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

export interface UserStatsMeta extends UserStats, Meta {}

export type UserStats = {
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
