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

interface Props {
  member: MemberDetails;
}

const useStyles = createUseStyles(styles);

const CurrentMember: React.FunctionComponent<Props> = ({ member }) => {
  const classes = useStyles({ user: member.user });

  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const onDemote = async (): Promise<void> => {
    setIsConfirming(true);

    await dispatch(null);

    setIsConfirming(false);
    setShowConfirmation(false);
  };

  const onRemove = async (): Promise<void> => {
    setIsConfirming(true);

    await dispatch(null);

    setIsConfirming(false);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className={classes.currentMember}>
        <p className={classes.name}>
          {member.first} {member.last}
        </p>
        <AJTag
          content={
            <div className={classes.memberTypeContent}>
              {member.user.charAt(0).toUpperCase() + member.user.slice(1)}
            </div>
          }
          className={classes.memberTypeTag}
        />
        <AJButton
          type="outlined"
          disabled={false}
          onClick={(): void => setShowConfirmation(true)}
          className={classes.removeAction}
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
      />
    </>
  );
};

export default CurrentMember;
