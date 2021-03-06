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
import { useNavigate } from 'react-router-dom';
import Alert from '../../shared/Alert';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const TeamsBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);
  const teams = useSelector((state: RootState) => state.teams.team);

  const [memberships, setMemberships] = useState<TeamMembership[]>(null);
  const [membershipsError, setMembershipsError] = useState<boolean>(false);

  useEffect(() => {
    if (userProfiles && user?.username && !userProfiles[user.username]?.memberships) {
      dispatch(getUserMemberships(user.username));
    }
  }, [dispatch, user.username, userProfiles]);

  useEffect(() => {
    if (userProfiles && user.username) {
      const membershipDetails: Memberships = userProfiles[user.username]?.memberships ?? {};

      if (membershipDetails.serverError) {
        setMemberships(null);
        setMembershipsError(true);
      } else {
        setMemberships(membershipDetails.teams?.filter((team) => team.status === 'accepted'));
        setMembershipsError(false);
      }
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
          <div key={membership.team_name} data-cypress="teamItem">
            <h4 className={classes.teamTitle}>{membership.title}</h4>
            <div className={classes.groups}>
              {teams[membership.team_name]?.groups?.items?.map((group: GroupMeta) => (
                <div
                  className={classes.group}
                  data-cypress="groupItem"
                  onClick={(): void => navigate(`/group/${group.id}`)}
                >
                  <p className={classes.groupTitle}>{group.group_title}</p>
                </div>
              ))}
              {!!teams[membership.team_name]?.groups?.serverError && (
                <div className={classes.alertMessage}>
                  <Alert
                    message={
                      `An error occurred retrieving groups in team ${membership.title}.` +
                      '  Refresh the page to try again.'
                    }
                    type="error"
                    closeable={false}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {membershipsError && (
          <div className={classes.alertMessage}>
            <Alert
              message="An error occurred retrieving team and group memberships.  Refresh the page to try again."
              type="error"
              closeable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsBody;
