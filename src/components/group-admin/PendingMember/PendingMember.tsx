/**
 * Component to manage the users in a group.  Admins have the ability to remove users, make users admins, and accept
 * new users.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { MemberDetails } from '../../../redux/types';
import { AJButton } from 'jarombek-react-components';

interface Props {
  member: MemberDetails;
}

const useStyles = createUseStyles(styles);

const PendingMember: React.FunctionComponent<Props> = ({ member }) => {
  const classes = useStyles();

  return (
    <div key={member.username} className={classes.pendingMember}>
      <p className={classes.name}>
        {member.first} {member.last}
      </p>
      <div className={classes.pendingMemberActions}>
        <AJButton type="text" onClick={() => {}} disabled={false}>
          Deny
        </AJButton>
        <AJButton type="contained" onClick={() => {}} disabled={false}>
          Accept
        </AJButton>
      </div>
    </div>
  );
};

export default PendingMember;
