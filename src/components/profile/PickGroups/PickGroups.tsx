/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember, RootState } from '../../../redux/types';
import PickGroup from '../PickGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamGroups } from '../../../redux/modules/teams';
import GroupMembershipsModal from '../GroupMembershipModal';

interface Props {
  teamName?: string;
  groups?: GroupMember[];
  groupJoinRequests: Set<string>;
  groupLeaveRequests: Set<string>;
  setGroupJoinRequests: Dispatch<SetStateAction<Record<string, Set<string>>>>;
  setGroupLeaveRequests: Dispatch<SetStateAction<Record<string, Set<string>>>>;
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({
  teamName,
  groups,
  groupJoinRequests,
  groupLeaveRequests,
  setGroupJoinRequests,
  setGroupLeaveRequests
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const otherGroups = useSelector((state: RootState) => state.teams.team[teamName]?.groups?.items ?? []);

  const [showMore, setShowMore] = useState(false);

  const [showMembershipModificationModal, setShowMembershipModificationModal] = useState(false);
  const [membershipModificationGroup, setMembershipModificationGroup] = useState<GroupMember>(null);

  const allGroups = useMemo(() => {
    const memberGroups = new Set(groups.map((group) => group.group_name));
    return groups.concat(
      otherGroups
        .filter((group) => !memberGroups.has(group.group_name))
        .map((group) => ({
          group_name: group.group_name,
          group_title: group.group_title,
          status: null,
          user: null
        }))
    );
  }, [groups, otherGroups]);

  const onLoadMore = (): void => {
    setShowMore(true);

    if (!otherGroups.length) {
      dispatch(getTeamGroups(teamName));
    }
  };

  const onShowLess = (): void => {
    setShowMore(false);
  };

  const onMembershipClick = (group: GroupMember): void => {
    if (groupLeaveRequests.has(group.group_name)) {
      setGroupLeaveRequests((leaveRequests) => {
        const newLeaveRequests = { ...leaveRequests };
        const leaveSet = newLeaveRequests[teamName];
        leaveSet.delete(group.group_name);
        return newLeaveRequests;
      });
    } else if (groupJoinRequests.has(group.group_name)) {
      setGroupJoinRequests((joinRequests) => {
        const newJoinRequests = { ...joinRequests };
        const joinSet = newJoinRequests[teamName];
        joinSet.delete(group.group_name);
        return newJoinRequests;
      });
    } else {
      setShowMembershipModificationModal(true);
      setMembershipModificationGroup(group);
    }
  };

  const onCloseMembershipModal = (): void => {
    setShowMembershipModificationModal(false);
  };

  const onJoinGroup = (groupName: string): void => {
    setGroupJoinRequests((joinRequests) => {
      const newJoinRequests = { ...joinRequests };
      const joinSet = newJoinRequests[teamName];

      if (joinSet) {
        joinSet.add(groupName);
      } else {
        const newJoinSet = new Set<string>();
        newJoinSet.add(groupName);
        newJoinRequests[teamName] = newJoinSet;
      }

      return newJoinRequests;
    });
    setShowMembershipModificationModal(false);
  };

  const onLeaveGroup = (groupName: string): void => {
    setGroupLeaveRequests((leaveRequests) => {
      const newLeaveRequests = { ...leaveRequests };
      const leaveSet = newLeaveRequests[teamName];

      if (leaveSet) {
        leaveSet.add(groupName);
      } else {
        const newLeaveSet = new Set<string>();
        newLeaveSet.add(groupName);
        newLeaveRequests[teamName] = newLeaveSet;
      }

      return newLeaveRequests;
    });
    setShowMembershipModificationModal(false);
  };

  if (groups) {
    return (
      <div>
        <div className={classes.pickGroups}>
          {(showMore ? allGroups : groups).map((group) => (
            <PickGroup
              key={`${teamName}-${group.group_name}`}
              group={group}
              onMembershipClick={onMembershipClick}
              joined={groupJoinRequests.has(group.group_name)}
              left={groupLeaveRequests.has(group.group_name)}
            />
          ))}
        </div>
        <div className={classes.showMore}>
          {showMore ? (
            <div onClick={onShowLess}>
              <p>&#x0042;</p>
              <p>Show Less</p>
            </div>
          ) : (
            <div onClick={onLoadMore}>
              <p>&#x0043;</p>
              <p>Load More</p>
            </div>
          )}
        </div>
        <GroupMembershipsModal
          group={membershipModificationGroup}
          onClose={onCloseMembershipModal}
          onJoin={onJoinGroup}
          onLeave={onLeaveGroup}
          show={showMembershipModificationModal}
          joinedGroup={groupJoinRequests.has(membershipModificationGroup?.group_name)}
          leftGroup={groupLeaveRequests.has(membershipModificationGroup?.group_name)}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default PickGroups;
