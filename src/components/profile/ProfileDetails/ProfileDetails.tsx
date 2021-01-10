/**
 * Component for a tab on the profile page which shows details about a user's profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta, StatsMeta } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import { getUserStats } from '../../../redux/modules/profile';
import StatisticSection from '../../shared/StatisticSection/StatisticSection';
import moment from 'moment';
import classNames from 'classnames';
import { useStatsExercises, useStatsFeeling, useStatsRunning } from '../../../hooks/stats';

interface Props {
  user: UserMeta;
  stats: StatsMeta;
}

const useStyles = createUseStyles(styles);

const ProfileDetails: React.FunctionComponent<Props> = ({ user, stats }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.username && !stats && !stats?.isFetching && !stats?.serverError) {
      dispatch(getUserStats(user.username));
    }
  }, [user, stats, dispatch]);

  const exerciseStats = useStatsExercises(stats);
  const runningStats = useStatsRunning(stats);
  const feelStats = useStatsFeeling(stats);

  return (
    <div className={classes.profileDetails}>
      <div className={classNames(classes.profileDetail, classes.defaultText)}>
        <p>Member Since:</p>
        <p>{moment(user.member_since).format('MMM Do, YYYY')}</p>
      </div>
      {!!user.class_year && (
        <div className={classes.profileDetail}>
          <p className={classes.normal}>Class of</p>
          <p className={classes.strong}>{user.class_year}</p>
        </div>
      )}
      {!!user.favorite_event && (
        <div className={classNames(classes.profileDetail, classes.defaultText)}>
          <p>Favorite Event:</p>
          <p>{user.favorite_event}</p>
        </div>
      )}
      {!!user.description && (
        <div className={classNames(classes.profileDetail, classes.description)}>
          <p className={classes.thin}>{user.description}</p>
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

export default ProfileDetails;
