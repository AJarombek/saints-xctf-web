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
import { useAdminCheck, useSignInCheck } from '../../hooks/shared';
import GroupAdminBody from '../../components/group-admin/GroupAdminBody/GroupAdminBody';
import { useParams } from 'react-router-dom';

type Props = {};

const useStyles = createUseStyles(styles);

const GroupAdmin: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups?.group);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck();

  const { id: groupId } = useParams();

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groups, groupId]);

  if (userAuthenticated(users, auth.signedInUser) && isAdmin) {
    return (
      <div className={classes.groupAdmin} ref={ref}>
        <NavBar
          includeHeaders={['dashboard', 'profile', 'teams', 'createNewLog', 'admin', 'signOut', 'logo']}
          user={users[auth.signedInUser]?.user}
          bodyRef={ref}
        />
        <GroupAdminBody group={group} groupId={+groupId} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default GroupAdmin;
