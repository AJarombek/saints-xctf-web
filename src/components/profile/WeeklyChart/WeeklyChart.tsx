/**
 * Component for a tab on the profile page which shows a weekly progression chart of a user's workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import {RangeViewExerciseTypeFilters} from '../../../redux/types';

interface Props {
  rangeViews: RangeViewExerciseTypeFilters;
}

const useStyles = createUseStyles(styles);

const WeeklyChart: React.FunctionComponent<Props> = ({ rangeViews }) => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState({ run: true, bike: false, swim: false, other: false });

  return (
    <div className={classes.weeklyChart}>

    </div>
  );
};

export default WeeklyChart;
