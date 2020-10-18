/**
 * Component for on the profile and group pages which lists all the viewable tabs.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import { ProfileTab } from "../../profile/ProfileBody/ProfileBody";

interface IProps {
    currentTab: ProfileTab;
    viewExerciseLogs: () => void;
    viewMonthlyCalendar: () => void;
    viewWeeklyChart: () => void;
    viewDetails: () => void;
    viewEditProfile: () => void;
}

const useStyles = createUseStyles(styles);

const PageTabs: React.FunctionComponent<IProps> = ({
    viewExerciseLogs,
    viewMonthlyCalendar,
    viewWeeklyChart,
    viewDetails,
    viewEditProfile
}) => {
    const classes = useStyles();

    return (
        <div className={classes.tabs}>
            <p className={classes.tab} onClick={viewExerciseLogs}>Exercise Logs</p>
            <p className={classes.tab} onClick={viewMonthlyCalendar}>Monthly Calendar</p>
            <p className={classes.tab} onClick={viewWeeklyChart}>Weekly Chart</p>
            <p className={classes.tab} onClick={viewDetails}>Details</p>
            <p className={classes.tab} onClick={viewEditProfile}>Edit Profile</p>
        </div>
    );
};

export default PageTabs;
