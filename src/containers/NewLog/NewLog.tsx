/**
 * Container component for the create new exercise log page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, { useRef } from 'react';
import { RootState } from '../../redux/types';
import { useSelector } from 'react-redux';
import { userAuthenticated } from '../../utils/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import LogBody from '../../components/new-edit-log/LogBody';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useSignInCheck } from '../../hooks/shared';

type Props = {};

const useStyles = createUseStyles(styles);

const NewLog: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useSignInCheck();

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.newLog} ref={ref}>
        <NavBar
          includeHeaders={['profile', 'teams', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <LogBody user={users[auth.signedInUser]?.user} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default NewLog;
