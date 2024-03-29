/**
 * Container component for the exercise log page.
 * @author Andrew Jarombek
 * @since 2/17/2021
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { RootState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthenticated } from '../../utils/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useAdminCheck, useHeaders, useSetTitle, useSignInCheck } from '../../hooks/shared';
import { useParams } from 'react-router-dom';
import ExerciseLog from '../../components/shared/ExerciseLog';
import { getLog } from '../../redux/modules/logs';
import NotFound from '../../components/shared/NotFound';
import { AJLoadingDots } from 'jarombek-react-components';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['dashboard', 'profile', 'teams', 'createNewLog', 'signOut', 'logo'];

const Log: React.FunctionComponent<Props> = () => {
  useSetTitle('SaintsXCTF');

  const classes = useStyles();

  const { id: logId } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const logs = useSelector((state: RootState) => state.logs.items);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

  useEffect(() => {
    if (logId) {
      dispatch(getLog(+logId));
    }
  }, [dispatch, logId]);

  const log = useMemo(() => {
    return logs[logId];
  }, [logs, logId]);

  const errorNotFound = useMemo(() => {
    return !logId || log?.serverError;
  }, [log?.serverError, logId]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.log} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        {errorNotFound && <NotFound fullPage={true} />}
        {!errorNotFound && (
          <div className={classes.logBody}>
            {!!log?.log_id && <ExerciseLog log={log} user={users[auth.signedInUser]?.user} inFeed={false} />}
            {!log && (
              <div className={classes.loading}>
                <AJLoadingDots />
              </div>
            )}
          </div>
        )}
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Log;
