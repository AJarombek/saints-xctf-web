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
import { useHistory } from 'react-router-dom';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const TeamsBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);
  const teams = useSelector((state: RootState) => state.teams.team);

  const [memberships, setMemberships] = useState<TeamMembership[]>(null);

  useEffect(() => {
    if (userProfiles && user?.username && !userProfiles[user.username]?.memberships) {
      dispatch(getUserMemberships(user.username));
    }
  }, [dispatch, user.username, userProfiles]);

  useEffect(() => {
    if (userProfiles && user.username) {
      setMemberships(userProfiles[user.username]?.memberships?.teams?.filter((team) => team.status === 'accepted'));
    }
  }, [userProfiles, user.username]);

  useEffect(() => {
    if (memberships) {
      memberships.forEach((membership: TeamMembership) => {
        dispatch(getTeamGroups(membership.team_name));
      });
    }
  }, [memberships, dispatch]);

  return (
    <div className={classes.teamsBody}>
      <h3 className={classes.title}>Select a group.</h3>
      <div className={classes.container}>
        {memberships?.map((membership) => (
          <div key={membership.team_name}>
            <h4 className={classes.teamTitle}>{membership.title}</h4>
            <div className={classes.groups}>
              {teams[membership.team_name]?.groups?.items?.map((group: GroupMeta) => (
                <div className={classes.group} onClick={(): void => history.push(`group/${group.id}`)}>
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
