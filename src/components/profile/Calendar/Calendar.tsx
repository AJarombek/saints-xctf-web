/**
 * Component for a calendar that displays exercises.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Month from "../Month";
import {RangeViewExerciseType, RangeViewExerciseTypeFilters} from "../../../redux/types";
import moment from "moment";

interface IProps {
    rangeViews: RangeViewExerciseTypeFilters;
    filter: RangeViewExerciseType;
}

const useStyles = createUseStyles(styles);

const Calendar: React.FunctionComponent<IProps> = ({ rangeViews, filter }) => {
    const classes = useStyles();

    const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));

    return (
        <div className={classes.calendar}>
            <div>
                <p onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
                    &#x34;
                </p>
                <h3>{currentMonth.format('MMMM YYYY')}</h3>
                <p onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
                    &#x35;
                </p>
            </div>
            <Month />
        </div>
    );
};

export default Calendar;
