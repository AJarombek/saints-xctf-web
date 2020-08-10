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
    addComment: (logId: number, content: string, username: string, first: string, last: string,
                 filterBy: string, bucket: string, page: number, index: number) => void;
    newComments: NewComments;
    user: User;
    filterBy: string;
    bucket: string;
}

const useStyles = createUseStyles(styles);

const DashboardFeed: React.FunctionComponent<IProps> = ({
    logFeeds,
    page,
    postComment,
    addComment,
    newComments,
    user,
    filterBy,
    bucket
}) => {
    const classes = useStyles();

    const logs: Log[] = useMemo(() => {
        return logFeeds["all-all"]?.pages[page]?.items ?? []
    }, [logFeeds, page]);

    return (
        <div className={classes.dashboardFeed}>
            { logs.map((log, index) => (
                <ExerciseLog
                    log={log}
                    postComment={postComment}
                    addComment={addComment}
                    newComments={newComments}
                    user={user}
                    page={page}
                    filterBy={filterBy}
                    bucket={bucket}
                    index={index}
                />
            ))}
        </div>
    );
};

export default DashboardFeed;
