/**
 * Component for a modal that confirms whether administrators want to remove or demote a user from a group.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { GroupMeta, MemberDetails, RootState } from '../../../../redux/types';
import { useSelector } from 'react-redux';

interface Props {
  onClose: () => void;
  onRemove: () => void;
  onDemote: () => void;
  show: boolean;
  isConfirming: boolean;
  member: MemberDetails;
  groupId: number;
}

const useStyles = createUseStyles(styles);

const ConfirmationModal: React.FunctionComponent<Props> = ({
  onClose,
  show,
  isConfirming,
  onRemove,
  onDemote,
  member,
  groupId
}) => {
  const classes = useStyles();

  const groups = useSelector((state: RootState) => state.groups?.group);

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groups, groupId]);

  if (show) {
    return (
      <AJModal backdrop={true} onClickBackground={onClose}>
        <div className={classes.modal} data-cypress="confirmationModal">
          {member.user === 'admin' && (
            <p>
              Are you sure you want to demote{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              from their administrator position in <b>{group.group_title}</b>?
            </p>
          )}
          {member.user !== 'admin' && (
            <p>
              Are you sure you want to remove{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              from <b>{group.group_title}</b>?
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
