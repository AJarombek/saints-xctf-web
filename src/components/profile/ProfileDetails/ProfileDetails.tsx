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
import Alert from '../../shared/Alert';

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
    <div className={classes.profileDetails} id="profileDetails">
      {user.username && (
        <>
          <div className={classNames(classes.profileDetail, classes.defaultText)} data-cypress="memberSince">
            <p>Member Since: </p>
            <p>{moment(user.member_since).format('MMM Do, YYYY')}</p>
          </div>
          {!!user.class_year && (
            <div className={classes.profileDetail} data-cypress="classYear">
              <p className={classes.normal}>Class of </p>
              <p className={classes.strong}>{user.class_year}</p>
            </div>
          )}
          {!!user.favorite_event && (
            <div className={classNames(classes.profileDetail, classes.defaultText)} data-cypress="favoriteEvent">
              <p>Favorite Event: </p>
              <p>{user.favorite_event}</p>
            </div>
          )}
          {!!user.description && (
            <div className={classNames(classes.profileDetail, classes.description)} data-cypress="description">
              <p className={classes.thin}>{user.description}</p>
            </div>
          )}
        </>
      )}
      <div className={classes.statisticSections}>
        {!stats?.isFetching && !stats?.serverError && stats?.miles_all_time && (
          <>
            <StatisticSection title="Exercise Statistics" stats={exerciseStats} />
            <StatisticSection title="Running Statistics" stats={runningStats} />
            <StatisticSection title="Feel Statistics" stats={feelStats} />
          </>
        )}
        {stats?.serverError && (
          <div className={classes.alertMessage}>
            <Alert message={stats.serverError} type="error" closeable={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
