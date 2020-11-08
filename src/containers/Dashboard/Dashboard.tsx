/**
 * Dashboard component displayed when a user is signed in.  Shows an overview of user activity.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, {useEffect, useRef} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createUseStyles} from 'react-jss';
import styles from './styles';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import {Auth, GroupMembers, LogFeeds, NewComments, NotificationsState, RootState, Users} from '../../redux/types';
import DashboardBody from '../../components/dashboard/DashboardBody/DashboardBody';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import {addComment, logFeed, postComment, deleteLog} from '../../redux/modules/logs';
import {setUserFromStorage, signOut} from '../../redux/modules/auth';
import {getGroupMemberships} from '../../redux/modules/memberships';
import {getUserNotifications} from '../../redux/modules/notifications';

const mapStateToProps = (state: RootState): object => ({
  auth: state.auth.auth,
  users: state.auth.user,
  logFeeds: state.logs.feeds,
  newComments: state.logs.newComments,
  groupMembershipInfo: state.memberships.groups,
  notificationInfo: state.notifications,
  deletedLogs: state.logs.deletedLogs
});

const mapDispatchToProps = {
  getLogFeed: logFeed,
  postComment: postComment,
  setUserFromStorage: setUserFromStorage,
  addComment: addComment,
  getGroupMemberships: getGroupMemberships,
  getUserNotifications: getUserNotifications,
  deleteLog: deleteLog,
  signOut: signOut
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Dashboard: React.FunctionComponent<Props> = ({
  auth = {} as Auth,
  users = {} as Users,
  logFeeds = {} as LogFeeds,
  newComments = {} as NewComments,
  groupMembershipInfo = {} as GroupMembers,
  notificationInfo = {} as NotificationsState,
  deletedLogs,
  getLogFeed,
  postComment,
  addComment,
  setUserFromStorage,
  getGroupMemberships,
  getUserNotifications,
  deleteLog,
  signOut
}: Props) => {
  const history = useHistory();
  const classes = useStyles();

  const ref = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      setUserFromStorage(storedUser);
    } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
      history.push('/');
    }
  }, [users, auth.signedInUser]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.dashboard} ref={ref}>
        <NavBar
          includeHeaders={['profile', 'groups', 'admin', 'signOut', 'logo']}
          signOut={signOut}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <DashboardBody
          getLogFeed={getLogFeed}
          postComment={postComment}
          logFeeds={logFeeds}
          newComments={newComments}
          user={users[auth.signedInUser]?.user}
          groupMemberships={groupMembershipInfo.items}
          notificationInfo={notificationInfo}
          deletedLogs={deletedLogs}
          getGroupMemberships={getGroupMemberships}
          getUserNotifications={getUserNotifications}
          deleteLog={deleteLog}
          addComment={addComment}
        />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default connector(Dashboard);
