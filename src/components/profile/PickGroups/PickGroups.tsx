/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';
import PickGroup from '../PickGroup';

interface Props {
  teamName?: string;
  groups?: GroupMember[];
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({ teamName, groups }) => {
  const classes = useStyles();

  if (groups) {
    return (
      <div className={classes.pickGroups}>
        {groups.map((group) => (
          <PickGroup key={`${teamName}-${group.group_name}`} group={group} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default PickGroups;
