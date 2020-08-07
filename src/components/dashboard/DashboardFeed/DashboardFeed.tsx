/**
 * DashboardFeed component which shows a log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React, {useMemo} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Log, LogFeeds, NewComments, User} from "../../../redux/types";
import ExerciseLog from "../../shared/ExerciseLog/ExerciseLog";

interface IProps {
    logFeeds: LogFeeds;
    page: number;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    newComments: NewComments;
    user: User;
}

const useStyles = createUseStyles(styles);

const DashboardFeed: React.FunctionComponent<IProps> = ({
    logFeeds,
    page,
    postComment,
    newComments,
    user
}) => {
    const classes = useStyles();

    const logs: Log[] = useMemo(() => {
        return logFeeds["all-all"]?.pages[page]?.items ?? []
    }, [logFeeds, page]);

    return (
        <div className={classes.dashboardFeed}>
            { logs.map((log) => (
                <ExerciseLog log={log} postComment={postComment} newComments={newComments} user={user} />
            ))}
        </div>
    );
};

export default DashboardFeed;
