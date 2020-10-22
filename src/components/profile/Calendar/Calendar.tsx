/**
 * Component for a calendar that displays exercises.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, {useEffect, useMemo, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Month from "../Month";
import {RangeViewExerciseType, RangeViewExerciseTypeFilters, UserMeta} from "../../../redux/types";
import moment from "moment";

interface IProps {
    getRangeView: (filterBy: string, bucket: string, exerciseTypes: string, start: string, end: string) => void;
    rangeViews: RangeViewExerciseTypeFilters;
    filter: RangeViewExerciseType;
    user: UserMeta;
}

const useStyles = createUseStyles(styles);

const Calendar: React.FunctionComponent<IProps> = ({ getRangeView, rangeViews, filter, user }) => {
    const classes = useStyles();

    const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));

    const start = useMemo(() => {
        return currentMonth.startOf('week');
    }, [currentMonth]);

    const end = useMemo(() => {
        return currentMonth.endOf('month').endOf('week');
    }, [currentMonth]);

    const currentRangeView = useMemo(() => {
        const rangeViewsWithFilter = rangeViews[filter] ?? {};
        return rangeViewsWithFilter[`${start.format('YYYY-MM-DD')}:${end.format('YYYY-MM-DD')}`];
    }, [rangeViews, filter, currentMonth]);

    useEffect(() => {
        if (!currentRangeView?.items && !currentRangeView?.isFetching) {
            getRangeView('user', user.username, filter, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
    }, [filter, currentMonth]);

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
            <Month rangeView={currentRangeView} start={start} monthStart={currentMonth} />
        </div>
    );
};

export default Calendar;
