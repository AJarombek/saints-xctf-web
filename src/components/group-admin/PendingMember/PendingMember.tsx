/**
 * Component to manage the users in a group.  Admins have the ability to remove users, make users admins, and accept
 * new users.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { MemberDetails } from '../../../redux/types';
import { AJButton } from 'jarombek-react-components';
import { useDispatch } from 'react-redux';
import { getGroupMembers } from '../../../redux/modules/groups';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';
import AcceptDenyModal from './AcceptDenyModal';
import { deleteGroupMembership, updateGroupMembership } from '../../../redux/modules/memberships';

interface Props {
  member: MemberDetails;
  groupId: number;
}

const useStyles = createUseStyles(styles);

const PendingMember: React.FunctionComponent<Props> = ({ member, groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [showAcceptDenyModal, setShowAcceptDenyModal] = useState(false);
  const [isDenying, setIsDenying] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [errorAcceptingMembership, setErrorAcceptingMembership] = useState(false);
  const [errorDenyingMembership, setErrorDenyingMembership] = useState(false);

  const onDenyInit = (): void => {
    setIsDenying(true);
    setShowAcceptDenyModal(true);
  };

  const onDenyConfirm = async (): Promise<void> => {
    setInProgress(true);

    const result = await dispatch(deleteGroupMembership(groupId, member.username));

    setShowAcceptDenyModal(false);
    setIsDenying(false);
    setInProgress(false);

    if (!result) {
      setErrorDenyingMembership(true);
    } else {
      dispatch(getGroupMembers(groupId));
    }
  };

  const onAcceptInit = (): void => {
    setIsAccepting(true);
    setShowAcceptDenyModal(true);
  };

  const onAcceptConfirm = async (): Promise<void> => {
    setIsAccepting(true);
    setInProgress(true);

    const newMemberDetails = { user: 'user', status: 'accepted' };
    const result = await dispatch(updateGroupMembership(newMemberDetails, groupId, member.username));

    setShowAcceptDenyModal(false);
    setIsAccepting(false);
    setInProgress(false);

    if (!result) {
      setErrorAcceptingMembership(true);
    } else {
      dispatch(getGroupMembers(groupId));
    }
  };

  const onCancel = (): void => {
    setIsDenying(false);
    setIsAccepting(false);
    setShowAcceptDenyModal(false);
  };

  return (
    <>
      <div key={member.username} className={classes.pendingMember}>
        <p className={classes.name}>
          {member.first} {member.last}
        </p>
        <div className={classes.pendingMemberActions}>
          <AJButton type="text" onClick={onDenyInit} disabled={false}>
            Deny
          </AJButton>
          <AJButton type="contained" onClick={onAcceptInit} disabled={false}>
            Accept
          </AJButton>
        </div>
      </div>
      <AcceptDenyModal
        action={isAccepting ? 'accept' : isDenying ? 'deny' : null}
        onClose={onCancel}
        onAccept={onAcceptConfirm}
        onDeny={onDenyConfirm}
        show={showAcceptDenyModal}
        inProgress={inProgress}
        member={member}
        groupId={groupId}
      />
      {errorAcceptingMembership && (
        <DefaultErrorPopup
          message="An unexpected error occurred while accepting a users membership request.  Please try again."
          onClose={(): void => setErrorAcceptingMembership(false)}
        />
      )}
      {errorDenyingMembership && (
        <DefaultErrorPopup
          message="An unexpected error occurred while denying a users membership request.  Please try again."
          onClose={(): void => setErrorDenyingMembership(false)}
        />
      )}
    </>
  );
};

export default PendingMember;
