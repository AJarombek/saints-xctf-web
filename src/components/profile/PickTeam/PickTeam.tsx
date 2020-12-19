/**
 * Component for picking a team to join.
 * @author Andrew Jarombek
 * @since 12/5/2020
 */

import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { TeamMembership } from '../../../redux/types';
import PickGroups from '../PickGroups';
import { AJTag } from 'jarombek-react-components';

interface Props {
  team?: TeamMembership;
  onMembershipTagClick: (team: TeamMembership) => void;
  joined: boolean;
  left: boolean;
  groupJoinRequests: Set<string>;
  groupLeaveRequests: Set<string>;
  setGroupJoinRequests: Dispatch<SetStateAction<Record<string, Set<string>>>>;
  setGroupLeaveRequests: Dispatch<SetStateAction<Record<string, Set<string>>>>;
}

const useStyles = createUseStyles(styles);

const PickTeam: React.FunctionComponent<Props> = ({
  team,
  onMembershipTagClick,
  joined,
  left,
  groupJoinRequests,
  groupLeaveRequests,
  setGroupJoinRequests,
  setGroupLeaveRequests
}) => {
  const classes = useStyles({ status: joined ? 'pending' : left ? null : team.status });

  const memberTag = useMemo(() => {
    if (team.status === 'accepted' && !left) {
      return `Member - ${team.user.charAt(0).toUpperCase() + team.user.slice(1)}`;
    } else if ((team.status === 'pending' && !left) || joined) {
      return 'Pending';
    } else {
      return 'Non-Member';
    }
  }, [team, joined, left]);

  const memberTagIcon = useMemo(() => {
    return (team.status && !left) || joined ? '\u004f' : '\u0050';
  }, [team.status, joined, left]);

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
      <PickGroups
        groups={team.groups}
        teamName={team.team_name}
        groupJoinRequests={groupJoinRequests}
        groupLeaveRequests={groupLeaveRequests}
        setGroupJoinRequests={setGroupJoinRequests}
        setGroupLeaveRequests={setGroupLeaveRequests}
      />
    </div>
  );
};

export default PickTeam;
