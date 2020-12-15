/**
 * Component for picking a team to join.
 * @author Andrew Jarombek
 * @since 12/5/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { TeamMembership } from '../../../redux/types';
import PickGroups from '../PickGroups';
import { AJTag } from 'jarombek-react-components';

interface Props {
  team?: TeamMembership;
  onMembershipTagClick: (team: TeamMembership) => void;
}

const useStyles = createUseStyles(styles);

const PickTeam: React.FunctionComponent<Props> = ({ team, onMembershipTagClick }) => {
  const classes = useStyles({ status: team.status });

  const memberTag = useMemo(() => {
    if (team.status === 'accepted') {
      return `Member - ${team.user.charAt(0).toUpperCase() + team.user.slice(1)}`;
    } else if (team.status === 'pending') {
      return 'Pending';
    } else {
      return 'Non-Member';
    }
  }, [team]);

  const memberTagIcon = useMemo(() => {
    return team.status ? '\u004f' : '\u0050';
  }, [team.status]);

  return (
    <div className={classes.team}>
      <div className={classes.teamTitleHeader}>
        <p className={classes.title}>{team.title}</p>
        <AJTag
          content={
            <div className={classes.memberTagContent} onClick={(): void => onMembershipTagClick(team)}>
              <p>{memberTag}</p>
              <p>{memberTagIcon}</p>
            </div>
          }
          className={classes.memberTag}
        />
      </div>
      <PickGroups groups={team.groups} teamName={team.team_name} />
    </div>
  );
};

export default PickTeam;
