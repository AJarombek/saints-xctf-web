/**
 * AdminBody component which shows a list of teams and the groups in them.  Only teams and groups that the user is an
 * admin for are shown.
 * @author Andrew Jarombek
 * @since 1/15/2021
 */

import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember, RootState, TeamMembership, User, Users } from '../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMemberships } from '../../../redux/modules/profile';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const AdminBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);

  useEffect(() => {
    if (userProfiles && user?.username && !userProfiles[user.username]?.memberships) {
      dispatch(getUserMemberships(user.username));
    }
  }, [dispatch, user.username, userProfiles]);

  const memberships: TeamMembership[] = useMemo(() => {
    if (userProfiles && user.username) {
      return userProfiles[user.username]?.memberships?.teams?.filter((membership) => membership?.groups?.length);
    } else {
      return null;
    }
  }, [userProfiles, user.username]);

  return (
    <div className={classes.adminBody}>
      <h3 className={classes.title}>Select a group to view its administrator dashboard.</h3>
      <div className={classes.container}>
        {memberships?.map((membership: TeamMembership) => (
          <div key={membership.team_name}>
            <h4 className={classes.teamTitle}>{membership.title}</h4>
            <div className={classes.groups}>
              {membership.groups?.map((groupMember: GroupMember) => (
                <div className={classes.group} onClick={(): void => navigate(`admin/group/${groupMember.group_id}`)}>
                  <p className={classes.groupTitle}>{groupMember.group_title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBody;
