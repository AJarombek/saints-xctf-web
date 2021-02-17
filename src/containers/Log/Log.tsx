/**
 * Container component for the exercise log page.
 * @author Andrew Jarombek
 * @since 2/17/2021
 */

import React, { useMemo, useRef } from 'react';
import { RootState } from '../../redux/types';
import { useSelector } from 'react-redux';
import { userAuthenticated } from '../../utils/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useAdminCheck, useHeaders, useSignInCheck } from '../../hooks/shared';
import { useRouteMatch } from 'react-router-dom';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['dashboard', 'profile', 'teams', 'signOut', 'logo'];

const Log: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const routeMatch = useRouteMatch();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

  const logId = useMemo(() => {
    const { id: groupId } = routeMatch.params as { id: string };
    return +groupId;
  }, [routeMatch.params]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.log} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Log;
