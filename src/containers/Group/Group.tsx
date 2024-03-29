/**
 * Group component displaying details about a group within a team.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import { GroupMeta, RootState } from '../../redux/types';
import HomeFooter from '../../components/home/HomeFooter/HomeFooter';
import GroupBody from '../../components/group/GroupBody';
import { useAdminCheck, useHeaders, useScrollToTop, useSetTitle, useSignInCheck } from '../../hooks/shared';
import { useParams } from 'react-router-dom';

type Props = {};

const useStyles = createUseStyles(styles);

const defaultHeaders = ['dashboard', 'profile', 'teams', 'createNewLog', 'signOut', 'logo'];

const Group: React.FunctionComponent<Props> = () => {
  useScrollToTop();

  const { id: groupId } = useParams();
  const classes = useStyles();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups?.group);

  const ref = useRef(null);

  useSignInCheck();
  const isAdmin = useAdminCheck(false);
  const headers = useHeaders(defaultHeaders, isAdmin);

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groupId, groups]);

  useSetTitle(group?.group_title ? `${group.group_title} | SaintsXCTF` : 'SaintsXCTF');

  if (userAuthenticated(users, auth.signedInUser)) {
    return (
      <div className={classes.group} ref={ref}>
        <NavBar includeHeaders={headers} user={users[auth.signedInUser]?.user} bodyRef={ref} />
        <GroupBody user={users[auth.signedInUser]?.user} group={group} />
        <HomeFooter showContactUs={false} />
      </div>
    );
  } else {
    return null;
  }
};

export default Group;
