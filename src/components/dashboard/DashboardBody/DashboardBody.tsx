/**
 * DashboardBody component which shows a paginated log feed and drawer of navigation links.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import DashboardSidePanel from "../DashboardSidePanel/DashboardSidePanel";
import DashboardFeed from "../DashboardFeed/DashboardFeed";
import DashboardPaginationBar from "../DashboardPaginationBar/DashboardPaginationBar";

interface IProps {

}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboardBody}>
            <div className={classes.sidePanel}>
                <DashboardSidePanel />
            </div>
            <div className={classes.mainPanel}>
                <DashboardFeed />
                <DashboardPaginationBar />
            </div>
        </div>
    );
};

export default DashboardBody;
