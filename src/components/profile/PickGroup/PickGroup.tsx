/**
 * Component for picking a group to join.
 * @author Andrew Jarombek
 * @since 12/7/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';
import { AJButton } from 'jarombek-react-components';

interface Props {
  group?: GroupMember;
  onMembershipClick: (group: GroupMember) => void;
  joined: boolean;
  left: boolean;
}

const useStyles = createUseStyles(styles);

const PickGroup: React.FunctionComponent<Props> = ({ group, onMembershipClick, joined, left }) => {
  const classes = useStyles({ status: joined ? 'pending' : left ? null : group.status });

  return (
    <div className={classes.group} data-cypress="pickGroup">
      <p className={classes.groupTitle}>{group.group_title}</p>
      <AJButton type="text" className={classes.groupActionIcon} onClick={(): void => onMembershipClick(group)}>
        {(((group.status === 'accepted' || group.status === 'pending') && !left) || joined) && <p>&#x0051;</p>}
        {((group.status === null && !joined) || left) && <p>&#x0050;</p>}
      </AJButton>
    </div>
  );
};

export default PickGroup;
