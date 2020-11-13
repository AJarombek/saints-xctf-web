/**
 * Component for a tab on the profile page which shows a weekly progression chart of a user's workouts.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { ExerciseFilters, RangeViewExerciseType, RangeViewExerciseTypeFilters } from '../../../redux/types';
import FilterButtons from '../../shared/FilterButtons';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FeelColors } from '../../../styles/colors';
import { useExerciseFilter } from '../../../hooks/shared';

interface Props {
  rangeViews: RangeViewExerciseTypeFilters;
}

const useStyles = createUseStyles(styles);

const WeeklyChart: React.FunctionComponent<Props> = ({ rangeViews }) => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState<ExerciseFilters>({
    run: true,
    bike: false,
    swim: false,
    other: false
  });

  const filter: RangeViewExerciseType = useExerciseFilter(selectedFilters);

  const data = [
    {
      name: 'Week 1',
      miles: 36,
      feel: 7
    },
    {
      name: 'Week 2',
      miles: 47,
      feel: 5
    },
    {
      name: 'Week 3',
      miles: 50,
      feel: 6
    },
    {
      name: 'Week 4',
      miles: 16,
      feel: 4
    },
    {
      name: 'Week 5',
      miles: 22,
      feel: 5
    }
  ];

  return (
    <div className={classes.weeklyChart}>
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Chart Filters:</p>
        <FilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <div>
        <ResponsiveContainer height={500} width="100%">
          <BarChart data={data} className={classes.chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelFormatter={(): string => ''}
              formatter={(value: string): Array<string> => [value, 'Miles']}
              separator=": "
              cursor={false}
            />
            <Bar dataKey="miles">
              {data.map((entry, index) => (
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
