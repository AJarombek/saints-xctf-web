/**
 * Dashboard component displayed when a user is signed in.  Shows an overview of user activity.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createUseStyles} from "react-jss";
import styles from "./styles";

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import {GroupMembers, NotificationsState, RootState} from "../../redux/types";
import DashboardBody from "../../components/dashboard/DashboardBody/DashboardBody";
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";
import {addComment, logFeed, postComment, deleteLog} from "../../redux/modules/logs";
import {setUserFromStorage} from "../../redux/modules/auth";
import {getGroupMemberships} from "../../redux/modules/memberships";
import {getUserNotifications} from "../../redux/modules/notifications";

const mapStateToProps = (state: RootState) => ({
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Dashboard: React.FunctionComponent<Props> = ({
  auth = {},
  users = {},
  logFeeds = {},
  newComments = {},
  groupMembershipInfo = {} as GroupMembers,
  notificationInfo = {} as NotificationsState,
  deletedLogs,
  getLogFeed,
  postComment,
  addComment,
  setUserFromStorage,
  getGroupMemberships,
  getUserNotifications,
  deleteLog
}) => {
  const { signedInUser } = auth;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      setUserFromStorage(storedUser);
    } else if (!userAuthenticated(users, signedInUser)) {
      history.push('/');
    }
  }, [users]);

  if (userAuthenticated(users, signedInUser)) {
    return (
        <div className={classes.dashboard}>
          <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
          <DashboardBody
              getLogFeed={getLogFeed}
              postComment={postComment}
              logFeeds={logFeeds}
              newComments={newComments}
              user={users[signedInUser]}
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
