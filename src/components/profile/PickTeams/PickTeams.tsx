/**
 * Component for picking teams to join.
 * I want you to do whatever makes you happy.  If for you that is in my direction, I will love you the best I'm
 * capable of.  If its somewhere else, I'll be so happy that you are doing what you dream of.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { ChangeEvent, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { RootState, TeamInfo, TeamMembership } from '../../../redux/types';
import PickTeam from '../PickTeam';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../../redux/modules/teams';
import classNames from 'classnames';
import TeamMembershipsModal from '../TeamMembershipModal';

interface Props {
  teams?: TeamMembership[];
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allTeamSearches = useSelector((state: RootState) => state.teams.search);

  const [searchString, setSearchString] = useState('');
  const [addedTeams, setAddedTeams] = useState([]);

  const [showMembershipModificationModal, setShowMembershipModificationModal] = useState(false);
  const [membershipModificationTeam, setMembershipModificationTeam] = useState<TeamMembership>(null);

  const [teamJoinRequests, setTeamJoinRequests] = useState(new Set());
  const [teamLeaveRequests, setTeamLeaveRequests] = useState(new Set());

  const teamSet = useMemo(() => {
    return new Set(teams?.map((team) => team.team_name) ?? []);
  }, [teams]);

  const searchedTeamMatches = useMemo(() => {
    const matches = allTeamSearches[searchString]?.items ?? [];
    return matches.filter((teamInfo) => !teamSet.has(teamInfo.name));
  }, [allTeamSearches, searchString, teamSet]);

  const onChangeTeamSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchText = e.target.value;
    setSearchString(searchText);

    if (searchText && !allTeamSearches[searchText]?.items?.length) {
      dispatch(searchTeams(searchText));
    }
  };

  const onMembershipTagClick = (team: TeamMembership): void => {
    setShowMembershipModificationModal(true);
    setMembershipModificationTeam(team);
  };

  const onCloseMembershipModal = (): void => {
    setShowMembershipModificationModal(false);
  };

  const onJoinTeam = (): void => {

  };

  const onLeaveTeam = (): void => {

  };

  return (
    <div className={classes.pickTeams}>
      <div className={classNames(classes.search, !!searchedTeamMatches.length && classes.successfulSearch)}>
        <ImageInput
          type="text"
          name="team"
          placeholder="Search Teams"
          status={ImageInputStatus.NONE}
          onChange={onChangeTeamSearch}
        />
        <div className={classes.searchedTeams}>
          {searchedTeamMatches.map((team: TeamInfo) => (
            <div className={classes.searchedTeam} key={team.name}>
              <p>{team.title}</p>
              <p>&#x4c;</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {!!teams &&
          teams.map((team) => (
            <PickTeam team={team} key={team.team_name} onMembershipTagClick={onMembershipTagClick} />
          ))}
      </div>
      <TeamMembershipsModal
        team={membershipModificationTeam}
        onClose={onCloseMembershipModal}
        onJoin={onJoinTeam}
        onLeave={onLeaveTeam}
        show={showMembershipModificationModal}
        joinedTeam={teamJoinRequests.has(membershipModificationTeam.team_name)}
        leftTeam={teamLeaveRequests.has(membershipModificationTeam.team_name)}
      />
    </div>
  );
};

export default PickTeams;
