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
import {LogFeeds} from "../../../redux/types";

interface IProps {
    getLogFeed: Function,
    logFeeds: LogFeeds
}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<IProps> = ({ getLogFeed, logFeeds }) => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    useEffect(() => {
        getLogFeed("all", "all", 10, 10 * (page - 1));
    }, []);

    return (
        <div className={classes.dashboardBody}>
            <div className={classes.sidePanel}>
                <DashboardSidePanel />
            </div>
            <div className={classes.mainPanel}>
                <DashboardFeed logFeeds={logFeeds} page={page} />
                <DashboardPaginationBar />
            </div>
        </div>
    );
};

export default DashboardBody;
