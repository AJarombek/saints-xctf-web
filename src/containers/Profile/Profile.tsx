/**
 * Container component for a users profile page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { RootState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { userAuthenticated } from '../../utils/auth';
import { setUserFromStorage } from '../../redux/modules/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import ProfileBody from '../../components/profile/ProfileBody/ProfileBody';
import { getUser, setUser } from '../../redux/modules/profile';

type Props = {};

const useStyles = createUseStyles(styles);

const Profile: React.FunctionComponent<Props> = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const authUsers = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.profile.users);
  const rangeViews = useSelector((state: RootState) => state.rangeView.users);

  const ref = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(authUsers).length && storedUser) {
      dispatch(setUserFromStorage(storedUser));
      dispatch(setUser(storedUser));
    } else if (!userAuthenticated(authUsers, auth.signedInUser) && !storedUser) {
      history.push('/');
    }
  }, [authUsers, auth.signedInUser, history, dispatch]);

  const username = useMemo(() => {
    const urlPaths = routeMatch.url.split('/');
    return urlPaths[urlPaths.length - 1];
  }, [routeMatch.url]);

  useEffect(() => {
    if (auth.signedInUser && !users[username]?.user?.isFetching && !users[username]?.user?.username) {
      if (auth.signedInUser === username && authUsers[username]) {
        dispatch(setUser(authUsers[username]?.user));
      } else {
        dispatch(getUser(username));
      }
    }
  }, [auth.signedInUser, authUsers, username, users, dispatch]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.profile} ref={ref}>
        <NavBar
          includeHeaders={['teams', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <ProfileBody
          user={users[username]?.user}
          flair={users[username]?.flair}
          stats={users[username]?.stats}
          rangeViews={rangeViews[username]}
        />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Profile;
