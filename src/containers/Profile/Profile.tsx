/**
 * Container component for a users profile page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { RootState } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { userAuthenticated } from '../../utils/auth';
import { setUserFromStorage } from '../../redux/modules/auth';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import ProfileBody, { ProfileTab } from '../../components/profile/ProfileBody/ProfileBody';
import { getUser, setUser } from '../../redux/modules/profile';
import { useAdminCheck, useHeaders, useSignInCheck } from '../../hooks/shared';
import NotFound from '../../components/shared/NotFound';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['teams', 'dashboard', 'signOut', 'logo'];

const Profile: React.FunctionComponent<Props> = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const authUsers = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.profile.users);
  const rangeViews = useSelector((state: RootState) => state.rangeView.users);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

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

  const defaultTab: ProfileTab = useMemo(() => {
    if (location.hash) {
      return location.hash.slice(1) as ProfileTab;
    } else {
      return ProfileTab.LOGS;
    }
  }, [location.hash]);

  const profileUser = useMemo(() => {
    return users[username] ?? {};
  }, [username, users]);

  useEffect(() => {
    if (
      auth.signedInUser &&
      !profileUser.user?.isFetching &&
      !profileUser.user?.username &&
      !profileUser.user?.serverError
    ) {
      if (auth.signedInUser === username && authUsers[username]) {
        dispatch(setUser(authUsers[username]?.user));
      } else if (username) {
        dispatch(getUser(username));
      }
    }
  }, [
    auth.signedInUser,
    authUsers,
    dispatch,
    profileUser.user?.isFetching,
    profileUser.user?.serverError,
    profileUser.user?.username,
    username
  ]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.profile} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        {profileUser.user?.username && (
          <ProfileBody
            user={profileUser.user}
            signedInUser={users[auth.signedInUser]?.user}
            flair={profileUser.flair}
            stats={profileUser.stats}
            rangeViews={rangeViews[username]}
            defaultTab={defaultTab}
          />
        )}
        {profileUser.user?.serverError && <NotFound fullPage={true} />}
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Profile;
