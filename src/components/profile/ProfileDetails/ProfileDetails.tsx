/**
 * Component for a tab on the profile page which shows a details about a user's profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta, UserStatsMeta } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import { getUserStats } from '../../../redux/modules/profile';
import StatisticSection from '../StatisticSection/StatisticSection';

interface Props {
  user: UserMeta;
  stats: UserStatsMeta;
}

const useStyles = createUseStyles(styles);

const ProfileDetails: React.FunctionComponent<Props> = ({ user, stats }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.username && !stats && !stats.isFetching && !stats.serverError) {
      dispatch(getUserStats(user.username));
    }
  }, [user, stats, dispatch]);

  return (
    <div className={classes.profileDetails}>
      <p>Member Since: {user.member_since}</p>
      <StatisticSection title="Exercise Statistics" sections={[]} />
      <StatisticSection title="Running Statistics" sections={[]} />
      <StatisticSection title="Feel Statistics" sections={[]} />
    </div>
  );
};

export default ProfileDetails;
