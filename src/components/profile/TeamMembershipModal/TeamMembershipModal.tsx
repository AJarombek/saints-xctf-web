/**
 * Component for a modal that allows users to join or leave teams.
 * @author Andrew Jarombek
 * @since 12/14/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import { RootState, TeamMembership } from '../../../redux/types';
import { useSelector } from 'react-redux';

interface Props {
  team?: TeamMembership;
  onClose: () => void;
  onJoin: (teamName: string) => void;
  onLeave: (teamName: string) => void;
  show: boolean;
  joinedTeam: boolean;
  leftTeam: boolean;
  groupsJoined?: Set<string>;
  groupsLeft?: Set<string>;
}

const useStyles = createUseStyles(styles);

const TeamMembershipsModal: React.FunctionComponent<Props> = ({
  team,
  onClose,
  onJoin,
  onLeave,
  show,
  joinedTeam,
  leftTeam,
  groupsJoined,
  groupsLeft
}) => {
  const classes = useStyles();

  const otherGroups = useSelector((state: RootState) => state.teams.team[team?.team_name]?.groups?.items ?? []);

  const showJoining = useMemo(() => {
    return show && !team?.status && !joinedTeam;
  }, [show, team?.status, joinedTeam]);

  const showLeaving = useMemo(() => {
    return show && team?.status && !leftTeam;
  }, [show, team?.status, leftTeam]);

  const groupsLeavingList = useMemo<string[]>(() => {
    if (showLeaving && team?.groups) {
      const groupsLeftSet = groupsLeft ?? new Set<string>();
      const groupsJoinedSet = groupsJoined ?? new Set<string>();

      return team.groups
        .filter((group) => !groupsLeftSet.has(group.group_name))
        .map((group) => group.group_title)
        .concat(otherGroups.filter((group) => groupsJoinedSet.has(group.group_name)).map((group) => group.group_title));
    } else {
      return null;
    }
  }, [showLeaving, team?.groups, groupsLeft, groupsJoined, otherGroups]);

  if (showJoining || showLeaving) {
    return (
      <AJModal onClickBackground={onClose}>
        <div className={classes.body}>
          <div className={classes.title}>
            {showJoining && (
              <p>
                Are you sure you want to request to join the team <b>{team?.title}</b>?
              </p>
            )}
            {showLeaving && (
              <>
                <p>
                  Are you sure you want to leave the team <b>{team?.title}</b>?{' '}
                  {!!team?.groups.length && 'You will also be removed from the following groups:'}
                </p>
                <p>
                  <b>{groupsLeavingList?.reduce((acc, groupTitle) => `${acc}${groupTitle}, `, '').slice(0, -2)}</b>
                </p>
              </>
            )}
          </div>
          <div className={classes.buttons}>
            <AJButton type="text" onClick={onClose}>
              <p>CANCEL</p>
            </AJButton>
            {showJoining && (
              <AJButton type="contained" onClick={(): void => onJoin(team.team_name)}>
                <p>JOIN</p>
              </AJButton>
            )}
            {showLeaving && (
              <AJButton type="contained" onClick={(): void => onLeave(team.team_name)}>
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
