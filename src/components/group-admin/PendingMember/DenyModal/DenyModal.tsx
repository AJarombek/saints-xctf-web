/**
 * Component for a modal that confirms whether administrators want to deny a pending membership.
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
  onClose: () => void;
  onDeny: () => void;
  show: boolean;
  isDenying: boolean;
  member: MemberDetails;
  groupId: number;
}

const useStyles = createUseStyles(styles);

const DenyModal: React.FunctionComponent<Props> = ({ onClose, onDeny, show, isDenying, member, groupId }) => {
  const classes = useStyles();

  const groups = useSelector((state: RootState) => state.groups?.group);

  const group: GroupMeta = useMemo(() => {
    return groups ? groups[groupId] : null;
  }, [groups, groupId]);

  if (show) {
    return (
      <AJModal backdrop={true} onClickBackground={onClose}>
        <div className={classes.modal}>
          <p>
            Are you sure you want to deny the membership request made by{' '}
            <b>
              {member.first} {member.last}{' '}
            </b>
            for the group <b>{group.group_title}</b>?
          </p>
          <div className={classes.modalButtons}>
            <AJButton
              type="contained"
              onClick={onDeny}
              className={isDenying && classes.disabledButton}
              disabled={isDenying}
            >
              <p>{isDenying ? 'DENYING' : 'DENY'}</p>
              {isDenying && <LoadingSpinner className={classes.spinner} />}
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

export default DenyModal;
