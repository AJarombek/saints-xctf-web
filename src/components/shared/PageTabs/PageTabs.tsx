/**
 * Component for on the profile and group pages which lists all the viewable tabs.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import {ProfileTab} from '../../profile/ProfileBody/ProfileBody';
import classNames from 'classnames';

interface Props {
    currentTab: ProfileTab;
    viewExerciseLogs: () => void;
    viewMonthlyCalendar: () => void;
    viewWeeklyChart: () => void;
    viewDetails: () => void;
    viewEditProfile: () => void;
}

const useStyles = createUseStyles(styles);

const PageTabs: React.FunctionComponent<Props> = ({
    currentTab,
    viewExerciseLogs,
    viewMonthlyCalendar,
    viewWeeklyChart,
    viewDetails,
    viewEditProfile
}) => {
    const classes = useStyles();

    return (
        <div className={classNames(classes.tabs, 'tabs')}>
            <p className={classNames(classes.tab, currentTab === ProfileTab.LOGS && classes.currentTab)}
               onClick={viewExerciseLogs}>
                Exercise Logs
            </p>
            <p className={classNames(classes.tab, currentTab === ProfileTab.CALENDAR && classes.currentTab)}
               onClick={viewMonthlyCalendar}>
                Monthly Calendar
            </p>
            <p className={classNames(classes.tab, currentTab === ProfileTab.CHART && classes.currentTab)}
               onClick={viewWeeklyChart}>
                Weekly Chart
            </p>
            <p className={classNames(classes.tab, currentTab === ProfileTab.DETAILS && classes.currentTab)}
               onClick={viewDetails}>
                Details
            </p>
            <p className={classNames(classes.tab, currentTab === ProfileTab.EDIT && classes.currentTab)}
               onClick={viewEditProfile}>
                Edit Profile
            </p>
        </div>
    );
};

export default PageTabs;
