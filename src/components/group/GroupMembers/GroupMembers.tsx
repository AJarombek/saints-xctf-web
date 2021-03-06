/**
 * Component for a tab on the group page which lists all the users who are members.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { MemberDetails } from '../../../redux/types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const useStyles = createUseStyles(styles);

interface Props {
  members: MemberDetails[];
}

const GroupMembers: React.FunctionComponent<Props> = ({ members }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div id="groupMembers" className={classes.container}>
      {members.map((member: MemberDetails) => (
        <div
          key={member.username}
          className={classes.member}
          data-cypress="groupMember"
          onClick={(): void => navigate(`/profile/${member.username}`)}
        >
          <p>
            {member.first} {member.last}
          </p>
          <p>Member Since: {moment(member.member_since).utc(false).format('MMM Do, YYYY')}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupMembers;
