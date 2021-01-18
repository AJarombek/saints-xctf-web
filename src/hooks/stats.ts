/**
 * Custom React hooks which are used when dealing with user or group statistics.
 * @author Andrew Jarombek
 * @since 1/9/2021
 */

import { Stat } from '../components/shared/StatisticSection/StatisticSection';
import moment from 'moment';
import { useMemo } from 'react';
import { StatsMeta } from '../redux/types';

export const useStatsExercises = (stats: StatsMeta): Stat[] => {
  return useMemo(() => {
    if (stats) {
      return [
        { name: 'All Time', value: `${stats.miles_all_time?.toFixed(2)} mi.` },
        { name: moment().year(), value: `${stats.miles_past_year?.toFixed(2)} mi.` },
        { name: moment().format('MMMM YYYY'), value: `${stats.miles_past_month?.toFixed(2)} mi.` },
        { name: 'This Week', value: `${stats.miles_past_week?.toFixed(2)} mi.` }
      ];
    } else {
      return [];
    }
  }, [stats]);
};

export const useStatsRunning = (stats: StatsMeta): Stat[] => {
  return useMemo(() => {
    if (stats) {
      return [
        { name: 'All Time', value: `${stats.run_miles_all_time?.toFixed(2)} mi.` },
        { name: moment().year(), value: `${stats.run_miles_past_year?.toFixed(2)} mi.` },
        { name: moment().format('MMMM YYYY'), value: `${stats.run_miles_past_month?.toFixed(2)} mi.` },
        { name: 'This Week', value: `${stats.run_miles_past_week?.toFixed(2)} mi.` }
      ];
    } else {
      return [];
    }
  }, [stats]);
};

export const useStatsFeeling = (stats: StatsMeta): Stat[] => {
  return useMemo(() => {
    if (stats) {
      return [
        { name: 'All Time', value: stats.feel_all_time?.toFixed(2) },
        { name: moment().year(), value: stats.feel_past_year?.toFixed(2) },
        { name: moment().format('MMMM YYYY'), value: stats.feel_past_month?.toFixed(2) },
        { name: 'This Week', value: stats.feel_past_week?.toFixed(2) }
      ];
    } else {
      return [];
    }
  }, [stats]);
};
