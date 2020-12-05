/**
 * Component for picking teams to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { TeamMembership } from '../../../redux/types';
import PickGroups from '../PickGroups';

interface Props {
  teams?: TeamMembership[];
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  return (
    <div className={classes.pickTeams}>
      {teams.map((team) => (
        <div className={classes.team} key={team.team_name}>
          <p>{team.team_title}</p>
          <PickGroups groups={team.groups} />
        </div>
      ))}
      <PickGroups />
    </div>
  );
};

export default PickTeams;
