/**
 * Component for a single group member shown from the group admin view.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { MemberDetails } from '../../../redux/types';
import { AJButton, AJTag } from 'jarombek-react-components';
import { useDispatch } from 'react-redux';
import ConfirmationModal from './ConfirmationModal';
import { deleteGroupMembership, updateGroupMembership } from '../../../redux/modules/memberships';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';
import { getGroupMembers } from '../../../redux/modules/groups';
import classNames from 'classnames';

interface Props {
  member: MemberDetails;
  groupId: number;
}

const useStyles = createUseStyles(styles);

const CurrentMember: React.FunctionComponent<Props> = ({ member, groupId }) => {
  const classes = useStyles({ user: member.user });

  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [errorUpdatingMembership, setErrorUpdatingMembership] = useState(false);
  const [errorDeletingMembership, setErrorDeletingMembership] = useState(false);

  const onDemote = async (): Promise<void> => {
    setIsConfirming(true);

    const newMemberDetails = { user: 'user', status: member.status };
    const result = await dispatch(updateGroupMembership(newMemberDetails, groupId, member.username));

    setIsConfirming(false);
    setShowConfirmation(false);

    if (!result) {
      setErrorUpdatingMembership(true);
    } else {
      dispatch(getGroupMembers(groupId));
    }
  };

  const onRemove = async (): Promise<void> => {
    setIsConfirming(true);

    const result = await dispatch(deleteGroupMembership(groupId, member.username));

    setIsConfirming(false);
    setShowConfirmation(false);

    if (!result) {
      setErrorDeletingMembership(true);
    } else {
      dispatch(getGroupMembers(groupId));
    }
  };

  return (
    <>
      <div className={classes.currentMember} data-cypress="currentMember">
        <p className={classes.name}>
          {member.first} {member.last}
        </p>
        <AJTag
          content={
            <div className={classes.memberTypeContent}>
              {member.user.charAt(0).toUpperCase() + member.user.slice(1)}
            </div>
          }
          className={classNames(classes.memberTypeTag, 'memberTypeTag')}
        />
        <AJButton
          type="outlined"
          disabled={false}
          onClick={(): void => setShowConfirmation(true)}
          className={classNames(classes.removeAction, 'actionButton')}
        >
          {member.user === 'admin' ? 'Demote' : 'Remove'}
        </AJButton>
      </div>
      <ConfirmationModal
        onClose={(): void => setShowConfirmation(false)}
        onDemote={onDemote}
        onRemove={onRemove}
        show={showConfirmation}
        isConfirming={isConfirming}
        member={member}
        groupId={groupId}
      />
      {errorUpdatingMembership && (
        <DefaultErrorPopup
          message="An unexpected error occurred while updating a users membership"
          onClose={(): void => setErrorUpdatingMembership(false)}
          closeable={true}
        />
      )}
      {errorDeletingMembership && (
        <DefaultErrorPopup
          message="An unexpected error occurred while revoking a users membership"
          onClose={(): void => setErrorDeletingMembership(false)}
          closeable={true}
        />
      )}
    </>
  );
};

export default CurrentMember;
