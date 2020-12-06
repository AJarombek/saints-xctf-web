/**
 * Component for picking teams to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { TeamMembership } from '../../../redux/types';
import PickTeam from '../PickTeam';

interface Props {
  teams?: TeamMembership[];
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  return (
    <div className={classes.pickTeams}>
      {!!teams && teams.map((team) => <PickTeam team={team} key={team.team_name} />)}
    </div>
  );
};

export default PickTeams;
