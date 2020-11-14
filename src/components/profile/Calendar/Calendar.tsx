/**
 * Component for a calendar that displays exercises.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Month from '../Month';
import moment from 'moment';
import { getRangeView } from '../../../redux/modules/rangeView';
import { useDispatch } from 'react-redux';
import {
  RangeViewExerciseType,
  RangeViewExerciseTypeFilters,
  RangeViewItemsMeta,
  UserMeta
} from '../../../redux/types';

interface Props {
  rangeViews: RangeViewExerciseTypeFilters;
  filter: RangeViewExerciseType;
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const Calendar: React.FunctionComponent<Props> = ({ rangeViews, filter, user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));

  const start = useMemo(() => {
    const startOfRange = currentMonth.clone().startOf('week');

    if (user.week_start === 'monday') {
      startOfRange.add(1, 'day');
    }

    return startOfRange;
  }, [currentMonth, user]);

  const end = useMemo(() => {
    const endOfRange = currentMonth.clone().endOf('month').endOf('week');

    if (user.week_start === 'monday') {
      endOfRange.add(1, 'day');
    }

    return endOfRange;
  }, [currentMonth, user]);

  const currentRangeView: RangeViewItemsMeta = useMemo(() => {
    if (rangeViews) {
      const rangeViewsWithFilter = rangeViews[filter] ?? {};
      return rangeViewsWithFilter[`${start.format('YYYY-MM-DD')}:${end.format('YYYY-MM-DD')}`];
    } else {
      return {};
    }
  }, [rangeViews, filter, start, end]);

  useEffect(() => {
    if (user?.username && !currentRangeView?.items && !currentRangeView?.isFetching) {
      dispatch(getRangeView('users', user.username, filter, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
    }
  }, [filter, currentRangeView, user, start, end, dispatch]);

  return (
    <div className={classes.calendar}>
      <div className={classes.monthNavigation}>
        <p onClick={(): void => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}>&#x34;</p>
        <h2>{currentMonth.format('MMMM YYYY')}</h2>
        <p onClick={(): void => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>&#x35;</p>
      </div>
      <div className={classes.weekdays}>
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <p key={i}>{start.clone().add(i, 'days').format('dddd')}</p>
          ))}
        <p>Total</p>
      </div>
      <Month
        rangeView={currentRangeView}
        start={start}
        monthStart={currentMonth}
        monthEnd={currentMonth.clone().endOf('month')}
      />
    </div>
  );
};

export default Calendar;
