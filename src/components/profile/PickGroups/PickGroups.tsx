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

  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [groupLeaveRequests, setGroupLeaveRequests] = useState([]);

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

  if (groups) {
    return (
      <div>
        <div className={classes.pickGroups}>
          {(showMore ? allGroups : groups).map((group) => (
            <PickGroup key={`${teamName}-${group.group_name}`} group={group} />
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
      </div>
    );
  } else {
    return null;
  }
};

export default PickGroups;
