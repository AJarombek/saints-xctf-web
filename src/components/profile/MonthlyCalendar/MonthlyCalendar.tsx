/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Calendar from "../Calendar";
import {RangeViewExerciseTypeFilters} from "../../../redux/types";

interface IProps {
    getRangeView: (filterBy: string, bucket: string, exerciseTypes: string, start: string, end: string) => void;
    rangeViews: RangeViewExerciseTypeFilters;
}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<IProps> = ({ getRangeView, rangeViews }) => {
    const classes = useStyles();

    return (
        <div className={classes.monthlyCalendar}>
            <div>
                <p>Calendar Filters:</p>
            </div>
            <Calendar rangeViews={rangeViews} />
        </div>
    );
};

export default MonthlyCalendar;
