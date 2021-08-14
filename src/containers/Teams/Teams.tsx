/**
 * Teams component representing a page that displays all the teams that a user is a member of.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import { RootState } from '../../redux/types';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useAdminCheck, useHeaders, useScrollToTop, useSetTitle, useSignInCheck } from '../../hooks/shared';
import TeamsBody from '../../components/teams/TeamsBody/TeamsBody';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['dashboard', 'profile', 'createNewLog', 'signOut', 'logo'];

const Teams: React.FunctionComponent<Props> = () => {
  useSetTitle('SaintsXCTF');

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
      <div className={classes.teams} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        <TeamsBody user={users[auth.signedInUser]?.user} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Teams;
