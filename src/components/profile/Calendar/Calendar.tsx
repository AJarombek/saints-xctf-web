/**
 * Component for a calendar that displays exercises.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';

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
  const [error, setError] = useState(false);

  const start = useMemo(() => {
    const startOfRange = currentMonth.clone().startOf('week');

    if (user.week_start === 'monday') {
      if (startOfRange.date() !== 1) {
        startOfRange.add(1, 'day');
      } else {
        startOfRange.subtract(6, 'day');
      }
    }

    return startOfRange;
  }, [currentMonth, user]);

  const end = useMemo(() => {
    return start.clone().add(6, 'weeks').subtract(1, 'day');
  }, [start]);

  const currentRangeView: RangeViewItemsMeta = useMemo(() => {
    if (rangeViews) {
      const rangeViewsWithFilter = rangeViews[filter] ?? {};
      return rangeViewsWithFilter[`${start.format('YYYY-MM-DD')}:${end.format('YYYY-MM-DD')}`];
    } else {
      return {};
    }
  }, [rangeViews, filter, start, end]);

  const retrieveRangeView = useCallback(async (): Promise<void> => {
    if (user?.username && !currentRangeView?.items && !currentRangeView?.isFetching && !currentRangeView?.serverError) {
      const result = await dispatch(
        getRangeView('users', user.username, filter, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
      );

      setError(!result);
    }
  }, [
    currentRangeView?.isFetching,
    currentRangeView?.items,
    currentRangeView?.serverError,
    dispatch,
    end,
    filter,
    start,
    user.username
  ]);

  useEffect(() => {
    retrieveRangeView();
  }, [retrieveRangeView]);

  return (
    <>
      <div className={classes.calendar}>
        <div className={classes.monthNavigation}>
          <p data-cypress="prevMonth" onClick={(): void => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}>
            &#x34;
          </p>
          <h2 data-cypress="currentMonth">{currentMonth.format('MMMM YYYY')}</h2>
          <p data-cypress="nextMonth" onClick={(): void => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>
            &#x35;
          </p>
        </div>
        <div className={classes.weekdays}>
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <p className={classes.weekdaysLong}>{start.clone().add(i, 'days').format('dddd')}</p>
                <p className={classes.weekdaysShort}>{start.clone().add(i, 'days').format('ddd')}</p>
              </div>
            ))}
          <div>
            <p>Total</p>
          </div>
        </div>
        <Month
          rangeView={currentRangeView}
          start={start}
          monthStart={currentMonth}
          monthEnd={currentMonth.clone().endOf('month')}
        />
      </div>
      {error && <DefaultErrorPopup message="Failed to retrieve calendar data" onClose={(): void => setError(false)} />}
    </>
  );
};

export default Calendar;
