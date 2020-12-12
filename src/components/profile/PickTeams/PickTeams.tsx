/**
 * Component for picking teams to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { TeamMembership } from '../../../redux/types';
import PickTeam from '../PickTeam';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';

interface Props {
  teams?: TeamMembership[];
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  const [searchString, setSearchString] = useState('');

  return (
    <div className={classes.pickTeams}>
      <div>
        <ImageInput
          type="text"
          name="team"
          placeholder="Search Teams"
          status={ImageInputStatus.NONE}
          onChange={(e): void => setSearchString(e.target.value)}
        />
      </div>
      <div>{!!teams && teams.map((team) => <PickTeam team={team} key={team.team_name} />)}</div>
    </div>
  );
};

export default PickTeams;
