/**
 * Dashboard component displayed when a user is signed in.  Shows an overview of user activity.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import { RootState } from '../../redux/types';
import DashboardBody from '../../components/dashboard/DashboardBody/DashboardBody';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useAdminCheck, useHeaders, useScrollToTop, useSignInCheck } from '../../hooks/shared';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['profile', 'teams', 'createNewLog', 'signOut', 'logo'];

const Dashboard: React.FunctionComponent<Props> = () => {
  useScrollToTop();

  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.dashboard} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        <DashboardBody user={users[auth.signedInUser]?.user} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Dashboard;
