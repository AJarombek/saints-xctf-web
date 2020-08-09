/**
 * Types for the Redux store.
 * @author Andrew Jarombek
 * @since 7/23/2020
 */

export type RootState = {
    auth: AuthState,
    logs: LogsState
}

export type LogsState = {
    isFetching: boolean;
    didInvalidate: boolean;
    lastUpdated: number;
    items: Logs;
    feeds: LogFeeds;
    newComments: NewComments;
}

export type AuthState = {
    auth: Auth;
    user: Users;
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
    [key: string]: UserMeta;
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
    log_id: number;
    username: string;
    first: string;
    last: string;
    name: string;
    date: string;
    type: LogType;
    distance?: number;
    metric?: Metric;
    miles?: number;
    time?: string;
    pace?: string;
    feel: number;
    location?: string;
    description?: string;
    timeCreated?: string;
    comments?: Comment[];
}

export type Logs = {
    [key: string]: Record<string, Log>;
}

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

export type NewComments = {
    [key: string]: {
        isFetching: boolean;
        lastUpdated: number;
        created?: boolean;
        serverError?: string;
    }
}
