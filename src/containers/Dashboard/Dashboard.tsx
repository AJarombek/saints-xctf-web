/**
 * Dashboard component displayed when a user is signed in.  Shows an overview of user activity.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import {RootState} from '../../redux/types';
import DashboardBody from '../../components/dashboard/DashboardBody/DashboardBody';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import {setUserFromStorage} from '../../redux/modules/auth';

type Props = {}

const useStyles = createUseStyles(styles);

const Dashboard: React.FunctionComponent<Props> = () => {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      dispatch(setUserFromStorage(storedUser));
    } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
      history.push('/');
    }
  }, [users, auth.signedInUser]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.dashboard} ref={ref}>
        <NavBar
          includeHeaders={['profile', 'groups', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <DashboardBody
          user={users[auth.signedInUser]?.user}
        />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Dashboard;
