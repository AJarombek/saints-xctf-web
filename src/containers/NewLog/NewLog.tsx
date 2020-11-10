/**
 * Container component for the create new exercise log page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, {useEffect, useRef} from 'react';
import {RootState} from '../../redux/types';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {userAuthenticated} from '../../utils/auth';
import {setUserFromStorage} from '../../redux/modules/auth';
import {createUseStyles} from 'react-jss';
import styles from './styles';
import NavBar from '../../components/shared/NavBar';
import LogBody from '../../components/new-edit-log/LogBody';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';

type Props = {}

const useStyles = createUseStyles(styles);

const NewLog: React.FunctionComponent<Props> = () => {
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
  }, [users]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.newLog} ref={ref}>
        <NavBar
          includeHeaders={['profile', 'groups', 'admin', 'signOut', 'logo']}
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
