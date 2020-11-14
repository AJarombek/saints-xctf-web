/**
 * Component for a day in the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import moment from 'moment';
import classNames from 'classnames';

interface Props {
  date: moment.Moment;
  monthStart: moment.Moment;
  monthEnd: moment.Moment;
  miles: number;
  feel: number;
}

const useStyles = createUseStyles(styles);

const Day: React.FunctionComponent<Props> = ({ date, monthStart, monthEnd, miles, feel }) => {
  const classes = useStyles({ feel });

  return (
    <div
      className={classNames(
        classes.day,
        date >= monthStart && date <= monthEnd && classes.currentMonth,
        feel && classes.feel
      )}
    >
      <div>
        <p className={classes.dayOfMonth}>{date.date()}</p>
        {miles && (
          <div className={classes.miles}>
            <p>{miles.toFixed(2)}</p>
            <p>Miles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
