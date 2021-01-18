/**
 * Component for a modal that confirms whether administrators want to remove or demote a user from a group.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { MemberDetails } from '../../../../redux/types';

interface Props {
  onClose: () => void;
  onRemove: () => void;
  onDemote: () => void;
  show: boolean;
  isConfirming: boolean;
  member: MemberDetails;
}

const useStyles = createUseStyles(styles);

const ConfirmationModal: React.FunctionComponent<Props> = ({
  onClose,
  show,
  isConfirming,
  onRemove,
  onDemote,
  member
}) => {
  const classes = useStyles();

  if (show) {
    return (
      <AJModal backdrop={true} onClickBackground={onClose}>
        <div className={classes.modal}>
          {member.user === 'admin' && (
            <p>
              Are you sure you want to demote{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              from their administrator position in <b>Group Name</b>?
            </p>
          )}
          {member.user !== 'admin' && (
            <p>
              Are you sure you want to remove{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              from <b>Group Name</b>?
            </p>
          )}
          <div className={classes.modalButtons}>
            <AJButton
              type="contained"
              onClick={(): void => (member.user === 'admin' ? onDemote() : onRemove())}
              className={isConfirming && classes.disabledButton}
              disabled={isConfirming}
            >
              {member.user === 'admin' && <p>{isConfirming ? 'DEMOTING' : 'DEMOTE'}</p>}
              {member.user !== 'admin' && <p>{isConfirming ? 'REMOVING' : 'REMOVE'}</p>}
              {isConfirming && <LoadingSpinner className={classes.spinner} />}
            </AJButton>
            <AJButton type="outlined" onClick={onClose}>
              <p>CANCEL</p>
            </AJButton>
          </div>
        </div>
      </AJModal>
    );
  } else {
    return null;
  }
};

export default ConfirmationModal;
