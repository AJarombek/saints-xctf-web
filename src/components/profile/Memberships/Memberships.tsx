/**
 * Component for on the profile page which lists the users group and team memberships
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';

interface Props {
  groupMemberships?: GroupMember[];
}

const useStyles = createUseStyles(styles);

const Memberships: React.FunctionComponent<Props> = ({ groupMemberships = [] }) => {
  const classes = useStyles();

  return (
    <div className={classes.memberships}>
      {groupMemberships.map((membership) => (
        <p key={membership.group_name}>{membership.group_title}</p>
      ))}
    </div>
  );
};

export default Memberships;
