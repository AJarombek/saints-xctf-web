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
import { MemberDetails, MemberDetailsMeta, RootState } from '../../../redux/types';
import { getGroupMembers } from '../../../redux/modules/groups';
import CurrentMember from '../CurrentMember';
import PendingMember from '../PendingMember';

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

  const members: MemberDetails[] = useMemo(() => {
    return membersInfo[groupId]?.items ?? [];
  }, [membersInfo, groupId]);

  const pendingMembers: MemberDetails[] = useMemo(() => {
    return members.filter((member) => member.status === 'pending');
  }, [members]);

  const currentMembers: MemberDetails[] = useMemo(() => {
    return members.filter((member) => member.status === 'accepted');
  }, [members]);

  return (
    <div className={classes.manageUsers} id="manageUsers">
      <h3 className={classes.title}>Manage Users</h3>
      <div className={classes.container}>
        {!!pendingMembers.length && <h4 className={classes.category}>Pending Members</h4>}
        {pendingMembers.map((member) => (
          <PendingMember member={member} key={member.username} groupId={groupId} />
        ))}
        {!!currentMembers.length && <h4 className={classes.category}>Current Members</h4>}
        {currentMembers.map((member) => (
          <CurrentMember member={member} key={member.username} groupId={groupId} />
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
