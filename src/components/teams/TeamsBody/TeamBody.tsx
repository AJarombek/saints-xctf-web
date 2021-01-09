/**
 * TeamsBody component which shows a list of teams and the groups in them.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta, Memberships, RootState, TeamMembership, User, Users } from '../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMemberships } from '../../../redux/modules/profile';
import { getTeamGroups } from '../../../redux/modules/teams';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const TeamsBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);
  const teams = useSelector((state: RootState) => state.teams.team);

  const [memberships, setMemberships] = useState<Memberships>(null);

  useEffect(() => {
    dispatch(getUserMemberships(user.username));
  }, [dispatch, user.username]);

  useEffect(() => {
    if (userProfiles && user.username) {
      setMemberships(userProfiles[user.username]?.memberships);
    }
  }, [userProfiles, user.username]);

  useEffect(() => {
    if (memberships?.teams) {
      memberships.teams.forEach((membership: TeamMembership) => {
        dispatch(getTeamGroups(membership.team_name));
      });
    }
  }, [memberships, dispatch]);

  return (
    <div className={classes.teamsBody}>
      <h3 className={classes.title}>Select a group.</h3>
      <div className={classes.container}>
        {memberships?.teams?.map((membership) => (
          <div key={membership.team_name}>
            <h4 className={classes.teamTitle}>{membership.title}</h4>
            <div className={classes.groups}>
              {teams[membership.team_name]?.groups?.items?.map((group: GroupMeta) => (
                <div className={classes.group}>
                  <p className={classes.groupTitle}>{group.group_title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsBody;
