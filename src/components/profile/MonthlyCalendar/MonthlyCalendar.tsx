/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Calendar from '../Calendar';
import { ExerciseFilters, RangeViewExerciseType, RangeViewExerciseTypeFilters, UserMeta } from '../../../redux/types';
import FilterButtons from '../../shared/FilterButtons';
import { useExerciseFilter } from '../../../hooks/shared';

interface Props {
  rangeViews: RangeViewExerciseTypeFilters;
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<Props> = ({ rangeViews, user }) => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState<ExerciseFilters>({
    run: true,
    bike: false,
    swim: false,
    other: false
  });

  const filter: RangeViewExerciseType = useExerciseFilter(selectedFilters);

  return (
    <div className={classes.monthlyCalendar} id="monthlyCalendar">
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Calendar Filters:</p>
        <FilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <Calendar rangeViews={rangeViews} filter={filter} user={user} />
    </div>
  );
};

export default MonthlyCalendar;
