/**
 * Component to manage the users in a group.  Admins have the ability to remove users, make users admins, and accept
 * new users.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { MemberDetailsMeta, RootState } from '../../../redux/types';
import { getGroupMembers } from '../../../redux/modules/groups';

interface Props {
  groupId: number;
}

const useStyles = createUseStyles(styles);

const ManageUsers: React.FunctionComponent<Props> = ({ groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const membersInfo = useSelector((state: RootState) => state.groups.members ?? {});

  useEffect(() => {
    const groupMembers: MemberDetailsMeta = membersInfo[groupId];
    if (!groupMembers?.items && !groupMembers?.isFetching && !groupMembers?.serverError) {
      dispatch(getGroupMembers(+groupId));
    }
  }, [dispatch, groupId, membersInfo]);

  const members = useMemo(() => {
    return membersInfo[groupId]?.items ?? [];
  }, [membersInfo, groupId]);

  return <div className={classes.manageUsers}>Manage Users</div>;
};

export default ManageUsers;
