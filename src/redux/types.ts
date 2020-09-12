/**
 * Types for the Redux store.
 * @author Andrew Jarombek
 * @since 7/23/2020
 */

export type RootState = {
    auth: AuthState;
    logs: LogsState;
    memberships: MembershipsState;
    notifications: NotificationsState;
    profile: ProfileState;
}

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
}

export type AuthState = {
    auth: Auth;
    user: Users;
}

export type MembershipsState = {
    groups: GroupMembers
}

export type NotificationsState = {
    isFetching?: boolean;
    lastUpdated?: number;
    serverError?: string;
    items?: Notification[]
}

export type ProfileState = {
    users?: Users;
}

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
}

export type Users = {
    [key: string]: {
        user?: UserMeta;
        flair?: FlairMeta;
    };
}

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

enum LogType { RUN = "run", BIKE = "bike", SWIM = "swim", OTHER = "other" }
enum Metric { MILES = "miles", KILOMETERS = "kilometers", METERS = "meters" }

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
}

export type Logs = {
    [key: string]: LogMeta;
}

export interface LogMeta extends Log, Meta {}

export type LogFeeds = {
    [key: string]: {
        filterBy: string;
        bucket: string;
        pages: LogFeedPages
    };
}

export type LogFeedPages = {
    [key: string]: LogFeedPage
}

export type LogFeedPage = {
    isFetching: boolean;
    lastUpdated: number;
    items: Log[];
    pages: number;
    serverError: string;
}

export type Comment = {
    comment_id: number;
    username: string;
    first: string;
    last: string;
    log_id: number;
    time: string;
    content: string;
}

export type NewLog = {
    isFetching: boolean;
    lastUpdated: number;
    didInvalidate?: boolean;
    created?: boolean;
    serverError?: string;
}

// I hope you are having a fun holiday weekend.
// Make sure to tell yourself that you are wonderful and kind.
export type UpdateLogs = {
    [key: string]: UpdateLog
}

export type UpdateLog = {
    isFetching: boolean;
    lastUpdated: number;
    didInvalidate?: boolean;
    updated?: boolean;
    serverError?: string;
}

export type DeletedLogs = {
    [key: string]: DeletedLog
}

export type DeletedLog = {
    isFetching: boolean;
    lastUpdated: number;
    didInvalidate?: boolean;
    deleted?: boolean;
    serverError?: string;
}

export type NewComments = {
    [key: string]: {
        isFetching: boolean;
        lastUpdated: number;
        created?: boolean;
        serverError?: string;
    }
}

export type GroupMember = {
    group_name: string;
    group_title: string;
    newest_log?: string;
    newest_message?: string;
    status: string;
    user: string;
}

export type GroupMembers = {
    isFetching: boolean;
    lastUpdated: number;
    serverError?: string;
    items: GroupMember[];
}

export type Notification = {
    notification_id: number;
    username: string;
    time: string;
    link?: string;
    viewed: string;
    description?: string;
}

export interface FlairMeta extends Flair, Meta {}

export type Flair = {
    flair?: string;
    flair_id?: number;
    username?: string;
}
