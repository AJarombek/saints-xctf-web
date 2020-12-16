/**
 * Component for a modal that allows users to join or leave teams.
 * @author Andrew Jarombek
 * @since 12/14/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import { TeamMembership } from '../../../redux/types';

interface Props {
  team?: TeamMembership;
  onClose: () => void;
  onJoin: () => void;
  onLeave: () => void;
  show: boolean;
  joinedTeam: boolean;
  leftTeam: boolean;
}

const useStyles = createUseStyles(styles);

const TeamMembershipsModal: React.FunctionComponent<Props> = ({
  team,
  onClose,
  onJoin,
  onLeave,
  show,
  joinedTeam,
  leftTeam
}) => {
  const classes = useStyles();

  const showJoining = useMemo(() => {
    return show && !team.status && !joinedTeam;
  }, [show, team.status, joinedTeam]);

  const showLeaving = useMemo(() => {
    return show && team.status && !leftTeam;
  }, [show, team.status, leftTeam]);

  if (showJoining || showLeaving) {
    return (
      <AJModal onClickBackground={onClose}>
        <div className={classes.body}>
          <div>
            <p>Are you sure you want to join</p>
            <p>{team?.title}</p>
          </div>
          <div>
            {showJoining && (
              <AJButton type="contained" onClick={onJoin}>
                <p>JOIN</p>
              </AJButton>
            )}
            {showLeaving && (
              <AJButton type="contained" onClick={onLeave}>
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

export default TeamMembershipsModal;
