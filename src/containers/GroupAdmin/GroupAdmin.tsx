/**
 * Admin page for a group.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import { RootState } from '../../redux/types';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useSignInCheck } from '../../hooks/shared';

type Props = {};

const useStyles = createUseStyles(styles);

const GroupAdmin: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useSignInCheck();

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.groupAdmin} ref={ref}>
        <NavBar
          includeHeaders={['dashboard', 'profile', 'teams', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default GroupAdmin;
