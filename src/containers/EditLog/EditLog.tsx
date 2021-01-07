/**
 * Container component for the edit exercise log page.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RootState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { userAuthenticated } from '../../utils/auth';
import { setUserFromStorage } from '../../redux/modules/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import LogBody from '../../components/new-edit-log/LogBody';
import { getLog } from '../../redux/modules/logs';
import NotFound from '../../components/shared/NotFound/NotFound';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';

type Props = {};

const useStyles = createUseStyles(styles);

const EditLog: React.FunctionComponent<Props> = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
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
  }, []);

  useEffect(() => {
    if (logId) {
      dispatch(getLog(logId));
    } else {
      setErrorNotFound(true);
    }

    setLogValidated(true);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      dispatch(setUserFromStorage(storedUser));
    } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
      history.push('/');
    }
  }, [users]);

  const log = useMemo(() => {
    return logs[logId];
  }, [logs]);

  if (userAuthenticated(users, auth.signedInUser) && logValidated) {
    return (
      <div className={classes.editLog} ref={ref}>
        <NavBar
          includeHeaders={['profile', 'teams', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        {errorNotFound ? <NotFound /> : <LogBody user={users[auth.signedInUser]?.user} existingLog={log} />}
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default EditLog;
