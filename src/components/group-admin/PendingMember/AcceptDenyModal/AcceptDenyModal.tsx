/**
 * Component for a modal that confirms whether administrators want to accept or deny a pending membership.
 * @author Andrew Jarombek
 * @since 1/18/2021
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { GroupMeta, MemberDetails, RootState } from '../../../../redux/types';
import { useSelector } from 'react-redux';

interface Props {
  action: 'accept' | 'deny';
  onClose: () => void;
  onAccept: () => void;
  onDeny: () => void;
  show: boolean;
  inProgress: boolean;
  member: MemberDetails;
  groupId: number;
}

const useStyles = createUseStyles(styles);

const AcceptDenyModal: React.FunctionComponent<Props> = ({
  action,
  onClose,
  onAccept,
  onDeny,
  show,
  inProgress,
  member,
  groupId
}) => {
  const classes = useStyles();

  const groups = useSelector((state: RootState) => state.groups?.group);

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groups, groupId]);

  const onConfirm = (): void => {
    return action === 'accept' ? onAccept() : action === 'deny' ? onDeny() : null;
  };

  if (show) {
    return (
      <AJModal backdrop={true} onClickBackground={onClose}>
        <div className={classes.modal}>
          {action === 'accept' && (
            <p>
              Are you sure you want to accept{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              as a member in <b>{group.group_title}</b>?
            </p>
          )}
          {action === 'deny' && (
            <p>
              Are you sure you want to deny the membership request made by{' '}
              <b>
                {member.first} {member.last}{' '}
              </b>
              for the group <b>{group.group_title}</b>?
            </p>
          )}
          <div className={classes.modalButtons}>
            <AJButton
              type="contained"
              onClick={onConfirm}
              className={inProgress && classes.disabledButton}
              disabled={inProgress}
            >
              {action === 'accept' && <p>{inProgress ? 'ACCEPTING' : 'ACCEPT MEMBERSHIP'}</p>}
              {action === 'deny' && <p>{inProgress ? 'DENYING' : 'DENY MEMBERSHIP'}</p>}
              {inProgress && <LoadingSpinner className={classes.spinner} />}
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

export default AcceptDenyModal;
