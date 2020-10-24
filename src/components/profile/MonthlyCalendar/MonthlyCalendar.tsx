/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Calendar from "../Calendar";
import {RangeViewExerciseType, RangeViewExerciseTypeFilters, RangeViewFilter, UserMeta} from "../../../redux/types";

interface IProps {
    getRangeView: (filterBy: RangeViewFilter, bucket: string, exerciseTypes: string, start: string, end: string) => void;
    rangeViews: RangeViewExerciseTypeFilters;
    user: UserMeta;
}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<IProps> = ({ getRangeView, rangeViews, user }) => {
    const classes = useStyles();

    const [filter, setFilter] = useState('r' as RangeViewExerciseType);

    return (
        <div className={classes.monthlyCalendar}>
            <div>
                <p>Calendar Filters:</p>
            </div>
            <Calendar getRangeView={getRangeView} rangeViews={rangeViews} filter={filter} user={user} />
        </div>
    );
};

export default MonthlyCalendar;
