/**
 * DashboardPaginationBar component which paginates the log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {

}

const useStyles = createUseStyles(styles);

const DashboardPaginationBar: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboardPaginationBar}>
        </div>
    );
};

export default DashboardPaginationBar;
