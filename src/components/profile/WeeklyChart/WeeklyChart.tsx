/**
 * Component for a tab on the profile page which shows a weekly progression chart of a user's workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import {
  ExerciseFilters,
  RangeViewExerciseType,
  RangeViewExerciseTypeFilters,
  RangeViewItemMoment,
  RangeViewItemsMeta,
  UserMeta
} from '../../../redux/types';
import FilterButtons from '../../shared/FilterButtons';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FeelColors } from '../../../styles/colors';
import { useExerciseFilter } from '../../../hooks/shared';
import moment from 'moment';
import { getRangeView } from '../../../redux/modules/rangeView';
import { useDispatch } from 'react-redux';

interface Props {
  rangeViews: RangeViewExerciseTypeFilters;
  user: UserMeta;
}

type WeeklyChartData = {
  name: string;
  miles: number;
  feel: number;
};

const useStyles = createUseStyles(styles);

const WeeklyChart: React.FunctionComponent<Props> = ({ rangeViews, user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState<ExerciseFilters>({
    run: true,
    bike: false,
    swim: false,
    other: false
  });

  const filter: RangeViewExerciseType = useExerciseFilter(selectedFilters);

  const end = useMemo(() => {
    const startOfRange = moment().endOf('week');

    if (user.week_start === 'monday') {
      startOfRange.add(1, 'day');
    }

    return startOfRange;
  }, [user.week_start]);

  const start = useMemo(() => {
    return end.clone().subtract(8, 'weeks');
  }, [end]);

  const currentRangeView: RangeViewItemsMeta = useMemo(() => {
    if (rangeViews) {
      const rangeViewsWithFilter = rangeViews[filter] ?? {};
      return rangeViewsWithFilter[`${start.format('YYYY-MM-DD')}:${end.format('YYYY-MM-DD')}`];
    } else {
      return {};
    }
  }, [rangeViews, filter, start, end]);

  useEffect(() => {
    if (user?.username && !currentRangeView?.items && !currentRangeView?.isFetching && !currentRangeView?.serverError) {
      dispatch(getRangeView('users', user.username, filter, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
    }
  }, [filter, currentRangeView, user, start, end, dispatch]);

  const weeklyData = useMemo(() => {
    const startDate = start.clone();
    const endDate = start.clone().add(1, 'week');
    const rangeViewItems: RangeViewItemMoment[] = currentRangeView?.items
      ? currentRangeView.items.map((item) => ({ ...item, date: moment(item.date) }))
      : [];

    const weeklyDataList = [] as WeeklyChartData[];
    for (let i = 0; i < 8; i++) {
      let data = { name: startDate.format('MMM. Do'), miles: 0, feel: 0 };
      let exerciseCount = 0;
      let totalFeel = 0;

      while (rangeViewItems.length && rangeViewItems[0].date < endDate) {
        const item = rangeViewItems.shift();
        data = { ...data, miles: data.miles + item.miles };
        exerciseCount += 1;
        totalFeel += item.feel;
      }

      data.feel = Math.round(totalFeel / exerciseCount);

      weeklyDataList.push(data);
      startDate.add(1, 'week');
      endDate.add(1, 'week');
    }

    return weeklyDataList;
  }, [currentRangeView, start]);

  return (
    <div className={classes.weeklyChart}>
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Chart Filters:</p>
        <FilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <div>
        <ResponsiveContainer height={500} width="100%">
          <BarChart data={weeklyData} className={classes.chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelFormatter={(label: string): string => `Week of ${label}`}
              formatter={(value: string): Array<string> => [(+value).toFixed(2), 'Miles']}
              separator=": "
              cursor={false}
            />
            <Bar dataKey="miles">
              {weeklyData.map((entry, index) => (
                <Cell key={index} fill={FeelColors[entry.feel]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
