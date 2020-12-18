/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { useMemo, useState } from 'react';
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
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({ teamName, groups }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const otherGroups = useSelector((state: RootState) => state.teams.team[teamName]?.groups?.items ?? []);

  const [showMore, setShowMore] = useState(false);

  const [groupJoinRequests, setGroupJoinRequests] = useState(new Set<string>());
  const [groupLeaveRequests, setGroupLeaveRequests] = useState(new Set<string>());

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
      setGroupLeaveRequests((leaveSet) => {
        const newLeaveSet = new Set(leaveSet);
        newLeaveSet.delete(group.group_name);
        return newLeaveSet;
      });
    } else if (groupJoinRequests.has(group.group_name)) {
      setGroupJoinRequests((joinSet) => {
        const newJoinSet = new Set(joinSet);
        newJoinSet.delete(group.group_name);
        return newJoinSet;
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
    setGroupJoinRequests((joinSet) => {
      const newJoinSet = new Set<string>(joinSet);
      newJoinSet.add(groupName);
      return newJoinSet;
    });
    setShowMembershipModificationModal(false);
  };

  const onLeaveGroup = (groupName: string): void => {
    setGroupLeaveRequests((leaveSet) => {
      const newLeaveSet = new Set<string>(leaveSet);
      newLeaveSet.add(groupName);
      return newLeaveSet;
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
