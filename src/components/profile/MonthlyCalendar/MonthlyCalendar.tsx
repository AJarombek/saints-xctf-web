/**
 * Component for a tab on the profile page which shows a monthly calendar of users workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, {useMemo, useState} from 'react';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import Calendar from '../Calendar';
import {RangeViewExerciseType, RangeViewExerciseTypeFilters, UserMeta} from '../../../redux/types';
import {AJButton, AJButtonGroup} from 'jarombek-react-components';

interface Props {
    rangeViews: RangeViewExerciseTypeFilters;
    user: UserMeta;
}

const useStyles = createUseStyles(styles);

const MonthlyCalendar: React.FunctionComponent<Props> = ({ rangeViews, user }) => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState({ run: true, bike: false, swim: false, other: false });

  const filter: RangeViewExerciseType = useMemo(() => {
    return `${selectedFilters.run ? 'r' : ''}${selectedFilters.bike ? 'b' : ''}` +
            `${selectedFilters.swim ? 's' : ''}${selectedFilters.other ? 'o' : ''}` as RangeViewExerciseType
  }, [selectedFilters]);

  return (
    <div className={classes.monthlyCalendar} id="monthlyCalendar">
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Calendar Filters:</p>
        <AJButtonGroup className={classes.filterButtons}>
          <AJButton
            type={selectedFilters.run ? 'contained' : 'outlined'}
            onClick={(): void => setSelectedFilters({ ...selectedFilters, run: !selectedFilters.run })}>
                        Run
          </AJButton>
          <AJButton
            type={selectedFilters.bike ? 'contained' : 'outlined'}
            onClick={(): void => setSelectedFilters({ ...selectedFilters, bike: !selectedFilters.bike })}>
                        Bike
          </AJButton>
          <AJButton
            type={selectedFilters.swim ? 'contained' : 'outlined'}
            onClick={(): void => setSelectedFilters({ ...selectedFilters, swim: !selectedFilters.swim })}>
                        Swim
          </AJButton>
          <AJButton
            type={selectedFilters.other ? 'contained' : 'outlined'}
            onClick={(): void => setSelectedFilters({ ...selectedFilters, other: !selectedFilters.other })}>
                        Other
          </AJButton>
        </AJButtonGroup>
      </div>
      <Calendar rangeViews={rangeViews} filter={filter} user={user} />
    </div>
  );
};

export default MonthlyCalendar;
