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
import { GroupMember, RootState, TeamGroupMapping, TeamInfo, TeamMembership } from '../../../redux/types';
import PickTeam from '../PickTeam';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../../redux/modules/teams';
import classNames from 'classnames';
import TeamMembershipsModal from '../TeamMembershipModal';
import { AJButton } from 'jarombek-react-components';
import { getUserMemberships, updateUserMemberships } from '../../../redux/modules/profile';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';
import AlertPopup from '../../shared/AlertPopup';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface Props {
  teams?: TeamMembership[];
  username: string;
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams, username }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allTeamSearches = useSelector((state: RootState) => state.teams.search);

  const [searchString, setSearchString] = useState('');

  const [showMembershipModificationModal, setShowMembershipModificationModal] = useState(false);
  const [membershipModificationTeam, setMembershipModificationTeam] = useState<TeamMembership>(null);

  const [teamJoinRequests, setTeamJoinRequests] = useState(new Set<string>());
  const [teamLeaveRequests, setTeamLeaveRequests] = useState(new Set<string>());
  const [groupJoinRequests, setGroupJoinRequests] = useState<Record<string, Set<string>>>({});
  const [groupLeaveRequests, setGroupLeaveRequests] = useState<Record<string, Set<string>>>({});

  const [saving, setSaving] = useState(false);
  const [errorUpdatingMemberships, setErrorUpdatingMemberships] = useState(false);
  const [errorGetMemberships, setErrorGetMemberships] = useState(false);

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
    if (teamLeaveRequests.has(team.team_name)) {
      setTeamLeaveRequests((leaveSet) => {
        const newLeaveSet = new Set(leaveSet);
        newLeaveSet.delete(team.team_name);
        return newLeaveSet;
      });
    } else if (teamJoinRequests.has(team.team_name)) {
      setTeamJoinRequests((joinSet) => {
        const newJoinSet = new Set(joinSet);
        newJoinSet.delete(team.team_name);
        return newJoinSet;
      });
    } else {
      setShowMembershipModificationModal(true);
      setMembershipModificationTeam(team);
    }
  };

  const onCloseMembershipModal = (): void => {
    setShowMembershipModificationModal(false);
  };

  const onJoinTeam = (teamName: string): void => {
    setTeamJoinRequests((joinSet) => {
      const newJoinSet = new Set<string>(joinSet);
      newJoinSet.add(teamName);
      return newJoinSet;
    });

    setShowMembershipModificationModal(false);
  };

  const onLeaveTeam = (teamName: string): void => {
    setTeamLeaveRequests((leaveSet) => {
      const newLeaveSet = new Set<string>(leaveSet);
      newLeaveSet.add(teamName);
      return newLeaveSet;
    });

    setGroupJoinRequests((joinRequests) => {
      const newJoinRequests = { ...joinRequests };
      newJoinRequests[teamName] = new Set<string>();
      return newJoinRequests;
    });

    setGroupLeaveRequests((leaveRequests) => {
      const newLeaveRequests = { ...leaveRequests };

      if (teams) {
        const teamMembership: TeamMembership =
          teams.filter((team) => team.team_name === teamName)[0] ?? ({} as TeamMembership);

        teamMembership.groups.forEach((group: GroupMember) => {
          const leaveSet = newLeaveRequests[group.group_name];

          if (leaveSet) {
            leaveSet.add(group.group_name);
          } else {
            const newLeaveSet = new Set<string>();
            newLeaveSet.add(group.group_name);
            newLeaveRequests[teamName] = newLeaveSet;
          }
        });
      }

      return newLeaveRequests;
    });

    setShowMembershipModificationModal(false);
  };

  const getUpdatedMemberships = async (): Promise<void> => {
    const memberships = await dispatch(getUserMemberships(username));

    if (!memberships) {
      setErrorGetMemberships(true);
    }
  };

  const onSaveMemberships = async (): Promise<void> => {
    setSaving(true);

    const teamsJoined = [...teamJoinRequests];
    const teamsLeft = [...teamLeaveRequests];
    let groupsJoined: TeamGroupMapping[] = [];
    let groupsLeft: TeamGroupMapping[] = [];

    Object.entries(groupJoinRequests).forEach(
      ([teamName, groups]) =>
        (groupsJoined = groupsJoined.concat(
          [...groups].map((groupName) => ({ team_name: teamName, group_name: groupName } as TeamGroupMapping))
        ))
    );

    Object.entries(groupLeaveRequests).forEach(
      ([teamName, groups]) =>
        (groupsLeft = groupsLeft.concat(
          [...groups].map((groupName) => ({ team_name: teamName, group_name: groupName } as TeamGroupMapping))
        ))
    );

    const result = await dispatch(updateUserMemberships(username, teamsJoined, teamsLeft, groupsJoined, groupsLeft));

    if (result) {
      setErrorUpdatingMemberships(false);
      await getUpdatedMemberships();
    } else {
      setErrorUpdatingMemberships(true);
    }

    setSaving(false);
  };

  const onCancelChanges = (): void => {
    setTeamJoinRequests(new Set<string>());
    setTeamLeaveRequests(new Set<string>());
    setGroupJoinRequests({});
    setGroupLeaveRequests({});
  };

  return (
    <>
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
              <PickTeam
                team={team}
                key={team.team_name}
                onMembershipTagClick={onMembershipTagClick}
                joined={teamJoinRequests.has(team.team_name)}
                left={teamLeaveRequests.has(team.team_name)}
                groupJoinRequests={groupJoinRequests[team.team_name] ?? new Set<string>()}
                groupLeaveRequests={groupLeaveRequests[team.team_name] ?? new Set<string>()}
                setGroupJoinRequests={setGroupJoinRequests}
                setGroupLeaveRequests={setGroupLeaveRequests}
              />
            ))}
        </div>
        <TeamMembershipsModal
          team={membershipModificationTeam}
          onClose={onCloseMembershipModal}
          onJoin={onJoinTeam}
          onLeave={onLeaveTeam}
          show={showMembershipModificationModal}
          joinedTeam={teamJoinRequests.has(membershipModificationTeam?.team_name)}
          leftTeam={teamLeaveRequests.has(membershipModificationTeam?.team_name)}
          groupsJoined={groupJoinRequests[membershipModificationTeam?.team_name]}
          groupsLeft={groupLeaveRequests[membershipModificationTeam?.team_name]}
        />
      </div>
      <div className={classes.actions}>
        <AJButton
          type="contained"
          disabled={false}
          onClick={onSaveMemberships}
          className={classNames(classes.submitButton, saving && classes.disabledSubmitButton)}
        >
          <p>{saving ? 'Saving Teams & Groups...' : 'Save Teams & Groups'}</p>
          {saving && <LoadingSpinner className={classes.buttonSpinner} />}
        </AJButton>
        <AJButton type="text" disabled={false} onClick={onCancelChanges} className={classes.cancelButton}>
          Cancel
        </AJButton>
      </div>
      {errorUpdatingMemberships && (
        <DefaultErrorPopup
          message="Failed to update your team and group memberships"
          onClose={(): void => setErrorUpdatingMemberships(false)}
        />
      )}
      {errorGetMemberships && (
        <AlertPopup
          message={
            <div className={classes.alertMessage}>
              <p>
                Failed to retrieve your new team and group memberships. If this error persists, contact{' '}
                <a className={classes.emailLink} href="mailto:andrew@jarombek.com">
                  andrew@jarombek.com
                </a>
                .
              </p>
              <p onClick={getUpdatedMemberships} className={classes.retry}>
                Retry
              </p>
            </div>
          }
          onClose={(): void => setErrorGetMemberships(false)}
          type="error"
        />
      )}
    </>
  );
};

export default PickTeams;
