/**
 * Component for a modal that allows users to join or leave groups.
 * @author Andrew Jarombek
 * @since 12/16/2020
 */

import { GroupMember } from '../../../redux/types';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import React, { useMemo } from 'react';
import { AJButton, AJModal } from 'jarombek-react-components';

interface Props {
  group?: GroupMember;
  onClose: () => void;
  onJoin: (groupName: string) => void;
  onLeave: (groupName: string) => void;
  show: boolean;
  joinedGroup: boolean;
  leftGroup: boolean;
}

const useStyles = createUseStyles(styles);

const GroupMembershipsModal: React.FunctionComponent<Props> = ({
  group,
  onClose,
  onJoin,
  onLeave,
  show,
  joinedGroup,
  leftGroup
}) => {
  const classes = useStyles();

  const showJoining = useMemo(() => {
    return show && !group?.status && !joinedGroup;
  }, [show, group?.status, joinedGroup]);

  const showLeaving = useMemo(() => {
    return show && group?.status && !leftGroup;
  }, [show, group?.status, leftGroup]);

  if (showJoining || showLeaving) {
    return (
      <AJModal onClickBackground={onClose}>
        <div className={classes.body}>
          <div className={classes.title}>
            {showJoining && (
              <p>
                Are you sure you want to request to join the group <b>{group?.group_title}</b>?
              </p>
            )}
            {showLeaving && (
              <>
                <p>
                  Are you sure you want to leave the group <b>{group?.group_title}</b>?
                </p>
              </>
            )}
          </div>
          <div className={classes.buttons}>
            <AJButton type="text" onClick={onClose}>
              <p>CANCEL</p>
            </AJButton>
            {showJoining && (
              <AJButton type="contained" onClick={(): void => onJoin(group.group_name)}>
                <p>JOIN</p>
              </AJButton>
            )}
            {showLeaving && (
              <AJButton type="contained" onClick={(): void => onLeave(group.group_name)}>
                <p>LEAVE</p>
              </AJButton>
            )}
          </div>
        </div>
      </AJModal>
    );
  } else {
    return null;
  }
};

export default GroupMembershipsModal;
