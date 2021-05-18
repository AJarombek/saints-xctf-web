/**
 * Component for on the profile page which lists the users group and team memberships
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Memberships, TeamMembership } from '../../../redux/types';
import classNames from 'classnames';

interface Props {
  teamMemberships?: Memberships;
}

const useStyles = createUseStyles(styles);

const Memberships: React.FunctionComponent<Props> = ({ teamMemberships }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.memberships, 'memberships')}>
      {teamMemberships?.teams
        ?.filter((membership: TeamMembership) => membership.status === 'accepted')
        ?.map((membership: TeamMembership) => (
          <p key={membership.team_name} data-cypress="teamMembership">
            {membership.title}
          </p>
        ))}
    </div>
  );
};

export default memo<Props>(Memberships);
