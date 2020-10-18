/**
 * Component for a tab on the profile page which shows a weekly progression chart of a user's workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const WeeklyChart: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.weeklyChart}></div>
    );
};

export default WeeklyChart;
