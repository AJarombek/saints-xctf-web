/**
 * Component for a month on the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Week from '../Week';
import { RangeViewItemMoment, RangeViewItemsMeta } from '../../../redux/types';
import moment from 'moment';

interface Props {
  rangeView: RangeViewItemsMeta;
  start: moment.Moment;
  monthStart: moment.Moment;
  monthEnd: moment.Moment;
}

const useStyles = createUseStyles(styles);

const Month: React.FunctionComponent<Props> = ({ rangeView, start, monthStart, monthEnd }) => {
  const classes = useStyles();

  const weeks = useMemo(() => {
    const startDate = start.clone();
    const endDate = start.clone().add(6, 'days');
    const rangeViewItems: RangeViewItemMoment[] = rangeView?.items
      ? rangeView.items.map((item) => ({ ...item, date: moment(item.date) }))
      : [];

    // The first item in weekList is the start date of the week.  The second item in weekList is the range view
    // for the week.
    const weekList = [] as any[];
    for (let i = 0; i < 6; i++) {
      const items = [];

      while (rangeViewItems.length && rangeViewItems[0].date < endDate) {
        const item = rangeViewItems.shift();
        items.push({ ...item, date: item.date.utc(false).format('YYYY-MM-DD') });
      }

      weekList.push([startDate.clone(), items]);
      startDate.add(1, 'week');
      endDate.add(1, 'week');
    }

    return weekList;
  }, [start, rangeView]);

  return (
    <div className={classes.month}>
      {weeks.map(([weekStart, rangeViewItems]) => (
        <Week
          key={weekStart}
          start={weekStart}
          monthStart={monthStart}
          monthEnd={monthEnd}
          rangeViewItems={rangeViewItems}
        />
      ))}
    </div>
  );
};

export default Month;
