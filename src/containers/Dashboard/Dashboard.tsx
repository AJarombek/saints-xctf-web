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
import {logFeed, postComment} from "../../redux/modules/logs";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.auth,
  user: state.auth.user,
  logFeeds: state.logs.feeds,
  newComments: state.logs.newComments
});

const mapDispatchToProps = {
  getLogFeed: logFeed,
  postComment
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Dashboard: React.FunctionComponent<Props> = ({
  auth = {},
  user = {},
  logFeeds = {},
  newComments = {},
  getLogFeed,
  postComment
}) => {
  const { signedIn } = auth;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!userAuthenticated(user, signedIn)) {
      history.push('/');
    }
  }, [user]);

  if (userAuthenticated(user, signedIn)) {
    return (
        <div className={classes.dashboard}>
          <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
          <DashboardBody
              getLogFeed={getLogFeed}
              postComment={postComment}
              logFeeds={logFeeds}
              newComments={newComments}
              user={user}
          />
          <HomeFooter />
        </div>
    );
  } else {
    return null;
  }
};

export default connector(Dashboard);
