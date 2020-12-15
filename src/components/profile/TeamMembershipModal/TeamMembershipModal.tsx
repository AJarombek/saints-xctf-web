/**
 * Component for a modal that allows users to join or leave teams.
 * @author Andrew Jarombek
 * @since 12/14/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJModal } from 'jarombek-react-components';
import { TeamMembership } from '../../../redux/types';

interface Props {
  team?: TeamMembership;
  onClose: () => void;
  show: boolean;
}

const useStyles = createUseStyles(styles);

const TeamMembershipsModal: React.FunctionComponent<Props> = ({ team, onClose, show }) => {
  const classes = useStyles();

  if (show) {
    return (
      <AJModal onClickBackground={onClose}>
        <div className={classes.body}>
          <p>Are you sure you want to join</p>
          <p>{team?.title}</p>
        </div>
      </AJModal>
    );
  } else {
    return null;
  }
};

export default TeamMembershipsModal;
