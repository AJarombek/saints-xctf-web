/**
 * DashboardBody component which shows a paginated log feed and drawer of navigation links.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import React, {useEffect, useMemo, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import DashboardSidePanel from "../DashboardSidePanel/DashboardSidePanel";
import DashboardFeed from "../DashboardFeed/DashboardFeed";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import {DeletedLogs, GroupMember, Log, LogFeeds, NewComments, NotificationsState, User} from "../../../redux/types";

interface IProps {
    getLogFeed: (filterBy: string, bucket: string, limit: number, offset: number) => void;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    addComment: (logId: number, content: string, username: string, first: string, last: string,
        filterBy: string, bucket: string, page: number, index: number) => void;
    getGroupMemberships: (username: string) => void,
    getUserNotifications: (username: string) => void;
    deleteLog: (logId: number) => void;
    logFeeds: LogFeeds;
    newComments: NewComments;
    user: User;
    groupMemberships: GroupMember[];
    notificationInfo: NotificationsState;
    deletedLogs: DeletedLogs;
}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<IProps> = ({
    getLogFeed,
    postComment,
    addComment,
    getGroupMemberships,
    getUserNotifications,
    deleteLog,
    logFeeds,
    newComments,
    user,
    groupMemberships,
    notificationInfo,
    deletedLogs
}) => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    const filterBy = "all";
    const bucket = "all";

    useEffect(() => {
        getLogFeed(filterBy, bucket, 10, 10 * (page - 1));
    }, [filterBy, bucket, page]);

    useEffect(() => {
        if (user) {
            if (!groupMemberships?.length) {
                getGroupMemberships(user.username);
            }

            getUserNotifications(user.username);
        }
    }, [user]);

    const totalPages: number = useMemo(() => {
        return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.pages ?? 0
    }, [logFeeds, page]);

    return (
        <div className={classes.dashboardBody}>
            <div className={classes.sidePanel}>
                <DashboardSidePanel
                    user={user}
                    groupMemberships={groupMemberships}
                    notificationInfo={notificationInfo}
                />
            </div>
            <div className={classes.mainPanel}>
                <DashboardFeed
                    logFeeds={logFeeds}
                    getLogFeed={getLogFeed}
                    postComment={postComment}
                    addComment={addComment}
                    deleteLog={deleteLog}
                    page={page}
                    newComments={newComments}
                    deletedLogs={deletedLogs}
                    user={user}
                    filterBy={filterBy}
                    bucket={bucket}
                />
                <PaginationBar
                    page={page}
                    totalPages={totalPages}
                    onChangePage={(page) => {
                        setPage(page);
                        window.scrollTo(0, 0);
                    }}
                />
            </div>
        </div>
    );
};

export default DashboardBody;
