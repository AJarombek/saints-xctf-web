/**
 * Types for the Redux store.
 * @author Andrew Jarombek
 * @since 7/23/2020
 */

import moment from 'moment';

export interface RootState {
  auth: AuthState;
  logs: LogsState;
  memberships: MembershipsState;
  notifications: NotificationsState;
  profile: ProfileState;
  rangeView: RangeViewState;
  registration: RegistrationState;
  teams: TeamState;
  groups: GroupState;
}

export interface LogsState {
  isFetching?: boolean;
  didInvalidate?: boolean;
  lastUpdated?: number;
  items: Logs;
  feeds: LogFeeds;
  newLog: NewLog;
  updateLogs: UpdateLogs;
  deletedLogs: DeletedLogs;
  newComments: NewComments;
}

export interface AuthState {
  auth: Auth;
  user: Users;
  createActivationCode: CreateActivationCodes;
  emailActivationCode: EmailActivationCodes;
  createForgotPasswordCode: CreateForgotPasswordCodes;
  validateForgotPasswordCode: ValidateForgotPasswordCodes;
  changePassword: ChangePassword;
}

export interface MembershipsState {
  groups: GroupMembers;
  updateMemberships: UpdateGroupMemberships;
  deleteMemberships: DeleteGroupMemberships;
}

export interface NotificationsState {
  isFetching?: boolean;
  lastUpdated?: number;
  serverError?: string;
  items?: Notification[];
  newNotification: NewNotification;
  updateNotifications: UpdateNotifications;
}

export interface ProfileState {
  users?: Users;
}

export interface RegistrationState {
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
  welcomeEmail?: WelcomeEmail;
}

export type RangeViewState = Record<RangeViewFilter, RangeViewBuckets>;

export interface GroupState {
  group: Record<string, GroupMeta>;
  members: Record<string, MemberDetailsMeta>;
  stats: Record<string, StatsMeta>;
  leaderboards: Record<string, Leaderboards>;
  team: Record<string, TeamMeta>;
  uploadingGroupPicture: Record<string, UploadingGroupPicture>;
  updating: Record<string, UpdateGroup>;
}

export interface TeamState {
  team: Record<string, TeamMeta>;
  search: Record<string, TeamsInfo>;
}

export interface Meta {
  isFetching?: boolean;
  lastUpdated?: number;
  didInvalidate?: boolean;
  serverError?: string;
}

export interface Auth {
  isFetching?: boolean;
  lastUpdated?: number;
  signedInUser?: string;
  status?: string;
}

export type CreateActivationCodes = Record<string, CreateActivationCode>;

export interface CreateActivationCode extends Meta {
  created?: boolean;
}

export type EmailActivationCodes = Record<string, EmailActivationCode>;

export interface EmailActivationCode extends Meta {
  emailed?: boolean;
  code: string;
}

export type CreateForgotPasswordCodes = Record<string, CreateForgotPasswordCode>;

export interface CreateForgotPasswordCode extends Meta {
  created?: boolean;
}

export type ValidateForgotPasswordCodes = Record<string, ValidateForgotPasswordCode>;

export interface ValidateForgotPasswordCode extends Meta {
  isValid?: boolean;
  username?: string;
}

export interface ChangePassword extends Meta {
  username?: string;
  changed?: boolean;
}

export interface WelcomeEmail extends Meta {
  emailed?: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Users {
  [key: string]: UserDetails;
}

export interface UserDetails {
  user?: UserMeta;
  flair?: FlairMeta;
  stats?: StatsMeta;
  memberships?: Memberships;
  updateMemberships?: UpdateMemberships;
  updating?: UpdateUser;
  uploadingProfilePicture?: UploadingProfilePicture;
}

export interface UserMeta extends User, Meta {}

export interface User {
  activation_code?: string;
  class_year?: number;
  deleted?: boolean;
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

export interface UpdateGroup extends Meta {
  updated?: boolean;
}

export interface UploadingProfilePicture extends Meta, UploadingPicture {}

export interface UploadingGroupPicture extends Meta, UploadingPicture {}

export interface UploadingPicture {
  uploaded?: boolean;
  uploadedSize?: number;
  totalSize?: number;
}

export enum LogType {
  RUN = 'run',
  BIKE = 'bike',
  SWIM = 'swim',
  OTHER = 'other',
}

export enum Metric {
  MILES = 'miles',
  KILOMETERS = 'kilometers',
  METERS = 'meters',
}

export interface Log {
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
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Logs {
  [key: string]: LogMeta;
}

export interface LogMeta extends Log, Meta {}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface LogFeeds {
  [key: string]: {
    filterBy: string;
    bucket: string;
    pages: LogFeedPages;
  };
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface LogFeedPages {
  [key: string]: LogFeedPage;
}

export interface LogFeedPage {
  isFetching?: boolean;
  lastUpdated?: number;
  items: Log[];
  pages: number;
  serverError?: string;
}

export interface Comment {
  comment_id: number;
  username: string;
  first: string;
  last: string;
  log_id: number;
  time: string;
  content: string;
}

export interface NewLog {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  created?: boolean;
  serverError?: string;
}

// I hope you are having a fun holiday weekend.
// Make sure to tell yourself that you are wonderful and kind.
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface UpdateLogs {
  [key: string]: UpdateLog;
}

export interface UpdateLog {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  updated?: boolean;
  serverError?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface DeletedLogs {
  [key: string]: DeletedLog;
}

export interface DeletedLog {
  isFetching: boolean;
  lastUpdated: number;
  didInvalidate?: boolean;
  deleted?: boolean;
  serverError?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface NewComments {
  [key: string]: {
    isFetching: boolean;
    lastUpdated: number;
    created?: boolean;
    serverError?: string;
  };
}

export interface Memberships extends Meta {
  teams?: TeamMembership[];
}

export interface UpdateMemberships extends Meta {
  updated?: boolean;
}

export interface TeamMembership extends TeamMember {
  groups?: GroupMember[];
}

export interface Team {
  name?: string;
  title?: string;
  picture_name?: string;
  description?: string;
  week_start?: string;
}

export interface TeamMeta extends Team, Meta {
  groups?: Groups;
}

export interface TeamInfo {
  name?: string;
  title?: string;
}

export interface TeamsInfo {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items?: TeamInfo[];
}

export interface Group {
  id?: number;
  group_name?: string;
  group_title?: string;
  grouppic_name?: string;
  description?: string;
  week_start?: string;
}

export interface Groups {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items?: GroupMeta[];
}

export interface GroupMeta extends Group, Meta {}

export interface TeamGroupMapping {
  team_name: string;
  group_name: string;
}

export interface TeamMember {
  team_name: string;
  title: string;
  status: string;
  user: string;
}

export interface GroupMember {
  group_name: string;
  group_title: string;
  group_id: number;
  newest_log?: string;
  newest_message?: string;
  status: string;
  user: string;
}

export interface GroupMembers {
  isFetching: boolean;
  lastUpdated: number;
  serverError?: string;
  items: GroupMember[];
}

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

export interface MemberDetails {
  username: string;
  first: string;
  last: string;
  member_since: string;
  user: string;
  status: string;
}

export interface Notification {
  notification_id: number;
  username: string;
  time: string;
  link?: string;
  viewed: string;
  description?: string;
}

export interface NewNotification extends Meta {
  created?: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface UpdateNotifications {
  [key: string]: UpdateNotification;
}

export interface UpdateNotification extends Meta {
  updated?: boolean;
}

export interface FlairMeta extends Flairs, Meta {}

export interface Flairs {
  items?: Flair[];
}

export interface Flair {
  flair?: string;
  flair_id?: number;
  username?: string;
}

export interface StatsMeta extends Stats, Meta {}

export interface Stats {
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
}

export type LeaderboardInterval = 'all' | 'year' | 'month' | 'week';

export interface Leaderboards {
  all?: LeaderboardItemMeta;
  year?: LeaderboardItemMeta;
  month?: LeaderboardItemMeta;
  week?: LeaderboardItemMeta;
}

export interface LeaderboardItemMeta extends Meta {
  items: LeaderboardItem[];
  serverWarning: string;
}

export interface LeaderboardItem {
  username: string;
  first: string;
  last: string;
  miles: number;
  miles_run: number;
  miles_biked: number;
  miles_swam: number;
  miles_other: number;
}

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
export type RangeViewExerciseTypeFilters = Partial<Record<RangeViewExerciseType, RangeViews>>;

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface RangeViews {
  [key: string]: RangeViewItemsMeta;
}

export interface RangeViewItemsMeta extends RangeViewItems, Meta {}

export interface RangeViewItems {
  items?: RangeViewItem[];
}

export interface RangeViewItem {
  date: string;
  feel: number;
  miles: number;
}

export interface RangeViewItemMoment {
  date: moment.Moment;
  feel: number;
  miles: number;
}

export interface ExerciseFilters {
  run: boolean;
  bike: boolean;
  swim: boolean;
  other: boolean;
}
