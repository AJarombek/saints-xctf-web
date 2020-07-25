/**
 * DashboardSidePanel component which shows links to other parts of the website.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {

}

const useStyles = createUseStyles(styles);

const DashboardSidePanel: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboardSidePanel}>
        </div>
    );
};

export default DashboardSidePanel;
