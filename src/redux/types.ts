/**
 * Types for the Redux store.
 * @author Andrew Jarombek
 * @since 7/23/2020
 */

export type Users = {
    [key: string]: Record<string, User>;
}

export type User = {
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
    subscribed?: string;
    username?: string;
    week_start?: string;
}
