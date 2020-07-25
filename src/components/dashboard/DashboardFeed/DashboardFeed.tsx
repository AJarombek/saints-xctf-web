/**
 * DashboardFeed component which shows a log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {

}

const useStyles = createUseStyles(styles);

const DashboardFeed: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboardFeed}>
        </div>
    );
};

export default DashboardFeed;
