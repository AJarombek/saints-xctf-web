/**
 * Component for a tab on the profile page which shows a details about a user's profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta, UserStatsMeta } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import { getUserStats } from '../../../redux/modules/profile';
import StatisticSection from '../StatisticSection/StatisticSection';
import moment from 'moment';
import classNames from 'classnames';

interface Props {
  user: UserMeta;
  stats: UserStatsMeta;
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

  const exerciseStats = useMemo(() => {
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

  const runningStats = useMemo(() => {
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

  const feelStats = useMemo(() => {
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
