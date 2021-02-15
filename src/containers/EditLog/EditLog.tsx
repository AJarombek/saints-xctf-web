/**
 * Container component for the edit exercise log page.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RootState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { userAuthenticated } from '../../utils/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import LogBody from '../../components/new-edit-log/LogBody';
import { getLog } from '../../redux/modules/logs';
import NotFound from '../../components/shared/NotFound/NotFound';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useAdminCheck, useHeaders, useSignInCheck } from '../../hooks/shared';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['profile', 'teams', 'signOut', 'logo'];

const EditLog: React.FunctionComponent<Props> = () => {
  const routeMatch = useRouteMatch();
  const classes = useStyles();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const logs = useSelector((state: RootState) => state.logs.items);

  const ref = useRef(null);

  const [logValidated, setLogValidated] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);

  const logId = useMemo(() => {
    const urlPaths = routeMatch.url.split('/');
    return +urlPaths[urlPaths.length - 1];
  }, [routeMatch.url]);

  useEffect(() => {
    if (logId) {
      dispatch(getLog(logId));
    } else {
      setErrorNotFound(true);
    }

    setLogValidated(true);
  }, [dispatch, logId]);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

  const log = useMemo(() => {
    return logs[logId];
  }, [logs, logId]);

  if (userAuthenticated(users, auth.signedInUser) && logValidated) {
    return (
      <div className={classes.editLog} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        {errorNotFound ? (
          <NotFound fullPage={true} />
        ) : (
          <LogBody user={users[auth.signedInUser]?.user} existingLog={log} />
        )}
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default EditLog;
