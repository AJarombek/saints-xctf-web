/**
 * DashboardBody component which shows a paginated log feed and drawer of navigation links.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import React, {useEffect, useMemo, useState} from 'react';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import DashboardSidePanel from '../DashboardSidePanel/DashboardSidePanel';
import LogFeed from '../../shared/LogFeed/LogFeed';
import PaginationBar from '../../shared/PaginationBar/PaginationBar';
import {LogFeeds, RootState, User} from '../../../redux/types';
import {useDispatch, useSelector} from 'react-redux';
import {logFeed} from '../../../redux/modules/logs';
import {getGroupMemberships} from '../../../redux/modules/memberships';
import {getUserNotifications} from '../../../redux/modules/notifications';

interface Props {
    user: User;
}

const useStyles = createUseStyles(styles);

const DashboardBody: React.FunctionComponent<Props> = ({
  user
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const logFeeds: LogFeeds = useSelector((state: RootState) => state.logs.feeds);
  const groupMembershipInfo = useSelector((state: RootState) => state.memberships.groups);
  const notificationInfo = useSelector((state: RootState) => state.notifications);

  const [page, setPage] = useState(1);

  const filterBy = 'all';
  const bucket = 'all';

  useEffect(() => {
    dispatch(logFeed(filterBy, bucket, 10, 10 * (page - 1)));
  }, [filterBy, bucket, page]);

  useEffect(() => {
    if (user) {
      if (!groupMembershipInfo.items) {
        dispatch(getGroupMemberships(user.username));
      }

      if (!notificationInfo.items) {
        dispatch(getUserNotifications(user.username));
      }
    }
  }, [user, groupMembershipInfo, notificationInfo]);

  const totalPages: number = useMemo(() => {
    return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.pages ?? 0
  }, [logFeeds, page]);

  return (
    <div className={classes.dashboardBody}>
      <div className={classes.sidePanel}>
        <DashboardSidePanel
          user={user}
          groupMemberships={groupMembershipInfo.items}
          notificationInfo={notificationInfo}
        />
      </div>
      <div className={classes.mainPanel}>
        <LogFeed
          logFeeds={logFeeds}
          page={page}
          user={user}
          filterBy={filterBy}
          bucket={bucket}
        />
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
