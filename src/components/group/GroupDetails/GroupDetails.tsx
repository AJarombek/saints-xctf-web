/**
 * Component for a tab on the group page which shows details about the group.
 * @author Andrew Jarombek
 * @since 1/9/2021
 */

import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta, StatsMeta } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import StatisticSection from '../../shared/StatisticSection/StatisticSection';
import { useStatsExercises, useStatsFeeling, useStatsRunning } from '../../../hooks/stats';
import { getGroupStats } from '../../../redux/modules/groups';

interface Props {
  group: GroupMeta;
  stats: StatsMeta;
}

const useStyles = createUseStyles(styles);

const GroupDetails: React.FunctionComponent<Props> = ({ group, stats }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (group?.id && !stats && !stats?.isFetching && !stats?.serverError) {
      dispatch(getGroupStats(group.id));
    }
  }, [group, stats, dispatch]);

  const exerciseStats = useStatsExercises(stats);
  const runningStats = useStatsRunning(stats);
  const feelStats = useStatsFeeling(stats);

  return (
    <div className={classes.groupDetails}>
      {!!group.description && (
        <div className={classes.description}>
          <p>{group.description}</p>
        </div>
      )}
      <div className={classes.statisticSections}>
        <StatisticSection title="Exercise Statistics" stats={exerciseStats} />
        <StatisticSection title="Running Statistics" stats={runningStats} />
        <StatisticSection title="Feel Statistics" stats={feelStats} />
      </div>
    </div>
  );
};

export default GroupDetails;
