/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Calendar from "../Calendar";

interface IProps {}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.monthlyCalendar}>
            <Calendar />
        </div>
    );
};

export default MonthlyCalendar;
