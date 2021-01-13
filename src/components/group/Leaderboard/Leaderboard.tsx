/**
 * Component for a tab on the group page which shows a leaderboard of the group members exercises.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExerciseFilters,
  GroupMeta,
  LeaderboardInterval,
  LeaderboardItem,
  Leaderboards,
  RootState
} from '../../../redux/types';
import { getGroupLeaderboard } from '../../../redux/modules/groups';
import FilterButtons from '../../shared/FilterButtons';
import { AJSelect } from 'jarombek-react-components';

const useStyles = createUseStyles(styles);

interface Props {
  group: GroupMeta;
}

const Leaderboard: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allLeaderboards: Record<string, Leaderboards> = useSelector((state: RootState) => state.groups.leaderboards);

  const [interval, setInterval] = useState<LeaderboardInterval>('all');

  const [selectedFilters, setSelectedFilters] = useState<ExerciseFilters>({
    run: true,
    bike: false,
    swim: false,
    other: false
  });

  useEffect(() => {
    if (group?.id) {
      dispatch(getGroupLeaderboard(group.id, interval));
    }
  }, [group, dispatch, interval]);

  const leaderboard: LeaderboardItem[] = useMemo(() => {
    if (group?.id) {
      const groupLeaderboard: Leaderboards = allLeaderboards[group.id] ?? {};
      return groupLeaderboard[interval]?.items;
    } else {
      return [];
    }
  }, [allLeaderboards, group.id, interval]);

  return (
    <div className={classes.leaderboard}>
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Calendar Filters:</p>
        <FilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <div className={classes.interval}>
        <AJSelect
          options={[
            { content: 'All Time', value: 'all' },
            { content: 'Past Year', value: 'year' },
            { content: 'Past Month', value: 'month' },
            { content: 'Past Week', value: 'week' }
          ]}
          defaultOption={0}
          onClickListOption={(item: { content: string; value: string }): void =>
            setInterval(item.value as LeaderboardInterval)
          }
        />
      </div>
    </div>
  );
};

export default Leaderboard;
