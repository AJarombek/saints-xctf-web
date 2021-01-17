/**
 * Component for a single group member shown from the group admin view.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { MemberDetails } from '../../../redux/types';
import { AJTag } from 'jarombek-react-components';

interface Props {
  member: MemberDetails;
}

const useStyles = createUseStyles(styles);

const CurrentMember: React.FunctionComponent<Props> = ({ member }) => {
  const classes = useStyles({ user: member.user });

  return (
    <div className={classes.currentMember}>
      <p>
        {member.first} {member.last}
      </p>
      <AJTag
        content={<div className={classes.memberTypeContent}>{member.user}</div>}
        className={classes.memberTypeTag}
      />
    </div>
  );
};

export default CurrentMember;
