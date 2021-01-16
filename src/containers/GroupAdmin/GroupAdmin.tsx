/**
 * Admin page for a group.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import { GroupMeta, RootState } from '../../redux/types';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import { useSignInCheck } from '../../hooks/shared';
import GroupAdminBody from '../../components/group-admin/GroupAdminBody/GroupAdminBody';
import { useRouteMatch } from 'react-router-dom';

type Props = {};

const useStyles = createUseStyles(styles);

const GroupAdmin: React.FunctionComponent<Props> = () => {
  const routeMatch = useRouteMatch();
  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups?.group);

  const ref = useRef(null);

  useSignInCheck();

  const group: GroupMeta = useMemo(() => {
    if (groups) {
      const { id: groupId } = routeMatch.params as { id: string };
      return groups[groupId];
    } else {
      return null;
    }
  }, [routeMatch.params, groups]);

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.groupAdmin} ref={ref}>
        <NavBar
          includeHeaders={['dashboard', 'profile', 'teams', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <GroupAdminBody group={group} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default GroupAdmin;
