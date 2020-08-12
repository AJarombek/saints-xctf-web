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
import {RootState} from "../../redux/types";
import DashboardBody from "../../components/dashboard/DashboardBody/DashboardBody";
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";
import {addComment, logFeed, postComment} from "../../redux/modules/logs";
import {setUserFromStorage} from "../../redux/modules/auth";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.auth,
  users: state.auth.user,
  logFeeds: state.logs.feeds,
  newComments: state.logs.newComments
});

const mapDispatchToProps = {
  getLogFeed: logFeed,
  postComment: postComment,
  setUserFromStorage: setUserFromStorage,
  addComment: addComment,
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
  getLogFeed,
  postComment,
  addComment,
  setUserFromStorage
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
              groupMemberships={}
              addComment={addComment}
          />
          <HomeFooter />
        </div>
    );
  } else {
    return null;
  }
};

export default connector(Dashboard);
