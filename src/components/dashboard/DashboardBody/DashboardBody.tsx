/**
 * DashboardBody component which shows a paginated log feed and drawer of navigation links.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import DashboardSidePanel from '../DashboardSidePanel/DashboardSidePanel';
import LogFeed from '../../shared/LogFeed/LogFeed';
import PaginationBar from '../../shared/PaginationBar/PaginationBar';
import { LogFeeds, Memberships, RootState, TeamMembership, User, Users } from '../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { logFeed } from '../../../redux/modules/logs';
import { getUserNotifications } from '../../../redux/modules/notifications';
import { getUserMemberships } from '../../../redux/modules/profile';
import { getTeamGroups } from '../../../redux/modules/teams';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const logFeeds: LogFeeds = useSelector((state: RootState) => state.logs.feeds);
  const notificationInfo = useSelector((state: RootState) => state.notifications);
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);

  const [page, setPage] = useState(1);
  const [memberships, setMemberships] = useState<Memberships>(null);
  const [membershipsRetrieved, setMembershipsRetrieved] = useState(false);

  const filterBy = 'all';
  const bucket = 'all';

  useEffect(() => {
    dispatch(logFeed(filterBy, bucket, 10, 10 * (page - 1)));
  }, [filterBy, bucket, page, dispatch]);

  useEffect(() => {
    if (user) {
      if (!notificationInfo.items) {
        dispatch(getUserNotifications(user.username));
      }
    }
  }, [user, notificationInfo, dispatch]);

  useEffect(() => {
    if (userProfiles && user?.username && !userProfiles[user.username]?.memberships?.teams && !membershipsRetrieved) {
      setMembershipsRetrieved(true);
      dispatch(getUserMemberships(user.username));
    }
  }, [dispatch, user.username, userProfiles, membershipsRetrieved]);

  useEffect(() => {
    if (userProfiles && user.username) {
      setMemberships(userProfiles[user.username]?.memberships);
    }
  }, [userProfiles, user.username]);

  useEffect(() => {
    if (memberships?.teams) {
      memberships.teams.forEach((membership: TeamMembership) => {
        dispatch(getTeamGroups(membership.team_name));
      });
    }
  }, [memberships, dispatch]);

  const totalPages: number = useMemo(() => {
    return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.pages ?? 0;
  }, [logFeeds, page]);

  return (
    <div className={classes.dashboardBody}>
      <div className={classes.sidePanel}>
        <DashboardSidePanel user={user} teamMemberships={memberships?.teams} notificationInfo={notificationInfo} />
      </div>
      <div className={classes.mainPanel}>
        <LogFeed logFeeds={logFeeds} page={page} user={user} filterBy={filterBy} bucket={bucket} />
        <PaginationBar
          page={page}
          totalPages={totalPages}
          onChangePage={(page): void => {
            setPage(page);
            window.scrollTo(0, 0);
          }}
        />
      </div>
    </div>
  );
};

export default DashboardBody;
