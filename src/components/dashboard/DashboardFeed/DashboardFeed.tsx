/**
 * DashboardFeed component which shows a log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React, {useMemo} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {DeletedLogs, Log, LogFeeds, NewComments, User} from "../../../redux/types";
import ExerciseLog from "../../shared/ExerciseLog/ExerciseLog";
import {AJLoadingDots} from "jarombek-react-components";

interface IProps {
    logFeeds: LogFeeds;
    page: number;
    getLogFeed: (filterBy: string, bucket: string, limit: number, offset: number) => void;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    addComment: (logId: number, content: string, username: string, first: string, last: string,
                 filterBy: string, bucket: string, page: number, index: number) => void;
    deleteLog: (logId: number) => void;
    newComments: NewComments;
    deletedLogs: DeletedLogs;
    user: User;
    filterBy: string;
    bucket: string;
}

const useStyles = createUseStyles(styles);

const DashboardFeed: React.FunctionComponent<IProps> = ({
    logFeeds,
    page,
    getLogFeed,
    postComment,
    addComment,
    deleteLog,
    newComments,
    deletedLogs,
    user,
    filterBy,
    bucket
}) => {
    const classes = useStyles();

    const logs: Log[] = useMemo(() => {
        return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.items ?? []
    }, [logFeeds, page]);

    const loading: boolean = useMemo(() => {
        return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.isFetching ?? true;
    }, [logFeeds, page]);

    return (
        <div id="dashboardFeed" className={classes.dashboardFeed}>
            { logs.map((log, index) => (
                <React.Fragment key={log.log_id}>
                    <ExerciseLog
                        log={log}
                        getLogFeed={getLogFeed}
                        postComment={postComment}
                        addComment={addComment}
                        deleteLog={deleteLog}
                        newComments={newComments}
                        deletedLogs={deletedLogs}
                        user={user}
                        page={page}
                        filterBy={filterBy}
                        bucket={bucket}
                        index={index}
                    />
                </React.Fragment>
            ))}
            {loading && (
                <div className={classes.loading}><AJLoadingDots /></div>
            )}
        </div>
    );
};

export default DashboardFeed;
