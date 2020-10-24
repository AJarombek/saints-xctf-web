/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, {useMemo, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Calendar from "../Calendar";
import {RangeViewExerciseType, RangeViewExerciseTypeFilters, RangeViewFilter, UserMeta} from "../../../redux/types";
import {AJButton, AJButtonGroup} from "jarombek-react-components";

interface IProps {
    getRangeView: (filterBy: RangeViewFilter, bucket: string, exerciseTypes: string, start: string, end: string) => void;
    rangeViews: RangeViewExerciseTypeFilters;
    user: UserMeta;
}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<IProps> = ({ getRangeView, rangeViews, user }) => {
    const classes = useStyles();

    const [selectedFilters, setSelectedFilters] = useState({ run: true, bike: false, swim: false, other: false });

    const filter: RangeViewExerciseType = useMemo(() => {
        return `${selectedFilters.run ? 'r' : ''}${selectedFilters.bike ? 'b' : ''}` +
            `${selectedFilters.swim ? 's' : ''}${selectedFilters.other ? 'o' : ''}` as RangeViewExerciseType
    }, [selectedFilters]);

    return (
        <div className={classes.monthlyCalendar}>
            <div className={classes.filters}>
                <p className={classes.filterTitle}>Calendar Filters:</p>
                <AJButtonGroup className={classes.filterButtons}>
                    <AJButton
                        type={selectedFilters.run ? 'contained' : 'outlined'}
                        onClick={() => setSelectedFilters({ ...selectedFilters, run: !selectedFilters.run })}>
                        Run
                    </AJButton>
                    <AJButton
                        type={selectedFilters.bike ? 'contained' : 'outlined'}
                        onClick={() => setSelectedFilters({ ...selectedFilters, bike: !selectedFilters.bike })}>
                        Bike
                    </AJButton>
                    <AJButton
                        type={selectedFilters.swim ? 'contained' : 'outlined'}
                        onClick={() => setSelectedFilters({ ...selectedFilters, swim: !selectedFilters.swim })}>
                        Swim
                    </AJButton>
                    <AJButton
                        type={selectedFilters.other ? 'contained' : 'outlined'}
                        onClick={() => setSelectedFilters({ ...selectedFilters, other: !selectedFilters.other })}>
                        Other
                    </AJButton>
                </AJButtonGroup>
            </div>
            <Calendar getRangeView={getRangeView} rangeViews={rangeViews} filter={filter} user={user} />
        </div>
    );
};

export default MonthlyCalendar;
