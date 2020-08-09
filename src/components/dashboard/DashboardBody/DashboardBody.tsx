/**
 * DashboardBody component which shows a paginated log feed and drawer of navigation links.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import React, {useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import DashboardSidePanel from "../DashboardSidePanel/DashboardSidePanel";
import DashboardFeed from "../DashboardFeed/DashboardFeed";
import DashboardPaginationBar from "../DashboardPaginationBar/DashboardPaginationBar";
import {LogFeeds, NewComments, User} from "../../../redux/types";

interface IProps {
    getLogFeed: Function;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    logFeeds: LogFeeds;
    newComments: NewComments;
    user: User
}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<IProps> = ({
    getLogFeed,
    postComment,
    logFeeds,
    newComments,
    user
}) => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    const filterBy = "all";
    const bucket = "all";

    useEffect(() => {
        getLogFeed(filterBy, bucket, 10, 10 * (page - 1));
    }, []);

    return (
        <div className={classes.dashboardBody}>
            <div className={classes.sidePanel}>
                <DashboardSidePanel />
            </div>
            <div className={classes.mainPanel}>
                <DashboardFeed
                    logFeeds={logFeeds}
                    postComment={postComment}
                    page={page}
                    newComments={newComments}
                    user={user}
                    filterBy={filterBy}
                    bucket={bucket}
                />
                <DashboardPaginationBar />
            </div>
        </div>
    );
};

export default DashboardBody;
