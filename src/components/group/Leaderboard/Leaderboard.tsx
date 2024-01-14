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
  LeaderboardItem as LeaderboardItemType,
  LeaderboardItemMeta,
  Leaderboards,
  RootState,
} from '../../../redux/types';
import { getGroupLeaderboard } from '../../../redux/modules/groups';
import FilterButtons from '../../shared/FilterButtons';
import { AJSelect } from 'jarombek-react-components';
import LeaderboardItem from '../LeaderboardItem';
import Alert from '../../shared/Alert';
import classNames from 'classnames';

const useStyles = createUseStyles(styles);

export type CurrentLeaderboardItem = {
  username: string;
  first: string;
  last: string;
  value: number;
};

interface Props {
  group: GroupMeta;
}

const Leaderboard: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allLeaderboards: Record<string, Leaderboards> = useSelector((state: RootState) => state.groups.leaderboards);

  const [interval, setInterval] = useState<LeaderboardInterval>('week');

  const [selectedFilters, setSelectedFilters] = useState<ExerciseFilters>({
    run: true,
    bike: false,
    swim: false,
    other: false,
  });

  useEffect(() => {
    if (group?.id && !(allLeaderboards[group.id] && allLeaderboards[group.id][interval])) {
      dispatch(getGroupLeaderboard(group.id, interval));
    }
  }, [group, dispatch, interval, allLeaderboards]);

  const leaderboardItemMeta: LeaderboardItemMeta = useMemo(() => {
    if (group?.id) {
      const groupLeaderboard: Leaderboards = allLeaderboards[group.id] ?? {};
      return groupLeaderboard[interval];
    } else {
      return null;
    }
  }, [allLeaderboards, group.id, interval]);

  const leaderboardItems: LeaderboardItemType[] = useMemo(() => {
    return leaderboardItemMeta ? leaderboardItemMeta?.items : [];
  }, [leaderboardItemMeta]);

  const currentLeaderboard: CurrentLeaderboardItem[] = useMemo(() => {
    return (
      leaderboardItems
        ?.map((item: LeaderboardItemType) => ({
          username: item.username,
          first: item.first,
          last: item.last,
          value:
            (selectedFilters.run ? item.miles_run : 0) +
            (selectedFilters.bike ? item.miles_biked : 0) +
            (selectedFilters.swim ? item.miles_swam : 0) +
            (selectedFilters.other ? item.miles_other : 0),
        }))
        .sort((a: CurrentLeaderboardItem, b: CurrentLeaderboardItem) => b.value - a.value)
        .filter((item: CurrentLeaderboardItem) => item.value > 0) ?? []
    );
  }, [selectedFilters, leaderboardItems]);

  const leaderMiles: number = useMemo(() => {
    return currentLeaderboard.length ? currentLeaderboard[0].value : 0;
  }, [currentLeaderboard]);

  return (
    <div id="leaderboard" className={classes.leaderboard}>
      <div className={classes.filters}>
        <p className={classes.filterTitle}>Leaderboard Filters:</p>
        <FilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <div className={classes.interval}>
        <AJSelect
          options={[
            { content: 'All Time', value: 'all' },
            { content: 'Past Year', value: 'year' },
            { content: 'Past Month', value: 'month' },
            { content: 'Past Week', value: 'week' },
          ]}
          defaultOption={4}
          onClickListOption={(item: { content: string; value: string }): void =>
            setInterval(item.value as LeaderboardInterval)
          }
          className={classNames(classes.select, 'leaderboardInterval')}
        />
      </div>
      {!!currentLeaderboard?.length && (
        <div className={classes.barChart}>
          {currentLeaderboard.map((item: CurrentLeaderboardItem) => (
            <LeaderboardItem key={item.username} item={item} leaderMiles={leaderMiles} />
          ))}
        </div>
      )}
      {!currentLeaderboard?.length &&
        leaderboardItemMeta &&
        !leaderboardItemMeta?.isFetching &&
        !!leaderboardItemMeta?.serverError && (
          <div className={classes.alertMessage} data-cypress="leaderboardAlert">
            <Alert message={leaderboardItemMeta.serverError} type="error" closeable={false} />
          </div>
        )}
      {!currentLeaderboard?.length &&
        leaderboardItemMeta &&
        !leaderboardItemMeta?.isFetching &&
        !!leaderboardItemMeta?.serverWarning && (
          <div className={classes.alertMessage} data-cypress="leaderboardAlert">
            <Alert message={leaderboardItemMeta.serverWarning} type="warning" closeable={false} />
          </div>
        )}
      {!currentLeaderboard?.length &&
        leaderboardItemMeta &&
        !leaderboardItemMeta?.isFetching &&
        !leaderboardItemMeta?.serverWarning &&
        !leaderboardItemMeta?.serverError && (
          <div className={classes.alertMessage} data-cypress="leaderboardAlert">
            <Alert
              message="There is no leaderboard data in this time interval with the current filters."
              type="warning"
              closeable={false}
            />
          </div>
        )}
    </div>
  );
};

export default Leaderboard;
